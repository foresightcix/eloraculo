# El Oráculo · ¿Cuál es la constelación de tu familia?

Experiencia web interactiva (responsive) que, a través de 8 "visiones",
revela el **arquetipo de crianza** de una familia entre cuatro
constelaciones: **Sembradores, Guardianes, Exploradores y Soñadores**.

Cada participante escribe su **nombre** al inicio y, al terminar, su nombre
queda mapeado junto a su arquetipo en una hoja de **Google Sheets**.

- `index.html` — la experiencia completa (sin dependencias, sin build).
- `Code.gs` — el receptor de Google Apps Script que escribe en tu hoja.

---

## 1. Probar en local

Es un único archivo estático. Puedes abrir `index.html` directamente en el
navegador, o servirlo:

```bash
python3 -m http.server 8000
# luego abre http://localhost:8000
```

Es totalmente responsive (móvil, tablet y escritorio).

---

## 2. Conectar con Google Sheets

La sincronización usa un **Google Apps Script** publicado como *Web App*.
No requiere credenciales, llaves ni librerías: la hoja recibe los datos
directamente.

### Paso a paso

1. Crea (o abre) una **Google Sheet** nueva.
2. Menú **Extensiones ▸ Apps Script**.
3. Borra el contenido por defecto y pega **todo** el contenido de
   [`Code.gs`](./Code.gs). Guarda (💾).
4. Pulsa **Implementar ▸ Nueva implementación**.
   - Tipo: **Aplicación web**.
   - *Ejecutar como:* **Yo**.
   - *Quién tiene acceso:* **Cualquier persona**.
   - Pulsa **Implementar** y autoriza los permisos que pida.
5. Copia la **URL de la aplicación web** (termina en `/exec`).
6. Abre [`index.html`](./index.html) y pega esa URL en la constante de la
   parte superior del `<script>`:

   ```js
   const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfyc.../exec";
   ```

7. ¡Listo! Cada vez que alguien complete el oráculo, se agregará una fila a
   la pestaña **Respuestas** con estas columnas:

   | Nombre | Arquetipo |
   |---|---|

> **Verificar el despliegue:** abre la URL `/exec` en el navegador. Debe
> responder `{"ok":true,"service":"El Oráculo",...}`.

> **Si cambias `Code.gs`** más adelante, usa **Implementar ▸ Gestionar
> implementaciones ▸ ✏️ Editar ▸ Versión: Nueva** para que los cambios surtan
> efecto (la URL se mantiene).

### Notas técnicas

- El navegador envía el `POST` con `Content-Type: text/plain` y `mode: 'no-cors'`.
  Esto evita el *preflight* de CORS y permite escribir desde cualquier dominio
  sin configuración extra. Como contrapartida, la página no lee la respuesta:
  la escritura es "fire-and-forget" (suficiente para este caso).
- Si `SHEET_ENDPOINT` queda vacío, el oráculo funciona igual pero **no guarda**
  nada (útil para desarrollo).

---

## 3. Desplegar la web

Al ser estático, sirve en cualquier hosting:

- **Vercel:** importa el repo; sin configuración (framework: *Other*).
- **GitHub Pages:** Settings ▸ Pages ▸ Deploy from branch ▸ `main` / `root`.
  (Requiere que el repositorio sea público o tener GitHub Pages habilitado).
- **Netlify / Cloudflare Pages:** arrastra la carpeta o conecta el repo.

---

## Arquetipos

| Constelación | Figura | Ejes (agencia / tiempo) | Nombre interno |
|---|---|---|---|
| **Sembradores** | El Sembrador | suelta + paciencia | Pequeños Socios |
| **Guardianes** | El Guardián | controla + paciencia | Protegidos |
| **Exploradores** | El Navegante | suelta + presente | Dinámicos |
| **Soñadores** | El Corazón | controla + presente | Ilusionistas |
