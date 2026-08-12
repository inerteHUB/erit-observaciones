# ERIT Observaciones

Aplicativo móvil independiente para la gestión de observaciones operativas de tienda (mantenimiento visual, precios, seguridad, reposición). Construido con **React Native (Expo)** y **Firebase**.

## Requisitos previos

- Node.js 18+
- Cuenta de Expo (gratuita) — `npx expo login`
- Proyecto de Firebase creado, con Firestore, Storage, Auth y Cloud Functions habilitados

## Instalación

```bash
npm install
```

Copia tu configuración real de Firebase en `app/services/firebase.ts` (reemplaza los valores `TU_...`).

## Ejecutar en desarrollo

```bash
npx expo start
```

Escanea el código QR con la app **Expo Go** en un celular Android, o usa un emulador.

## Generar el APK de prueba

```bash
npx eas login
npx eas build --platform android --profile preview
```

(La primera vez, Expo te guía para crear `eas.json`. Ver la documentación de EAS Build para más detalle.)

## Cloud Function de login por QR

```bash
cd functions
npm install firebase-functions firebase-admin
firebase deploy --only functions
```

Luego actualiza `CLOUD_FUNCTION_URL` en `app/services/authService.ts` con la URL real desplegada.

## Reglas de seguridad de Firestore

```bash
firebase deploy --only firestore:rules
```

## Estructura del proyecto

Ver `Arquitectura_Tecnica_ERIT_Observaciones.md` para el detalle completo de carpetas, colecciones de Firestore y decisiones de arquitectura.

## Estado actual

- [x] Navegación (Auth Stack / Main Stack / Tabs)
- [x] Login por QR (pantalla + servicio + Cloud Function)
- [x] Bandeja de observaciones (lectura en tiempo real desde Firestore)
- [x] Reglas de seguridad de Firestore
- [ ] Formulario de creación completo (categoría, prioridad sugerida, ubicación, foto)
- [ ] Detalle con línea de tiempo, tomar/resolver y visor de evidencia ampliable
- [ ] Perfil con estadísticas (resueltas hoy, tomadas, pendientes en tienda)
- [ ] Filtros de bandeja (prioridad, estado, día) y buscador
- [ ] Seed de las colecciones `categorias` y `ubicaciones` en Firestore
- [ ] Compresión de imágenes antes de subir evidencia

Cada pendiente ya tiene su comportamiento validado en el prototipo HTML — el trabajo restante es portarlo a estas pantallas, no diseñarlo desde cero.

## Documentación del proyecto

- Acta de Constitución
- Análisis de Requerimientos
- Arquitectura Técnica (vive también en este repo)
- Prototipo navegable (HTML) — referencia visual y funcional para cada pantalla
