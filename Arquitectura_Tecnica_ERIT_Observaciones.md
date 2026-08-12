# Arquitectura Técnica — ERIT Observaciones

**Versión 1.0 · Agosto 2026**
Documento de referencia técnica para el desarrollo del MVP en React Native + Firebase. Complementa el Análisis de Requerimientos y sirve como guía al iniciar el repositorio en GitHub.

---

## 1. Navegación

La app usa `@react-navigation/native` con dos flujos principales:

- **Auth Stack** — se muestra antes de iniciar sesión. Contiene únicamente `LoginQRScreen`.
- **Main Stack** — se monta después de un escaneo de QR válido. Contiene un `Tab Navigator` (Bandeja, Perfil) y las pantallas modales (Crear observación, Selector de ubicación, Detalle de observación) que se abren por encima de los tabs.

El cambio entre Auth Stack y Main Stack se controla observando el estado de sesión (`onAuthStateChanged` de Firebase Auth), no con navegación manual — así se evita que alguien vuelva atrás y quede en una pantalla protegida sin sesión.

---

## 2. Estructura de carpetas propuesta

```
erit-observaciones/
├── app/
│   ├── navigation/
│   │   ├── AuthStack.tsx
│   │   ├── MainStack.tsx
│   │   └── TabNavigator.tsx
│   ├── screens/
│   │   ├── auth/
│   │   │   └── LoginQRScreen.tsx
│   │   ├── bandeja/
│   │   │   └── BandejaScreen.tsx
│   │   ├── crear/
│   │   │   ├── CrearObservacionScreen.tsx
│   │   │   └── SelectorUbicacionScreen.tsx
│   │   ├── detalle/
│   │   │   └── DetalleObservacionScreen.tsx
│   │   └── perfil/
│   │       └── PerfilScreen.tsx
│   ├── components/
│   │   ├── ObservacionCard.tsx
│   │   ├── PriorityTag.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── EvidencePhoto.tsx
│   │   └── SegmentedControl.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useObservaciones.ts
│   │   └── useLocations.ts
│   ├── services/
│   │   ├── firebase.ts
│   │   ├── authService.ts
│   │   ├── observacionesService.ts
│   │   └── storageService.ts
│   ├── constants/
│   │   ├── categorias.ts
│   │   ├── ubicaciones.ts
│   │   └── roles.ts
│   └── types/
│       └── index.ts
├── functions/                  # Cloud Functions (login por QR)
│   └── index.js
├── App.tsx
├── app.json
├── package.json
└── firestore.rules
```

Cada componente visual del prototipo HTML tiene ya su equivalente directo aquí: `ObservacionCard` (tarjeta de la bandeja), `PriorityTag` y `StatusBadge` (las etiquetas de color), `EvidencePhoto` (la foto ampliable), `SegmentedControl` (el filtro Todas/Urgente/Normal/Baja).

---

## 3. Colecciones de Firestore

| Colección | Documento | Notas |
|---|---|---|
| `usuarios` | `{usuarioId}` | `nombre`, `qr_code`, `rol_id`, `tienda_id`, `activo` |
| `roles` | `{rolId}` | `nombre`, `puede_ejecutar` (bool) |
| `categorias` | `{categoriaId}` | `nombre`, `icono`, `prioridad_base` — catálogo semilla, no editable desde la app |
| `ubicaciones` | `{ubicacionId}` | `tipo`, `etiqueta`, `tienda_id` — catálogo semilla (32 pasillos + laterales + zonas) |
| `observaciones` | `{observacionId}` | ver detalle abajo |
| `tiendas` | `{tiendaId}` | `nombre`, `codigo` — pensado para escalar a más de una tienda |

Documento de ejemplo en `observaciones`:

