// ============================================================
// Recetario — módulo compartido
// Firestore (colección "recetas") + recetas de ejemplo + helpers.
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getFirestore, collection, addDoc, getDocs, doc, getDoc,
  query, orderBy, serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC6IBXg641SMeu6Nl5tQ7mfZ_KJMKB6tbE",
  authDomain: "recetario-liam.firebaseapp.com",
  projectId: "recetario-liam",
  storageBucket: "recetario-liam.firebasestorage.app",
  messagingSenderId: "972600673780",
  appId: "1:972600673780:web:c8a54a5fd57be8182fa5a1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ------------------------------------------------------------
// Recetas de ejemplo: llenan la landing desde el primer día y
// sirven de referencia visual. Conviven con las cargadas.
// ------------------------------------------------------------

export const RECETAS_EJEMPLO = [
  {
    id: "ej-noquis",
    ejemplo: true,
    nombre: "Ñoquis caseros con manteca y salvia",
    categoria: "Pastas",
    tiempo: 60,
    porciones: 4,
    dificultad: "Media",
    imagen: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=70",
    descripcion: "Los ñoquis de papa de toda la vida, dorados en manteca con salvia fresca. Un clásico del 29 que rinde cualquier día del mes.",
    ingredientes: ["1 kg de papas", "300 g de harina 0000", "1 huevo", "Sal y nuez moscada", "80 g de manteca", "Hojas de salvia fresca", "Queso rallado para servir"],
    pasos: [
      "Herví las papas con cáscara hasta que estén tiernas, pelalas y hacelas puré mientras siguen calientes.",
      "Cuando el puré esté tibio, sumá el huevo, la sal y la nuez moscada. Incorporá la harina de a poco hasta lograr una masa suave que no se pegue.",
      "Formá rollitos, cortá los ñoquis y pasalos por la ñoquera o un tenedor.",
      "Hervilos en agua con sal: están listos cuando suben a la superficie.",
      "Dorá la manteca con la salvia en una sartén, sumá los ñoquis escurridos y salteá un minuto. Serví con queso rallado.",
    ],
  },
  {
    id: "ej-lentejas",
    ejemplo: true,
    nombre: "Guiso de lentejas de olla grande",
    categoria: "Guisos",
    tiempo: 90,
    porciones: 6,
    dificultad: "Fácil",
    imagen: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=70",
    descripcion: "El guiso que pide el invierno: lentejas, chorizo colorado y verduras cocinadas despacio. Mejor al día siguiente.",
    ingredientes: ["400 g de lentejas", "1 chorizo colorado", "150 g de panceta", "1 cebolla", "1 morrón rojo", "2 zanahorias", "2 papas", "400 g de tomate triturado", "Pimentón dulce, laurel, sal y pimienta"],
    pasos: [
      "Remojá las lentejas una hora (o usá de las que no necesitan remojo).",
      "Dorá la panceta y el chorizo colorado en rodajas. Retirá y reservá.",
      "En la misma olla, rehogá la cebolla, el morrón y la zanahoria hasta que estén tiernos.",
      "Sumá el tomate, el pimentón, el laurel, las lentejas escurridas y agua caliente hasta cubrir bien.",
      "Cociná a fuego bajo unos 40 minutos. A mitad de camino agregá las papas en cubos y la carne reservada. Rectificá la sal y serví bien caliente.",
    ],
  },
  {
    id: "ej-ensalada",
    ejemplo: true,
    nombre: "Ensalada fresca de estación",
    categoria: "Ensaladas",
    tiempo: 15,
    porciones: 2,
    dificultad: "Fácil",
    imagen: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=70",
    descripcion: "Verdes, palta, tomates y semillas con una vinagreta de limón y mostaza. La prueba de que una ensalada no tiene por qué ser aburrida.",
    ingredientes: ["Mix de hojas verdes", "1 palta", "Tomates cherry", "1/2 pepino", "Semillas de girasol tostadas", "Jugo de 1 limón", "1 cdita de mostaza", "3 cdas de aceite de oliva", "Sal y pimienta"],
    pasos: [
      "Lavá y secá bien las hojas verdes. Cortá los cherry al medio, el pepino en medialunas y la palta en gajos.",
      "Tostá las semillas en una sartén seca hasta que perfumen.",
      "Batí el limón con la mostaza, la sal y la pimienta; incorporá el aceite en hilo hasta emulsionar.",
      "Armá la ensalada en una fuente, regá con la vinagreta justo antes de servir y terminá con las semillas.",
    ],
  },
  {
    id: "ej-pancakes",
    ejemplo: true,
    nombre: "Pancakes esponjosos con miel",
    categoria: "Dulces",
    tiempo: 25,
    porciones: 3,
    dificultad: "Fácil",
    imagen: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=900&q=70",
    descripcion: "Torre de pancakes altos y esponjosos para un domingo sin apuro. Con miel, frutas o lo que haya en la heladera.",
    ingredientes: ["2 tazas de harina leudante", "2 cdas de azúcar", "1 pizca de sal", "2 huevos", "1 3/4 taza de leche", "40 g de manteca derretida", "Esencia de vainilla", "Miel y frutas para servir"],
    pasos: [
      "Mezclá los secos en un bol. En otro, batí los huevos con la leche, la manteca y la vainilla.",
      "Uní ambas mezclas sin batir de más: la masa tiene que quedar con algunos grumos.",
      "Dejá descansar 10 minutos mientras calentás una sartén a fuego medio-bajo.",
      "Cociná porciones de masa hasta que aparezcan burbujas en la superficie, girá y dorá del otro lado.",
      "Apilá y serví con miel y fruta fresca.",
    ],
  },
  {
    id: "ej-tacos",
    ejemplo: true,
    nombre: "Tacos de carnitas con salsa criolla",
    categoria: "Carnes",
    tiempo: 150,
    porciones: 4,
    dificultad: "Media",
    imagen: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=900&q=70",
    descripcion: "Cerdo cocido lento hasta deshacerse, tortillas calientes y una salsa criolla bien fresca para equilibrar.",
    ingredientes: ["1 kg de bondiola de cerdo", "Jugo de 2 naranjas", "4 dientes de ajo", "Comino, orégano y laurel", "Tortillas de maíz", "1 cebolla morada", "1 tomate", "Cilantro o perejil", "Jugo de 1 limón"],
    pasos: [
      "Cortá la bondiola en cubos grandes y ponela en una olla con el jugo de naranja, el ajo, las especias, sal y agua hasta casi cubrir.",
      "Cociná a fuego bajo unas 2 horas, hasta que la carne se deshaga y el líquido se evapore.",
      "Subí el fuego al final para que los bordes se doren en su propia grasa. Desmenuzá.",
      "Picá la cebolla, el tomate y el cilantro; mezclá con limón, aceite y sal para la salsa criolla.",
      "Calentá las tortillas y armá los tacos con la carne y la salsa por encima.",
    ],
  },
  {
    id: "ej-torta",
    ejemplo: true,
    nombre: "Torta húmeda de chocolate",
    categoria: "Dulces",
    tiempo: 70,
    porciones: 8,
    dificultad: "Media",
    imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=70",
    descripcion: "La torta de chocolate infalible: húmeda por dentro, con ganache brillante por fuera. Para cumpleaños o para un martes cualquiera.",
    ingredientes: ["200 g de chocolate semiamargo", "150 g de manteca", "4 huevos", "200 g de azúcar", "120 g de harina", "1 cdita de polvo de hornear", "200 ml de crema de leche", "150 g extra de chocolate para la ganache"],
    pasos: [
      "Derretí el chocolate con la manteca a baño maría y dejá entibiar.",
      "Batí los huevos con el azúcar hasta que dupliquen el volumen; incorporá el chocolate derretido.",
      "Sumá la harina tamizada con el polvo de hornear con movimientos envolventes.",
      "Horneá en molde enmantecado a 170 °C durante 35-40 minutos. Dejá enfriar.",
      "Calentá la crema, volcala sobre el chocolate picado y mezclá hasta lograr una ganache lisa. Cubrí la torta y dejá asentar.",
    ],
  },
];

