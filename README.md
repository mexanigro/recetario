# ספר המתכונים (Recetario)

Web para ver y cargar recetas de comida, **hebreo-first con RTL** y toggle a inglés
(traducción curada/idiomática, no literal). Estática (HTML + CSS + JS, sin build) con
**Firestore** como base de datos.

## Páginas

- `index.html` — landing: recetas + ejemplos bilingües, filtros por categoría y sitios de inspiración israelíes (Walla Food, Mako, Ynet, Bazek Alim, Oogio, videos en YouTube).
- `agregar.html` — formulario para cargar recetas, con vista previa en vivo.
- `receta.html?id=…` — detalle: checklist de ingredientes, paso a paso y botón "ver cómo se hace" que busca el video en YouTube **en hebreo**.

## Idiomas

- `js/i18n.js` — diccionario he/en escrito a mano (no traducción automática). El botón del header cambia idioma + dirección (`dir=rtl/ltr`) y se recuerda en localStorage.
- Las recetas de ejemplo tienen contenido en ambos idiomas; las cargadas por usuarios se guardan con `idioma` y se muestran tal como se escribieron.
- Categorías y dificultad se guardan como claves estables (`pasta`, `meat`, `easy`…) y se traducen al renderizar.

## Stack

- Sin framework ni build: se deploya tal cual a Vercel.
- Firebase Firestore (proyecto `recetario-liam`, colección `recetas`).
  Reglas: lectura y creación abiertas; edición y borrado bloqueados.
- Tipografías: Frank Ruhl Libre + Assistant (hebreo + latino, Google Fonts).

## Desarrollo local

```bash
python -m http.server 8123
# http://localhost:8123
```

## Deploy

```bash
vercel deploy --prod --yes        # el conector MCP no puede crear proyectos; usar CLI
firebase deploy --only firestore  # reglas
```
