# Cómo correr EcoSwap2 en local (VS Code)

Este proyecto es una app React + Vite (con Tailwind v4) exportada desde Figma Make.

## Requisitos previos
- Tener instalado **Node.js** (versión 18 o superior). Descárgalo de https://nodejs.org si no lo tienes.
- Tener **VS Code** instalado.

## Pasos

1. Descomprime el archivo `EcoSwap2.zip` en la carpeta que prefieras.
2. Abre esa carpeta en VS Code (`Archivo > Abrir carpeta...`).
3. Abre una terminal dentro de VS Code (`Terminal > Nueva terminal`).
4. Instala las dependencias:
   ```
   npm install
   ```
5. Inicia el servidor de desarrollo:
   ```
   npm run dev
   ```
6. Vite te mostrará una URL local, normalmente:
   ```
   http://localhost:5173
   ```
   Ábrela en tu navegador para ver la página funcionando.

## Notas
- Cualquier cambio que hagas en los archivos dentro de `src/` se reflejará automáticamente en el navegador (hot reload).
- Si en algún momento quieres generar la versión de producción (archivos estáticos listos para subir a un hosting), usa:
  ```
  npm run build
  ```
  Esto genera una carpeta `dist/` con el sitio compilado.
- Se agregaron `react` y `react-dom` como dependencias directas en `package.json` (en el export original venían solo como "peerDependencies"), para evitar errores de instalación en algunos entornos.
