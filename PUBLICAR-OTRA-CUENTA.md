# Publicar en otra cuenta de GitHub (sin usar tu SSH actual)

Si tu SSH está ligado a una cuenta y quieres subir este repo a **otra cuenta**, usa **HTTPS** y entra con la segunda cuenta.

---

## Paso 1: Crear el repo en la otra cuenta

1. Entra en GitHub **con la cuenta donde quieres publicar** (la otra).
2. **New repository** → nombre ej. `forge-customs` → Create.

---

## Paso 2: Usar HTTPS (no SSH) como remote

En la terminal, desde la carpeta del proyecto:

```bash
cd F:\SMXA1\WB\forge-customs
```

**Si ya añadiste el remote antes**, quítalo y pon el de HTTPS:

```bash
git remote remove origin
```

**Añade el remote con la URL HTTPS** (cambia `OTRA_CUENTA` y `NOMBRE_REPO`):

```bash
git remote add origin https://github.com/projectsinsitb-ai/finished
```

Ejemplo si la otra cuenta es `mi-empresa` y el repo `forge-customs`:

```bash
git remote add origin https://github.com/mi-empresa/forge-customs.git
```

---

## Paso 3: Hacer push con la otra cuenta

```bash
git push -u origin main
```

Te pedirá **usuario y contraseña**:

- **Usuario:** el de la otra cuenta (ej. `mi-empresa`).
- **Contraseña:** **no** la de GitHub; tiene que ser un **Personal Access Token (PAT)** de esa cuenta.

### Crear un token en la otra cuenta

1. Entra en GitHub con **la otra cuenta**.
2. **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**.
3. **Generate new token (classic)**.
4. Ponle un nombre (ej. "Vercel forge-customs"), marca **repo** y genera.
5. **Copia el token** (solo se muestra una vez).
6. Cuando Git pida "Password", **pega ese token**.

Así este repo usa la otra cuenta por HTTPS y tu SSH sigue siendo para la primera cuenta.

---

## Resumen

| Qué quieres              | Cómo hacerlo                                      |
|--------------------------|---------------------------------------------------|
| Repo en otra cuenta      | Crear el repo en esa cuenta y usar su URL HTTPS.  |
| No mezclar con tu SSH    | Remote con `https://github.com/...`, no `git@github.com`. |
| Contraseña al hacer push | Personal Access Token de la otra cuenta, no la contraseña de GitHub. |
