# Pasos en Vercel (tu repo ya está en GitHub)

Tu código está en: **https://github.com/projectsinsitb-ai/finished**

---

## 1. Entra en Vercel

Ve a **[vercel.com](https://vercel.com)** e inicia sesión (con GitHub si quieres).

---

## 2. Importar el proyecto

1. Pulsa **"Add New..."** → **"Project"**.
2. En la lista de repositorios, busca **`finished`** (o la organización **projectsinsitb-ai**).
3. Si no lo ves, pulsa **"Import Git Repository"** y pega:  
   `https://github.com/projectsinsitb-ai/finished`
4. Pulsa **"Import"** en el repo **finished**.

---

## 3. Configuración del proyecto (revisar)

Vercel suele detectar **Vite** y rellenar esto solo. Comprueba que esté así:

| Campo | Valor |
|-------|--------|
| **Framework Preset** | Vite |
| **Root Directory** | (dejar vacío) |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

Si algo está distinto, corrígelo. El proyecto ya tiene `vercel.json`, así que Vercel puede usar esa config.

---

## 4. Desplegar

1. Pulsa **"Deploy"**.
2. Espera 1–2 minutos.
3. Cuando termine, te dará una URL tipo:  
   **`https://finished-xxx.vercel.app`**

Ahí tendrás tu web en producción.

---

## 5. Próximos cambios

Cada vez que hagas **`git push`** a la rama `main` de ese repo, Vercel volverá a desplegar solo.

---

**Resumen:** Add New → Project → Import **projectsinsitb-ai/finished** → Deploy. Nada más.