```json
{
  "categoria_id": "cat_seguridad",
  "categoria_icono": "⚠️",
  "ubicacion_id": "ubi_pasillo_11",
  "ubicacion_etiqueta": "Pasillo 11",
  "descripcion": "La flejera del anaquel superior está suelta.",
  "prioridad": "urgente",
  "estado": "pendiente",
  "creado_por": "usr_juan_perez",
  "creado_por_nombre": "Juan Pérez",
  "asignado_a": null,
  "fecha_creacion": "2026-08-11T18:12:00Z",
  "fecha_asignacion": null,
  "fecha_resolucion": null,
  "evidencia_url": null,
  "tienda_id": "tienda_404_tarapoto"
}
```

**Nota de diseño:** los campos `categoria_icono`, `ubicacion_etiqueta` y `creado_por_nombre` están *desnormalizados* — duplicados directamente en el documento de la observación en vez de solo guardar la referencia. Esto evita lecturas adicionales a Firestore al renderizar la bandeja (Firestore cobra por lectura de documento), lo cual es clave para cumplir RNF-01 (carga en menos de 2 segundos).

---

## 4. Reglas de seguridad de Firestore

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function estaAutenticado() {
      return request.auth != null;
    }

    function rolActual() {
      return get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.rol_id;
    }

    function puedeEjecutar() {
      return rolActual() in ['gestor', 'admin'];
    }

    match /usuarios/{usuarioId} {
      allow read: if estaAutenticado();
      allow write: if false; // se administra fuera de la app (por ahora, manualmente)
    }

    match /observaciones/{obsId} {
      allow read: if estaAutenticado();
      allow create: if estaAutenticado();
      allow update: if estaAutenticado() && puedeEjecutar();
      allow delete: if false;
    }

    match /categorias/{catId} {
      allow read: if estaAutenticado();
      allow write: if false;
    }

    match /ubicaciones/{ubiId} {
      allow read: if estaAutenticado();
      allow write: if false;
    }

    match /tiendas/{tiendaId} {
      allow read: if estaAutenticado();
      allow write: if false;
    }
  }
}
```

Esto traduce directamente **RF-10** del análisis de requerimientos: cualquier rol autenticado puede *crear* una observación, pero solo `gestor` y `admin` pueden *actualizarla* (tomarla o resolverla). Los catálogos (`categorias`, `ubicaciones`) son de solo lectura desde la app — se cargan una vez al inicio del proyecto.

---

## 5. Autenticación por código QR

Firebase Auth no soporta login por QR de forma nativa, así que se resuelve con una **Cloud Function**:

1. El QR de cada colaborador codifica un `qr_code` único (no el UID directamente, por seguridad).
2. Al escanear, la app llama a una función `loginWithQR(qrCode)`.
3. La función busca ese código en la colección `usuarios`, y si existe y está `activo`, genera un *custom token* con `admin.auth().createCustomToken(uid)`.
4. La app recibe el token y llama a `signInWithCustomToken()` — desde ahí, Firebase Auth maneja la sesión normalmente.

Esto mantiene la lógica de "quién es válido" centralizada en el backend, no en el cliente.

---

## 6. Decisiones clave de arquitectura

- **Firestore en tiempo real (`onSnapshot`)** en la bandeja de observaciones: cuando un gestor toma una observación, todos los demás dispositivos lo ven al instante sin recargar — es la pieza técnica que sostiene RF-12 (evitar duplicidad de trabajo).
- **Persistencia offline habilitada** (`enableIndexedDbPersistence` / caché nativo de Firestore) para cumplir RNF-02: crear observaciones sin señal y sincronizar al recuperar conexión.
- **Compresión de imágenes antes de subir** (librería `expo-image-manipulator`) para cumplir RNF-08, reduciendo el peso de las fotos de evidencia.
- **Catálogos como colecciones separadas** (`categorias`, `ubicaciones`) en vez de listas fijas en el código, para poder ajustar prioridades base o agregar zonas de tienda sin publicar una nueva versión del APK.

---

## 7. Próximos pasos

Con la arquitectura definida, el siguiente paso es inicializar el repositorio en GitHub con esta estructura de carpetas, configurar el proyecto de Firebase (Firestore + Storage + Auth + la Cloud Function de login), y sembrar (`seed`) las colecciones `categorias` y `ubicaciones` con los datos reales ya definidos.
