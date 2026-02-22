# Avisos de npm en Vercel (deprecated)

Si en el deploy de Vercel ves avisos como:

- `npm warn deprecated whatwg-encoding@2.0.0`
- `npm warn deprecated domexception@4.0.0`
- `npm warn deprecated abab@2.0.6`
- `npm warn deprecated three-mesh-bvh@0.7.8`

## Qué está hecho

1. **three-mesh-bvh**  
   Ya está corregido: en `package.json` hay un **override** que fuerza la versión `^0.8.0`, así que ese aviso no debería salir.

2. **whatwg-encoding, domexception, abab**  
   Son dependencias **transitivas** de **jsdom** (usado por Vitest en tests). No son de tu código ni del build de producción.  
   **No afectan al build ni al sitio en Vercel**; son solo avisos. El build puede seguir en verde aunque aparezcan.

## Si el deploy falla

Si Vercel marca el deploy como **fallido** (no solo avisos en amarillo):

- Revisa el **log completo** del build en Vercel y busca la línea en rojo que indica el error real.
- Los `npm warn deprecated` por sí solos **no** hacen fallar el deploy.

Si quieres, puedes copiar aquí el mensaje de error exacto del log de Vercel y te indico el siguiente paso.
