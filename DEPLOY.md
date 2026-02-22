# Despliegue en Vercel + GitHub

## Qué subir a GitHub

**Sube solo la carpeta `forge-customs`** como raíz del repositorio.

### Estructura que debe tener tu repo en GitHub

```
tu-repo/
├── public/           ← Todas las imágenes (maria, Diego, Cristina, Marcel)
├── src/
├── index.html
├── package.json
├── vite.config.ts
├── vercel.json       ← Configuración Vercel
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── tsconfig.node.json
├── .gitignore
└── (resto de archivos del proyecto)
```

### Carpetas y archivos que SÍ deben estar en el repo

- **Todo el contenido de `forge-customs`** excepto lo que ignora `.gitignore`:
  - `src/` (todo el código)
  - `public/` (incluyendo `public/maria/`, `public/Diego/`, `public/Cristina/`, `public/Marcel/` y todas las imágenes)
  - `index.html`, `package.json`, `vite.config.ts`, `vercel.json`, `tailwind.config.ts`, `postcss.config.js`, `tsconfig.json`, `tsconfig.node.json`, `eslint.config.js`
  - `.gitignore`

### Lo que NO se sube (ya está en .gitignore)

- `node_modules/`
- `dist/`
- Archivos `.local`, logs, etc.

---

## Pasos para subir a GitHub y desplegar en Vercel

### 1. Crear el repositorio en GitHub

1. Entra en [github.com](https://github.com) → **New repository**.
2. Nombre del repo (ej.: `forge-customs` o `tu-proyecto`).
3. No marques "Add a README" si ya tienes archivos.
4. Crea el repositorio.

### 2. Subir el proyecto desde tu PC

Abre terminal en la carpeta **`forge-customs`** (no en WB):

```bash
cd F:\SMXA1\WB\forge-customs
git init
git add .
git commit -m "Initial commit - Forge Customs listo para Vercel"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

(Sustituye `TU_USUARIO` y `TU_REPO` por tu usuario de GitHub y el nombre del repo.)

### 3. Conectar con Vercel

1. Entra en [vercel.com](https://vercel.com) e inicia sesión (con GitHub si quieres).
2. **Add New** → **Project**.
3. **Import** el repositorio que acabas de subir.
4. Vercel detectará **Vite** y usará:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Root Directory:** dejar vacío (raíz del repo = `forge-customs`).
5. Pulsa **Deploy**.

En unos minutos tendrás la URL de producción (ej. `tu-proyecto.vercel.app`).

---

## Resumen

| Qué | Dónde |
|-----|--------|
| **Carpeta a subir a GitHub** | Solo **`forge-customs`** (como raíz del repo) |
| **Configuración Vercel** | Ya está en `vercel.json` (build, output, SPA) |
| **Imágenes** | Incluidas en `public/` (maria, Diego, Cristina, Marcel) |

Si algo falla en Vercel, revisa los logs del deploy; con esta configuración el proyecto está listo para producción.
