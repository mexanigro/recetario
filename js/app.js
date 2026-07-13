// ============================================================
// ספר המתכונים — módulo compartido
// Firestore (colección "recetas") + recetas de ejemplo bilingües
// (he/en) + helpers de render conscientes del idioma.
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getFirestore, collection, addDoc, getDocs, doc, getDoc,
  query, orderBy, serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { TEXTOS, getLang } from "./i18n.js";

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
// Recetas de ejemplo: hebreo primario + inglés idiomático.
// `categoria` y `dificultad` son claves estables (se traducen
// en render). `videoQuery` es la búsqueda de YouTube en hebreo.
// ------------------------------------------------------------

export const RECETAS_EJEMPLO = [
  {
    id: "ej-gnocchi",
    ejemplo: true,
    categoria: "pasta",
    dificultad: "medium",
    tiempo: 60,
    porciones: 4,
    imagen: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=70",
    videoQuery: "מתכון ניוקי תפוחי אדמה",
    he: {
      nombre: "ניוקי תפוחי אדמה בחמאה ומרווה",
      descripcion: "ניוקי ביתי מתפוחי אדמה, מוזהב בחמאה עם עלי מרווה. פשוט, מנחם, ומרשים הרבה יותר ממה שהוא דורש.",
      ingredientes: ["1 ק\"ג תפוחי אדמה", "300 גרם קמח", "ביצה אחת", "מלח ואגוז מוסקט", "80 גרם חמאה", "עלי מרווה טריים", "פרמז'ן מגורר להגשה"],
      pasos: [
        "מבשלים את תפוחי האדמה בקליפתם עד שהם רכים, מקלפים ומועכים בעודם חמים.",
        "כשהמחית פושרת, מוסיפים את הביצה, המלח ואגוז המוסקט. מערבבים פנימה את הקמח בהדרגה עד שנוצר בצק רך שלא נדבק.",
        "מגלגלים נחשים, חותכים כריות קטנות ומעבירים על גב מזלג.",
        "מבשלים במים רותחים עם מלח: הניוקי מוכן כשהוא צף.",
        "מזהיבים חמאה עם מרווה במחבת, מוסיפים את הניוקי המסונן ומקפיצים דקה. מגישים עם פרמז'ן.",
      ],
    },
    en: {
      nombre: "Potato gnocchi in sage butter",
      descripcion: "Homemade potato gnocchi, browned in butter with fresh sage. Simple, comforting, and far more impressive than the effort it takes.",
      ingredientes: ["1 kg potatoes", "300 g flour", "1 egg", "Salt and nutmeg", "80 g butter", "Fresh sage leaves", "Grated parmesan to serve"],
      pasos: [
        "Boil the potatoes in their skins until tender, then peel and mash while still hot.",
        "Once lukewarm, add the egg, salt and nutmeg. Work in the flour gradually until you get a soft dough that doesn't stick.",
        "Roll into ropes, cut into little pillows and roll them over the back of a fork.",
        "Cook in salted boiling water: they're done when they float.",
        "Brown the butter with the sage in a pan, add the drained gnocchi and toss for a minute. Serve with parmesan.",
      ],
    },
  },
  {
    id: "ej-adashim",
    ejemplo: true,
    categoria: "stew",
    dificultad: "easy",
    tiempo: 90,
    porciones: 6,
    imagen: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=70",
    videoQuery: "מתכון תבשיל עדשים",
    he: {
      nombre: "תבשיל עדשים של סיר גדול",
      descripcion: "התבשיל שהחורף מבקש: עדשים, ירקות שורש ונקניקייה מעושנת שמתבשלים לאט. למחרת הוא אפילו יותר טעים.",
      ingredientes: ["400 גרם עדשים", "נקניקייה מעושנת (או צ'וריסו)", "150 גרם פנצ'טה או שומן מעושן", "בצל אחד", "פלפל אדום", "2 גזרים", "2 תפוחי אדמה", "400 גרם עגבניות מרוסקות", "פפריקה מתוקה, עלה דפנה, מלח ופלפל"],
      pasos: [
        "משרים את העדשים כשעה (או משתמשים בעדשים שלא צריכות השריה).",
        "מזהיבים את הפנצ'טה והנקניקייה בפרוסות. מוציאים ושומרים בצד.",
        "באותו סיר מטגנים את הבצל, הפלפל והגזר עד שהם מתרככים.",
        "מוסיפים את העגבניות, הפפריקה, עלה הדפנה, העדשים המסוננות ומים חמים עד לכיסוי נדיב.",
        "מבשלים על אש נמוכה כ־40 דקות. באמצע מוסיפים את תפוחי האדמה בקוביות ואת הבשר ששמרנו. מתקנים תיבול ומגישים חם.",
      ],
    },
    en: {
      nombre: "Big-pot lentil stew",
      descripcion: "The stew winter asks for: lentils, root vegetables and smoked sausage cooked low and slow. Even better the next day.",
      ingredientes: ["400 g lentils", "1 smoked sausage (or chorizo)", "150 g pancetta or smoked bacon", "1 onion", "1 red pepper", "2 carrots", "2 potatoes", "400 g crushed tomatoes", "Sweet paprika, bay leaf, salt and pepper"],
      pasos: [
        "Soak the lentils for an hour (or use the no-soak kind).",
        "Brown the pancetta and sliced sausage. Remove and set aside.",
        "In the same pot, sauté the onion, pepper and carrot until soft.",
        "Add the tomatoes, paprika, bay leaf, drained lentils and hot water to cover generously.",
        "Simmer for about 40 minutes. Halfway through, add the cubed potatoes and the reserved meat. Adjust the seasoning and serve hot.",
      ],
    },
  },
  {
    id: "ej-salat",
    ejemplo: true,
    categoria: "salad",
    dificultad: "easy",
    tiempo: 15,
    porciones: 2,
    imagen: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=70",
    videoQuery: "מתכון סלט ירוק עם אבוקדו",
    he: {
      nombre: "סלט ירוק של שוק",
      descripcion: "עלים ירוקים, אבוקדו, עגבניות שרי וגרעינים קלויים עם ויניגרט לימון וחרדל. ההוכחה שסלט לא חייב להיות משעמם.",
      ingredientes: ["מיקס עלים ירוקים", "אבוקדו אחד", "עגבניות שרי", "חצי מלפפון", "גרעיני חמנייה קלויים", "מיץ מלימון אחד", "כפית חרדל", "3 כפות שמן זית", "מלח ופלפל"],
      pasos: [
        "שוטפים ומייבשים היטב את העלים. חוצים את השרי, פורסים את המלפפון וחותכים את האבוקדו לפלחים.",
        "קולים את הגרעינים במחבת יבשה עד שהם מריחים.",
        "טורפים את הלימון עם החרדל, המלח והפלפל; מוסיפים את השמן בהדרגה עד שהרוטב מתאחד.",
        "מסדרים את הסלט בקערה, מזליפים את הוויניגרט ממש לפני ההגשה ומפזרים את הגרעינים.",
      ],
    },
    en: {
      nombre: "Market greens salad",
      descripcion: "Greens, avocado, cherry tomatoes and toasted seeds with a lemon-mustard vinaigrette. Proof that a salad doesn't have to be boring.",
      ingredientes: ["Mixed salad greens", "1 avocado", "Cherry tomatoes", "1/2 cucumber", "Toasted sunflower seeds", "Juice of 1 lemon", "1 tsp mustard", "3 tbsp olive oil", "Salt and pepper"],
      pasos: [
        "Wash and dry the greens well. Halve the cherry tomatoes, slice the cucumber and cut the avocado into wedges.",
        "Toast the seeds in a dry pan until fragrant.",
        "Whisk the lemon with the mustard, salt and pepper; stream in the oil until it comes together.",
        "Arrange the salad in a bowl, dress it just before serving and finish with the seeds.",
      ],
    },
  },
  {
    id: "ej-pancakes",
    ejemplo: true,
    categoria: "sweet",
    dificultad: "easy",
    tiempo: 25,
    porciones: 3,
    imagen: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=900&q=70",
    videoQuery: "מתכון פנקייקים אווריריים",
    he: {
      nombre: "פנקייקים אווריריים עם דבש",
      descripcion: "מגדל פנקייקים גבוהים ורכים לשבת בבוקר בלי לחץ. עם דבש, פירות, או מה שיש במקרר.",
      ingredientes: ["2 כוסות קמח תופח", "2 כפות סוכר", "קורט מלח", "2 ביצים", "כוס ושלושה רבעים חלב", "40 גרם חמאה מומסת", "תמצית וניל", "דבש ופירות להגשה"],
      pasos: [
        "מערבבים את היבשים בקערה. בקערה אחרת טורפים את הביצים עם החלב, החמאה והווניל.",
        "מאחדים את שתי התערובות בלי לערבב יותר מדי: הבלילה צריכה להישאר עם קצת גושים.",
        "נותנים לבלילה לנוח 10 דקות בזמן שמחממים מחבת על אש בינונית־נמוכה.",
        "יוצקים מנות של בלילה ומטגנים עד שעולות בועות, הופכים ומזהיבים מהצד השני.",
        "מערימים ומגישים עם דבש ופירות טריים.",
      ],
    },
    en: {
      nombre: "Fluffy honey pancakes",
      descripcion: "A tower of tall, fluffy pancakes for a slow weekend morning. With honey, fruit, or whatever's in the fridge.",
      ingredientes: ["2 cups self-raising flour", "2 tbsp sugar", "Pinch of salt", "2 eggs", "1 3/4 cups milk", "40 g melted butter", "Vanilla extract", "Honey and fruit to serve"],
      pasos: [
        "Mix the dry ingredients in one bowl. In another, whisk the eggs with the milk, butter and vanilla.",
        "Combine the two without overmixing: the batter should stay a little lumpy.",
        "Rest it for 10 minutes while you heat a pan over medium-low heat.",
        "Pour in portions and cook until bubbles appear, flip and brown the other side.",
        "Stack and serve with honey and fresh fruit.",
      ],
    },
  },
  {
    id: "ej-shakshuka",
    ejemplo: true,
    categoria: "stew",
    dificultad: "easy",
    tiempo: 35,
    porciones: 3,
    imagen: "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=900&q=70",
    videoQuery: "מתכון שקשוקה",
    he: {
      nombre: "שקשוקה אדומה קלאסית",
      descripcion: "רוטב עגבניות עשיר עם פלפלים, ביצים רכות ולחם טרי לניגוב. ארוחת בוקר, צהריים או ערב — תמיד עובד.",
      ingredientes: ["6 עגבניות בשלות (או קופסת עגבניות מרוסקות)", "פלפל אדום אחד", "בצל אחד", "3 שיני שום", "5 ביצים", "כפית פפריקה מתוקה", "חצי כפית כמון", "שמן זית, מלח ופלפל", "פטרוזיליה ולחם טרי להגשה"],
      pasos: [
        "מטגנים בשמן זית את הבצל והפלפל הקצוצים עד שהם מתרככים ומזהיבים.",
        "מוסיפים את השום, הפפריקה והכמון ומטגנים חצי דקה עד שהריח עולה.",
        "מוסיפים את העגבניות, מתבלים במלח ופלפל ומבשלים 15 דקות עד שהרוטב מסמיך.",
        "יוצרים גומות ברוטב ושוברים לתוכן את הביצים. מכסים ומבשלים עד שהחלבון מתייצב והחלמון עוד רך.",
        "מפזרים פטרוזיליה ומגישים ישר מהמחבת, עם לחם טרי לניגוב.",
      ],
    },
    en: {
      nombre: "Classic red shakshuka",
      descripcion: "A rich tomato and pepper sauce with soft-set eggs and fresh bread for dipping. Breakfast, lunch or dinner — it always works.",
      ingredientes: ["6 ripe tomatoes (or a can of crushed tomatoes)", "1 red pepper", "1 onion", "3 garlic cloves", "5 eggs", "1 tsp sweet paprika", "1/2 tsp cumin", "Olive oil, salt and pepper", "Parsley and fresh bread to serve"],
      pasos: [
        "Sauté the chopped onion and pepper in olive oil until soft and golden.",
        "Add the garlic, paprika and cumin and fry for half a minute until fragrant.",
        "Add the tomatoes, season, and simmer for 15 minutes until the sauce thickens.",
        "Make little wells and crack the eggs into them. Cover and cook until the whites set but the yolks stay soft.",
        "Scatter with parsley and serve straight from the pan, bread on the side.",
      ],
    },
  },
  {
    id: "ej-shokolad",
    ejemplo: true,
    categoria: "sweet",
    dificultad: "medium",
    tiempo: 70,
    porciones: 8,
    imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=70",
    videoQuery: "מתכון עוגת שוקולד עסיסית",
    he: {
      nombre: "עוגת שוקולד עסיסית עם גנאש",
      descripcion: "עוגת השוקולד שלא מפספסת: לחה מבפנים, עם גנאש מבריק מלמעלה. ליום הולדת או סתם ליום שלישי.",
      ingredientes: ["200 גרם שוקולד מריר", "150 גרם חמאה", "4 ביצים", "200 גרם סוכר", "120 גרם קמח", "כפית אבקת אפייה", "200 מ\"ל שמנת מתוקה", "150 גרם שוקולד נוסף לגנאש"],
      pasos: [
        "ממיסים את השוקולד עם החמאה על בן־מארי ונותנים לתערובת להתקרר מעט.",
        "מקציפים את הביצים עם הסוכר עד שהנפח מוכפל; מקפלים פנימה את השוקולד המומס.",
        "מוסיפים את הקמח המנופה עם אבקת האפייה בתנועות עדינות.",
        "אופים בתבנית משומנת ב־170 מעלות כ־35–40 דקות. מצננים.",
        "מחממים את השמנת, יוצקים על השוקולד הקצוץ ומערבבים לגנאש חלק. מצפים את העוגה ונותנים לה להתייצב.",
      ],
    },
    en: {
      nombre: "Fudgy chocolate cake with ganache",
      descripcion: "The chocolate cake that never fails: moist inside, glossy ganache on top. For a birthday, or for a random Tuesday.",
      ingredientes: ["200 g dark chocolate", "150 g butter", "4 eggs", "200 g sugar", "120 g flour", "1 tsp baking powder", "200 ml heavy cream", "150 g extra chocolate for the ganache"],
      pasos: [
        "Melt the chocolate with the butter over a double boiler and let it cool slightly.",
        "Whisk the eggs with the sugar until doubled in volume; fold in the melted chocolate.",
        "Fold in the sifted flour and baking powder gently.",
        "Bake in a greased tin at 170 °C for 35–40 minutes. Let it cool.",
        "Heat the cream, pour it over the chopped chocolate and stir into a smooth ganache. Coat the cake and let it set.",
      ],
    },
  },
];

