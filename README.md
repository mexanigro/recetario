# Recetario

Web para ver y cargar recetas de comida. Estática (HTML + CSS + JS, sin build) con **Firestore** como base de datos.

## Páginas

- `index.html` — landing: recetas cargadas + ejemplos, filtros por categoría y sección de inspiración.
- `agregar.html` — formulario para cargar recetas, con vista previa en vivo.
- `receta.html?id=…` — detalle: ingredientes con checklist y paso a paso.

## Stack

- Sin framework ni build: se deploya tal cual a Vercel.
- Firebase Firestore (proyecto `recetario-liam`, colección `recetas`).
  Reglas: lectura y creación abiertas; edición y borrado bloqueados.
- Tipografías: Fraunces + Instrument Sans (Google Fonts).

## Desarrollo local

```bash
python -m http.server 8123
# http://localhost:8123
```

(Hace falta un servidor porque los módulos ES no cargan desde `file://`.)

## Deploy

Vercel (estático, sin build). Las reglas de Firestore se deployan con:

```bash
firebase deploy --only firestore
```