// ------------------------------------------------------------
// Datos
// ------------------------------------------------------------

const COL = "recetas";

export async function traerRecetas() {
  // Trae las cargadas por vos (Firestore) + las de ejemplo.
  let propias = [];
  try {
    const q = query(collection(db, COL), orderBy("creado", "desc"));
    const snap = await getDocs(q);
    propias = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error("No se pudieron traer las recetas de Firestore:", err);
  }
  return [...propias, ...RECETAS_EJEMPLO];
}

export async function traerReceta(id) {
  const ejemplo = RECETAS_EJEMPLO.find((r) => r.id === id);
  if (ejemplo) return ejemplo;
  try {
    const snap = await getDoc(doc(db, COL, id));
    if (snap.exists()) return { id: snap.id, ...snap.data() };
  } catch (err) {
    console.error("No se pudo traer la receta:", err);
  }
  return null;
}

export async function guardarReceta(receta) {
  const ref = await addDoc(collection(db, COL), { ...receta, creado: serverTimestamp() });
  return ref.id;
}

// ------------------------------------------------------------
// Render
// ------------------------------------------------------------

const IMAGEN_FALLBACK = "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=900&q=70";

export function esc(texto) {
  const div = document.createElement("div");
  div.textContent = texto ?? "";
  return div.innerHTML;
}

const ICONO_RELOJ = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;
const ICONO_PLATO = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>`;

export function cartaReceta(r) {
  const img = r.imagen || IMAGEN_FALLBACK;
  return `
    <a class="carta" href="receta.html?id=${encodeURIComponent(r.id)}">
      <div class="carta-img">
        <img src="${esc(img)}" alt="${esc(r.nombre)}" loading="lazy"
             onerror="this.src='${IMAGEN_FALLBACK}'">
        <span class="etiqueta">${esc(r.categoria || "Receta")}</span>
        ${r.ejemplo ? `<span class="etiqueta etiqueta-ejemplo">Ejemplo</span>` : ""}
      </div>
      <div class="carta-cuerpo">
        <h3>${esc(r.nombre)}</h3>
        <div class="carta-meta">
          <span>${ICONO_RELOJ} ${esc(String(r.tiempo || "—"))} min</span>
          <span>${ICONO_PLATO} ${esc(String(r.porciones || "—"))} porciones</span>
        </div>
      </div>
    </a>`;
}