// ------------------------------------------------------------
// Datos
// ------------------------------------------------------------

const COL = "recetas";

export async function traerRecetas() {
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
// Localización de una receta
// ------------------------------------------------------------

// Devuelve la vista localizada: los ejemplos tienen he/en; las
// recetas de usuarios se muestran tal como se escribieron.
export function loc(r, lang = getLang()) {
  const contenido = r[lang] || r.he || r.en || {};
  return { ...r, ...contenido };
}

export function etiquetaCategoria(r, lang = getLang()) {
  const cats = TEXTOS[lang].cats;
  return cats[r.categoria] || r.categoria || cats.other;
}

export function etiquetaDificultad(r, lang = getLang()) {
  const diffs = TEXTOS[lang].diffs;
  return diffs[r.dificultad] || r.dificultad || "—";
}

// Link a YouTube: siempre buscamos el video en hebreo (si no hay
// resultados en hebreo, YouTube muestra lo que exista).
export function linkVideo(r, lang = getLang()) {
  const nombreHe = r.videoQuery || (r.he ? `מתכון ${r.he.nombre}` : null);
  const consulta = nombreHe || `מתכון ${loc(r, lang).nombre}`;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(consulta)}`;
}

// ------------------------------------------------------------
// Render
// ------------------------------------------------------------

export const IMAGEN_FALLBACK = "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=70";

export function esc(texto) {
  const div = document.createElement("div");
  div.textContent = texto ?? "";
  return div.innerHTML;
}

const ICONO_RELOJ = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;
const ICONO_PLATO = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>`;

export function cartaReceta(r, lang = getLang()) {
  const d = TEXTOS[lang];
  const v = loc(r, lang);
  const img = v.imagen || IMAGEN_FALLBACK;
  return `
    <a class="carta" href="receta.html?id=${encodeURIComponent(r.id)}">
      <div class="carta-img">
        <img src="${esc(img)}" alt="${esc(v.nombre)}" loading="lazy"
             onerror="this.src='${IMAGEN_FALLBACK}'">
        <span class="etiqueta">${esc(etiquetaCategoria(r, lang))}</span>
        ${r.ejemplo ? `<span class="etiqueta etiqueta-ejemplo">${esc(d.example)}</span>` : ""}
      </div>
      <div class="carta-cuerpo">
        <h3>${esc(v.nombre)}</h3>
        <div class="carta-meta">
          <span>${ICONO_RELOJ} ${esc(String(v.tiempo || "—"))} ${esc(d.min)}</span>
          <span>${ICONO_PLATO} ${esc(String(v.porciones || "—"))} ${esc(d.servings_short)}</span>
        </div>
      </div>
    </a>`;
}
