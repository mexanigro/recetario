// ============================================================
// פינת המתכונים — módulo compartido
// Firestore (colección "recetas") + recetas de ejemplo bilingües
// (he/en) con micro-pasos desde cero + helpers de render.
// Las recetas argentinas siguen las proporciones de Paulina
// Cocina (fuente citada en cada receta con `fuente`).
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
// Cada paso es un micro-paso con cantidades y tiempos exactos,
// pensado para alguien que está aprendiendo a cocinar de cero.
// ------------------------------------------------------------

export const RECETAS_EJEMPLO = [
  {
    id: "ej-milanesa",
    ejemplo: true,
    categoria: "meat",
    dificultad: "easy",
    tiempo: 60,
    porciones: 4,
    imagen: "https://images.unsplash.com/photo-1599921841143-819065a55cc6?auto=format&fit=crop&w=900&q=70",
    videoQuery: "מתכון שניצל מילנזה ארגנטינאי",
    fuente: { nombre: "Paulina Cocina", url: "https://www.paulinacocina.net/como-hacer-milanesas-receta-y-trucos-imperdibles/5303" },
    he: {
      nombre: "מילנסה ארגנטינאית אמיתית",
      descripcion: "השניצל הלאומי של ארגנטינה: ציפוי עם שום ופטרוזיליה בתוך הביצה. מפורט מהצעד הראשון, כולל כל הסודות.",
      ingredientes: [
        "1 ק\"ג פרוסות בקר דקות (עובי חצי ס\"מ, נתח כמו כתף או ראמפ) — או פרוסות חזה עוף",
        "3 ביצים",
        "חצי כף שטוחה מלח",
        "3 שיני שום, קצוצות דק ככל האפשר",
        "3 כפות פטרוזיליה טרייה קצוצה",
        "כפית חרדל (לא חובה — אבל משדרג)",
        "רבע כפית פלפל שחור",
        "500 גרם פירורי לחם",
        "2 כוסות שמן לטיגון",
        "לימון חתוך לרבעים, להגשה",
      ],
      pasos: [
        "מוציאים את הבשר מהמקרר כ־20 דקות לפני שמתחילים, כדי שלא יגיע קר למחבת. אם הפרוסות עבות מחצי ס\"מ — מניחים כל אחת בין שני ניירות אפייה ומרדדים בעדינות עם פטיש בשר או תחתית של סיר קטן.",
        "שוברים 3 ביצים לקערה רחבה ושטוחה, כזו שנכנסת בה פרוסה שלמה בשכיבה.",
        "מוסיפים לביצים: חצי כף שטוחה מלח, 3 שיני השום הקצוצות, 3 כפות הפטרוזיליה, כפית החרדל ורבע כפית פלפל שחור.",
        "טורפים היטב במזלג במשך דקה שלמה, עד שהחלמון והחלבון מתאחדים לגמרי. תערובת אחידה = ציפוי שלא נופל.",
        "מכניסים את כל הפרוסות לקערת הביצים, הופכים כל אחת כדי שתתכסה, ומשאירים 10 דקות בתערובת. (יש זמן? לילה במקרר בתוך התערובת — והבשר ייצא עוד יותר עסיסי.)",
        "שופכים את 500 גרם פירורי הלחם למגש רחב ושטוח, בשכבה אחידה.",
        "מניחים פרוסה אחת על הפירורים, מפזרים פירורים גם מלמעלה, ולוחצים חזק עם כף היד פתוחה — הלחיצה היא מה שמדביק את הציפוי. מנערים עודפים ומניחים בצלחת. חוזרים עם כל הפרוסות.",
        "רוצים ציפוי עבה כמו במסעדה? מחזירים כל פרוסה מצופה לביצה ואז שוב לפירורים (ציפוי כפול).",
        "מחממים 2 כוסות שמן במחבת רחבה על אש בינונית־גבוהה, עד גובה של כ־1 ס\"מ. בדיקה: זורקים פירור לחם — אם הוא מבעבע מיד מסביב, השמן מוכן. אם הוא שוקע בשקט, מחכים עוד.",
        "מטגנים 2–3 מילנסות בכל פעם — לא לצופף, אחרת הטמפרטורה צונחת והציפוי סופג שמן. 2–3 דקות מכל צד, עד זהוב עמוק. הופכים בעדינות עם מלקחיים.",
        "מעבירים לצלחת מרופדת בנייר סופג לדקה, שיירד עודף השמן.",
        "גרסה בתנור (קלה יותר): מסדרים על תבנית עם נייר אפייה, מזלפים מעט שמן מעל ואופים ב־200 מעלות — 10 דקות, הופכים, ועוד 10 דקות עד שמזהיב. מגישים חם עם רבע לימון לסחיטה.",
      ],
    },
    en: {
      nombre: "Real Argentine milanesa",
      descripcion: "Argentina's national schnitzel: the garlic and parsley go into the egg wash. Explained from the very first step, secrets included.",
      ingredientes: [
        "1 kg thin beef slices (about 1/2 cm thick — round or shoulder cut), or chicken breast slices",
        "3 eggs",
        "1/2 level tablespoon salt",
        "3 garlic cloves, chopped as finely as you can",
        "3 tbsp chopped fresh parsley",
        "1 tsp mustard (optional — but it lifts everything)",
        "1/4 tsp black pepper",
        "500 g breadcrumbs",
        "2 cups oil for frying",
        "Lemon wedges, to serve",
      ],
      pasos: [
        "Take the meat out of the fridge 20 minutes before you start so it doesn't hit the pan cold. If the slices are thicker than 1/2 cm, put each between two sheets of baking paper and gently flatten with a meat mallet or the base of a small pot.",
        "Crack 3 eggs into a wide, shallow bowl — one a whole slice can lie flat in.",
        "Add to the eggs: 1/2 level tablespoon of salt, the 3 chopped garlic cloves, 3 tbsp parsley, the teaspoon of mustard and 1/4 tsp black pepper.",
        "Beat well with a fork for a full minute, until yolk and white are completely combined. A uniform mix is what keeps the coating from falling off.",
        "Put all the slices into the egg mixture, turning each one to coat, and leave them for 10 minutes. (Got time? Overnight in the fridge in the egg makes them even juicier.)",
        "Pour the 500 g of breadcrumbs into a wide, shallow tray in an even layer.",
        "Lay one slice on the crumbs, sprinkle more on top, and press down hard with your open palm — the pressing is what glues the coating on. Shake off the excess and set on a plate. Repeat with every slice.",
        "Want the thick restaurant-style crust? Dip each coated slice back in the egg and again in the crumbs (double coating).",
        "Heat the 2 cups of oil in a wide pan over medium-high heat, about 1 cm deep. Test: drop in a breadcrumb — if it bubbles instantly around the edges, the oil is ready. If it sinks quietly, wait.",
        "Fry 2–3 milanesas at a time — don't crowd the pan or the temperature drops and the coating soaks up oil. 2–3 minutes per side until deep golden. Flip gently with tongs.",
        "Move to a plate lined with paper towels for a minute to drain.",
        "Oven version (easier): arrange on a tray with baking paper, drizzle with a little oil and bake at 200 °C — 10 minutes, flip, 10 more until golden. Serve hot with a lemon wedge to squeeze over.",
      ],
    },
  },
  {
    id: "ej-pastel-papa",
    ejemplo: true,
    categoria: "meat",
    dificultad: "medium",
    tiempo: 90,
    porciones: 6,
    imagen: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=70",
    videoQuery: "מתכון פאי בשר ותפוחי אדמה",
    fuente: { nombre: "Paulina Cocina", url: "https://www.paulinacocina.net/pastel-de-papas/15" },
    he: {
      nombre: "פסטל דה פאפה — פאי בשר ופירה ארגנטינאי",
      descripcion: "הקלאסיקה של המטבח הארגנטינאי: בשר טחון מתובל עם ביצה קשה וזיתים, מתחת לשמיכת פירה מוזהבת. כל שלב מוסבר מאפס.",
      ingredientes: [
        "1 ק\"ג תפוחי אדמה (6–8 בינוניים)",
        "500 גרם בשר בקר טחון",
        "בצל גדול אחד",
        "פלפל אדום אחד",
        "2 שיני שום",
        "2 ביצים (לביצים קשות)",
        "10 זיתים ירוקים מגולענים",
        "כפית פפריקה מתוקה",
        "חצי כפית כמון",
        "50 גרם חמאה",
        "חצי כוס חלב חם",
        "קורט אגוז מוסקט",
        "3 כפות שמן, מלח ופלפל",
        "חופן גבינה צהובה מגוררת (לא חובה)",
      ],
      pasos: [
        "מתחילים מהביצים הקשות: מניחים 2 ביצים בסיר קטן, מכסים במים, מביאים לרתיחה ומבשלים 10 דקות. מעבירים למים קרים, מקלפים וקוצצים גס. שומרים בצד.",
        "מקלפים את תפוחי האדמה וחותכים לקוביות של כ־3 ס\"מ. קוביות בגודל אחיד מתבשלות אחיד.",
        "מכניסים את הקוביות לסיר, מכסים במים קרים, מוסיפים כף מלח ומביאים לרתיחה. מבשלים 15–20 דקות, עד שסכין נכנסת בלי שום התנגדות.",
        "בינתיים, ההכנות לבשר: קוצצים את הבצל לקוביות קטנות, את הפלפל האדום לקוביות קטנות, ואת שיני השום — דק דק.",
        "מחממים 3 כפות שמן בסיר רחב על אש בינונית. מוסיפים את הבצל ומטגנים 5–7 דקות תוך ערבוב, עד שהוא רך ושקוף (לא חום).",
        "מוסיפים את הפלפל ומטגנים עוד 3 דקות. מוסיפים את השום ומטגנים חצי דקה בלבד — רק עד שעולה הריח.",
        "מגבירים את האש, מוסיפים את 500 גרם הבשר הטחון ומפוררים אותו עם כף עץ לפירורים קטנים. מטגנים 5–7 דקות, עד שלא נשאר שום ורוד.",
        "מתבלים: כפית פפריקה, חצי כפית כמון, כפית שטוחה מלח ופלפל שחור. מנמיכים את האש ומבשלים 10 דקות. טועמים — ומתקנים תיבול בלי פחד.",
        "מכבים את האש ומערבבים פנימה את הביצים הקשות הקצוצות ואת הזיתים פרוסים לטבעות.",
        "מסננים את תפוחי האדמה ומחזירים אותם לסיר החם לדקה על אש כבויה — האדים שיוצאים = פירה פחות מימי.",
        "מועכים עם מועך או מזלג יחד עם 50 גרם החמאה. מוסיפים את חצי כוס החלב החם בהדרגה, תוך ערבוב, עד שמתקבל פירה חלק. מתבלים במלח וקורט אגוז מוסקט.",
        "הרכבה בתבנית בינונית (בערך 20×30 ס\"מ): שכבת פירה דקה בתחתית, כל תערובת הבשר מעל, ואז שאר הפירה כשמיכה. מיישרים עם גב של כף.",
        "מציירים פסים עם מזלג על הפירה — הפסים האלה משחימים הכי יפה. מפזרים מעל גבינה מגוררת, אם בא לכם.",
        "אופים ב־200 מעלות 15–20 דקות, עד שהפנים מוזהבות. הכי חשוב: 10 דקות מנוחה לפני החיתוך, כדי שהשכבות יתייצבו ולא יתפרקו.",
      ],
    },
    en: {
      nombre: "Pastel de papa — Argentine meat & mash pie",
      descripcion: "An Argentine kitchen classic: seasoned ground beef with hard-boiled egg and olives, under a golden blanket of mash. Every step explained from zero.",
      ingredientes: [
        "1 kg potatoes (6–8 medium)",
        "500 g ground beef",
        "1 large onion",
        "1 red bell pepper",
        "2 garlic cloves",
        "2 eggs (for hard-boiling)",
        "10 pitted green olives",
        "1 tsp sweet paprika",
        "1/2 tsp cumin",
        "50 g butter",
        "1/2 cup warm milk",
        "Pinch of nutmeg",
        "3 tbsp oil, salt and pepper",
        "Handful of grated cheese (optional)",
      ],
      pasos: [
        "Start with the hard-boiled eggs: put 2 eggs in a small pot, cover with water, bring to a boil and cook 10 minutes. Move to cold water, peel and roughly chop. Set aside.",
        "Peel the potatoes and cut into ~3 cm cubes. Even cubes cook evenly.",
        "Put the cubes in a pot, cover with cold water, add a tablespoon of salt and bring to a boil. Cook 15–20 minutes, until a knife slides in with zero resistance.",
        "Meanwhile, prep for the meat: dice the onion small, dice the red pepper small, and mince the garlic as fine as you can.",
        "Heat 3 tbsp oil in a wide pot over medium heat. Add the onion and cook 5–7 minutes, stirring, until soft and translucent (not brown).",
        "Add the pepper and cook 3 more minutes. Add the garlic for just half a minute — only until you can smell it.",
        "Turn up the heat, add the 500 g of ground beef and break it up with a wooden spoon into small crumbs. Cook 5–7 minutes, until no pink remains.",
        "Season: 1 tsp paprika, 1/2 tsp cumin, a level teaspoon of salt and black pepper. Lower the heat and cook 10 minutes. Taste — and adjust without fear.",
        "Turn off the heat and stir in the chopped hard-boiled eggs and the olives, sliced into rings.",
        "Drain the potatoes and return them to the hot pot for a minute, heat off — the steam escaping means a less watery mash.",
        "Mash with a masher or fork together with the 50 g of butter. Add the 1/2 cup of warm milk gradually, stirring, until the mash is smooth. Season with salt and a pinch of nutmeg.",
        "Assemble in a medium baking dish (about 20×30 cm): a thin layer of mash on the bottom, all the meat mixture over it, then the rest of the mash as a blanket. Smooth with the back of a spoon.",
        "Draw lines across the top with a fork — those ridges brown the best. Scatter grated cheese on top if you like.",
        "Bake at 200 °C for 15–20 minutes, until the top is golden. Most important: rest 10 minutes before cutting so the layers set and don't collapse.",
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
    fuente: { nombre: "Yotam Ottolenghi", url: "https://ottolenghi.co.uk/pages/recipes/shakshuka" },
    he: {
      nombre: "שקשוקה של אוטולנגי",
      descripcion: "השקשוקה מהאתר הרשמי של יוטם אוטולנגי — עם הריסה, רסק עגבניות והרבה פלפלים. מחבת אחת, תוצאה של מסעדה.",
      ingredientes: [
        "2 כפות שמן זית",
        "כפית הריסה (או חצי כפית פתיתי צ'ילי, למי שמעדיף עדין)",
        "2 כפיות רסק עגבניות",
        "2 פלפלים אדומים גדולים, חתוכים לקוביות (כ־2 כוסות)",
        "4 שיני שום, קצוצות דק",
        "כפית כמון טחון",
        "5 כוסות עגבניות בשלות קצוצות (כ־800 גרם, או 2 קופסאות מרוסקות)",
        "4–5 ביצים",
        "כפית שטוחה מלח",
        "לאבנה או יוגורט סמיך ולחם טרי, להגשה",
      ],
      pasos: [
        "חותכים את 2 הפלפלים לקוביות של כ־1 ס\"מ (בערך 2 כוסות). קוצצים דק את 4 שיני השום.",
        "אם משתמשים בעגבניות טריות: קוצצים גס כ־800 גרם עגבניות בשלות. אפשר גם 2 קופסאות עגבניות מרוסקות — עובד מצוין.",
        "מחממים 2 כפות שמן זית במחבת רחבה על אש בינונית.",
        "מוסיפים את ההריסה, 2 כפיות רסק העגבניות, קוביות הפלפל, השום, כפית הכמון וכפית מלח.",
        "מטגנים הכול יחד כ־8 דקות תוך ערבוב, עד שהפלפלים מתרככים ומקבלים צבע. זה הבסיס של כל הטעם — לא לקצר.",
        "מוסיפים את העגבניות הקצוצות ומבשלים כ־10 דקות בלי מכסה, עד שמתקבל רוטב סמיך. בודקים: מעבירים כף באמצע — אם נשאר שביל, הרוטב מוכן.",
        "טועמים ומתקנים תיבול. זה הרגע האחרון לערבב — אחרי הביצים לא נוגעים.",
        "יוצרים גומות ברוטב עם גב של כף, ושוברים ביצה לתוך כל גומה. הכי בטוח: לשבור כל ביצה קודם לכוס קטנה ולהחליק ממנה פנימה.",
        "מנמיכים את האש, מכסים ומבשלים 5–8 דקות, עד שהחלבון יציב והחלמון עדיין רך ורוטט.",
        "מגישים ישר מהמחבת עם כף לאבנה או יוגורט מעל ולחם טרי לניגוב.",
      ],
    },
    en: {
      nombre: "Ottolenghi's shakshuka",
      descripcion: "The shakshuka from Yotam Ottolenghi's official site — with harissa, tomato paste and plenty of peppers. One pan, restaurant result.",
      ingredientes: [
        "2 tbsp olive oil",
        "1 tsp harissa (or 1/2 tsp chili flakes for a milder version)",
        "2 tsp tomato paste",
        "2 large red peppers, diced (about 2 cups)",
        "4 garlic cloves, finely chopped",
        "1 tsp ground cumin",
        "5 cups chopped ripe tomatoes (about 800 g, or 2 cans crushed)",
        "4–5 eggs",
        "1 level tsp salt",
        "Labneh or thick yogurt and fresh bread, to serve",
      ],
      pasos: [
        "Cut the 2 peppers into ~1 cm dice (about 2 cups). Finely chop the 4 garlic cloves.",
        "If using fresh tomatoes: roughly chop about 800 g of ripe ones. Two cans of crushed tomatoes work great too.",
        "Heat 2 tbsp olive oil in a wide pan over medium heat.",
        "Add the harissa, the 2 tsp of tomato paste, the diced peppers, the garlic, the teaspoon of cumin and a teaspoon of salt.",
        "Cook everything together for about 8 minutes, stirring, until the peppers soften and take on color. This is the base of all the flavor — don't rush it.",
        "Add the chopped tomatoes and simmer about 10 minutes, uncovered, until you get a thick sauce. Test: drag a spoon through the middle — if it leaves a trail, it's ready.",
        "Taste and adjust the seasoning. Last chance to stir — once the eggs are in, hands off.",
        "Make wells in the sauce with the back of a spoon and crack an egg into each. Safest way: crack each egg into a small cup first, then slide it in.",
        "Lower the heat, cover and cook 5–8 minutes, until the whites are set and the yolks still soft and wobbly.",
        "Serve straight from the pan with a spoonful of labneh or yogurt on top and fresh bread for dipping.",
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
    fuente: { nombre: "J. Kenji López-Alt, Serious Eats", url: "https://www.seriouseats.com/three-great-vinaigrettes-salad-dressings-recipe" },
    he: {
      nombre: "סלט ירוק עם הוויניגרט של סריוס איטס",
      descripcion: "המתכון הכי פשוט כאן — עם רוטב הוויניגרט הבסיסי של קנג'י לופז־אלט (Serious Eats): מנערים בצנצנת, בלי מיומנות בכלל.",
      ingredientes: [
        "חבילת מיקס עלים ירוקים (כ־150 גרם)",
        "אבוקדו בשל אחד",
        "10 עגבניות שרי",
        "חצי מלפפון",
        "2 כפות גרעיני חמנייה",
        "לוויניגרט: 3 כפות מיץ לימון (או חומץ יין לבן)",
        "כף מים",
        "4 כפיות חרדל דיז'ון",
        "3/4 כוס שמן (חצי כוס שמן ניטרלי + רבע כוס שמן זית)",
        "חצי כפית מלח, רבע כפית פלפל שחור גרוס",
      ],
      pasos: [
        "שוטפים את העלים במים קרים ומייבשים היטב — במגבת נקייה או במסננת. עלים רטובים דוחים את הרוטב, זה ההבדל בין סלט טוב לרטוב.",
        "חוצים את עגבניות השרי. פורסים את חצי המלפפון למדליונים דקים.",
        "חוצים את האבוקדו לאורכו, מסובבים לפתיחה, מוציאים את הגלעין בזהירות וחותכים את הבשר לקוביות ישר בתוך הקליפה — ואז מרוקנים עם כף.",
        "קולים את 2 כפות הגרעינים במחבת יבשה (בלי שמן) על אש בינונית 2–3 דקות, תוך ניעור, עד שהם מזהיבים ומריחים. לא עוזבים אותם — הם נשרפים בשנייה.",
        "הוויניגרט של קנג'י, בשיטת הצנצנת: מכניסים לצנצנת עם מכסה את 3 כפות מיץ הלימון, כף המים, 4 כפיות החרדל, 3/4 כוס השמן, חצי כפית מלח ורבע כפית פלפל.",
        "סוגרים את המכסה היטב ומנערים חזק 20–30 שניות, עד שהרוטב נהיה אחיד וסמיך. זה כל הסוד: החרדל מאחד את השמן והחומצה (אמולסיה) — בלי טריפה ובלי מיומנות.",
        "יוצא בערך כוס רוטב — לסלט הזה צריך רק 2–3 כפות. השאר נשמר במקרר בצנצנת סגורה, ורק מנערים שוב לפני כל שימוש.",
        "מניחים את העלים בקערה, ומעל השרי, המלפפון והאבוקדו. לא מערבבים עדיין!",
        "רגע לפני ההגשה בלבד: מזליפים 2–3 כפות מהוויניגרט, מערבבים בעדינות עם שתי כפות מלמטה למעלה, ומפזרים את הגרעינים. עלים שמחכים ברוטב — נובלים.",
      ],
    },
    en: {
      nombre: "Green salad with the Serious Eats vinaigrette",
      descripcion: "The simplest recipe here — with J. Kenji López-Alt's basic vinaigrette from Serious Eats: shake it in a jar, zero skill required.",
      ingredientes: [
        "1 bag mixed salad greens (about 150 g)",
        "1 ripe avocado",
        "10 cherry tomatoes",
        "1/2 cucumber",
        "2 tbsp sunflower seeds",
        "For the vinaigrette: 3 tbsp lemon juice (or white wine vinegar)",
        "1 tbsp water",
        "4 tsp Dijon mustard",
        "3/4 cup oil (1/2 cup neutral oil + 1/4 cup olive oil)",
        "1/2 tsp salt, 1/4 tsp freshly ground black pepper",
      ],
      pasos: [
        "Wash the greens in cold water and dry them really well — in a clean towel or colander. Wet leaves repel dressing; it's the difference between a good salad and a soggy one.",
        "Halve the cherry tomatoes. Slice the half cucumber into thin rounds.",
        "Halve the avocado lengthwise, twist it open, carefully remove the pit and cube the flesh right inside the skin — then scoop it out with a spoon.",
        "Toast the 2 tbsp of seeds in a dry pan (no oil) over medium heat for 2–3 minutes, shaking, until golden and fragrant. Don't walk away — they burn in a second.",
        "Kenji's vinaigrette, jar method: put the 3 tbsp lemon juice, 1 tbsp water, 4 tsp Dijon, the 3/4 cup of oil, 1/2 tsp salt and 1/4 tsp pepper into a jar with a lid.",
        "Seal the lid tight and shake hard for 20–30 seconds, until the dressing turns uniform and slightly thick. That's the whole secret: the mustard binds oil and acid together (an emulsion) — no whisking, no skill.",
        "This makes about a cup of dressing — this salad only needs 2–3 tablespoons. The rest keeps in the fridge in the sealed jar; just shake again before each use.",
        "Lay the greens in a bowl, then the tomatoes, cucumber and avocado on top. Don't toss yet!",
        "Only right before serving: drizzle 2–3 tablespoons of the vinaigrette, toss gently with two spoons from the bottom up, and scatter the toasted seeds. Leaves that sit in dressing wilt.",
      ],
    },
  },
  {
    id: "ej-pancakes",
    ejemplo: true,
    categoria: "sweet",
    dificultad: "easy",
    tiempo: 30,
    porciones: 3,
    imagen: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=900&q=70",
    videoQuery: "מתכון פנקייקים אווריריים",
    fuente: { nombre: "AllRecipes — Good Old-Fashioned Pancakes", url: "https://www.allrecipes.com/recipe/21014/good-old-fashioned-pancakes/" },
    he: {
      nombre: "הפנקייקים המפורסמים של AllRecipes",
      descripcion: "„Good Old-Fashioned Pancakes” — מתכון הפנקייקים המדורג ביותר באינטרנט, עם עשרות אלפי ביקורות. 7 מצרכים שיש בכל בית.",
      ingredientes: [
        "כוס וחצי קמח (210 גרם)",
        "3 וחצי כפיות אבקת אפייה",
        "כף סוכר",
        "רבע כפית מלח",
        "כוס ורבע חלב (300 מ\"ל)",
        "ביצה אחת",
        "3 כפות חמאה מומסת (וקצת נוספת לטיגון)",
        "דבש או מייפל ופירות, להגשה",
      ],
      pasos: [
        "ממיסים 3 כפות חמאה במיקרו (20–30 שניות) או במחבת, ונותנים לה להתקרר 2 דקות — חמאה רותחת מבשלת את הביצה.",
        "בקערה גדולה מנפים או מערבבים היטב את היבשים: כוס וחצי קמח, 3 וחצי כפיות אבקת אפייה, כף סוכר ורבע כפית מלח.",
        "יוצרים גומה במרכז היבשים.",
        "שופכים לגומה את כוס ורבע החלב, הביצה והחמאה המומסת.",
        "מערבבים רק עד שהבלילה חלקה ואין איים של קמח יבש. לא מערבבים מעבר לזה — ערבוב יתר מוציא פנקייקים קשים.",
        "מחממים מחבת רחבה על אש בינונית 2 דקות, ומשמנים בשכבה דקה של חמאה (מנגבים עודף עם נייר).",
        "יוצקים בערך רבע כוס בלילה לכל פנקייק. לא מזיזים אותו אחרי היציקה.",
        "מחכים 2–3 דקות, עד שמופיעות בועות על פני השטח והשוליים נראים יבשים — זה הסימן להפוך. הופכים בתנועה אחת בטוחה.",
        "עוד דקה־שתיים מהצד השני, עד שהוא חום־זהוב. הפנקייק הראשון תמיד יוצא מוזר — חוק טבע. טועמים אותו ומתקדמים.",
        "עורמים מגדל, מוזגים דבש או מייפל, ומוסיפים פירות. מגישים מיד — פנקייקים לא אוהבים לחכות.",
      ],
    },
    en: {
      nombre: "The famous AllRecipes pancakes",
      descripcion: "\"Good Old-Fashioned Pancakes\" — the highest-rated pancake recipe on the internet, with tens of thousands of reviews. 7 ingredients every kitchen has.",
      ingredientes: [
        "1 1/2 cups flour (210 g)",
        "3 1/2 tsp baking powder",
        "1 tbsp sugar",
        "1/4 tsp salt",
        "1 1/4 cups milk (300 ml)",
        "1 egg",
        "3 tbsp melted butter (plus a little extra for the pan)",
        "Honey or maple syrup and fruit, to serve",
      ],
      pasos: [
        "Melt the 3 tbsp of butter in the microwave (20–30 seconds) or in a pan, and let it cool for 2 minutes — boiling butter scrambles the egg.",
        "In a large bowl, sift or whisk together the dry ingredients: 1 1/2 cups flour, 3 1/2 tsp baking powder, 1 tbsp sugar and 1/4 tsp salt.",
        "Make a well in the center of the dry mix.",
        "Pour the 1 1/4 cups of milk, the egg and the melted butter into the well.",
        "Mix just until the batter is smooth with no islands of dry flour. Stop there — overmixing makes tough pancakes.",
        "Heat a wide pan over medium heat for 2 minutes, and grease with a thin layer of butter (wipe off the excess with paper towel).",
        "Pour about 1/4 cup of batter per pancake. Don't move it once it's poured.",
        "Wait 2–3 minutes, until bubbles appear on the surface and the edges look dry — that's your flip signal. Flip in one confident motion.",
        "One or two more minutes on the other side, until golden brown. The first pancake always comes out weird — law of nature. Taste it and move on.",
        "Stack them up, pour over honey or maple, add fruit. Serve immediately — pancakes don't like waiting.",
      ],
    },
  },
  {
    id: "ej-adashim",
    ejemplo: true,
    categoria: "stew",
    dificultad: "easy",
    tiempo: 75,
    porciones: 6,
    imagen: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=70",
    videoQuery: "מתכון תבשיל עדשים עם בשר",
    fuente: { nombre: "Paulina Cocina", url: "https://www.paulinacocina.net/guiso-lentejas-receta-infalible/10685" },
    he: {
      nombre: "תבשיל עדשים ארגנטינאי (גיסו)",
      descripcion: "ה„גיסו” האגדי של פאולינה קוסינה — תבשיל העדשים הארגנטינאי עם נקניקייה מעושנת, פנצ'טה ובשר. כולל הטריק להוריד את השומן מהנקניק.",
      ingredientes: [
        "350 גרם עדשים (ירוקות או חומות)",
        "נקניקייה מעושנת חריפה (צ'וריסו קולורדו — או כל נקניקייה מעושנת)",
        "150 גרם פנצ'טה או בייקון",
        "250 גרם בשר בקר לקוביות (צלי או כתף)",
        "בצל גדול אחד, 2 שיני שום, חצי פלפל אדום",
        "תפוח אדמה גדול אחד וגזר אחד",
        "2 עגבניות קצוצות + חצי כוס רסק/פסטה של עגבניות",
        "חצי כוס יין אדום",
        "2 עלי דפנה, פפריקה, אורגנו, מלח ופלפל",
        "שמן זית ופטרוזיליה להגשה",
      ],
      pasos: [
        "הטריק של פאולינה נגד שומן: פורסים את הנקניקייה המעושנת לרבעי פרוסות, מכניסים לסיר קטן עם מים, מרתיחים 15 דקות ומסננים. ככה התבשיל לא יוצא שמנוני.",
        "חותכים את הפנצ'טה לקוביות קטנות ואת הבשר לקוביות קצת יותר גדולות.",
        "בסיר גדול, על אש חזקה ובלי שמן, מפזרים את קוביות הפנצ'טה ולא נוגעים בהן עד שהן מתחילות להשמיע רחשים. מערבבים לאט עד שהיא פריכה ומוזהבת.",
        "מוסיפים את הנקניקייה המסוננת ומטגנים יחד עד שהיא מזהיבה. מוציאים הכול ושומרים בצד.",
        "באותו סיר מוסיפים מעט שמן זית ומשחימים את קוביות הבשר מכל הצדדים, 4–5 דקות. מוציאים ושומרים עם שאר הבשרים.",
        "קוצצים את הבצל, השום וחצי הפלפל, ומטגנים בסיר 5–6 דקות עד שהבצל שקוף.",
        "מוסיפים את 2 העגבניות הקצוצות ומבשלים 3 דקות.",
        "מחזירים את כל הבשרים לסיר, שופכים את חצי כוס היין ומגרדים עם כף עץ את כל מה שנדבק לתחתית — שם הטעם.",
        "מוסיפים את תפוח האדמה והגזר בקוביות, ומתבלים: כפית פפריקה, כפית אורגנו, מלח ופלפל.",
        "מוסיפים את רסק העגבניות ואת 350 גרם העדשים השטופות, ומערבבים הכול.",
        "מכסים במים חמים עד כ־2 ס\"מ מעל הכול, מוסיפים את 2 עלי הדפנה, מכסים ומבשלים על אש בינונית־נמוכה 40–50 דקות, מערבבים מדי פעם שלא יידבק.",
        "התבשיל מוכן כשהעדשים רכות והרוטב סמיך. טועמים, מתקנים תיבול, מפזרים פטרוזיליה ומגישים חם. יום אחרי — עוד יותר טעים.",
      ],
    },
    en: {
      nombre: "Argentine lentil stew (guiso)",
      descripcion: "Paulina Cocina's legendary \"infallible\" guiso — the Argentine lentil stew with smoked sausage, pancetta and beef. Includes her trick for de-greasing the sausage.",
      ingredientes: [
        "350 g lentils (green or brown)",
        "1 smoked spicy sausage (chorizo colorado — or any smoked sausage)",
        "150 g pancetta or bacon",
        "250 g beef, cubed (chuck or roast)",
        "1 large onion, 2 garlic cloves, 1/2 red pepper",
        "1 large potato and 1 carrot",
        "2 chopped tomatoes + 1/2 cup tomato purée",
        "1/2 cup red wine",
        "2 bay leaves, paprika, oregano, salt and pepper",
        "Olive oil and parsley to serve",
      ],
      pasos: [
        "Paulina's anti-grease trick: slice the smoked sausage into quartered rounds, put them in a small pot with water, boil for 15 minutes and drain. That's how the stew stays un-greasy.",
        "Cut the pancetta into small cubes and the beef into slightly bigger ones.",
        "In a large pot, over high heat and with no oil, scatter the pancetta cubes and don't touch them until they start to sizzle. Stir slowly until crisp and golden.",
        "Add the drained sausage and fry together until it browns. Take everything out and set aside.",
        "In the same pot, add a little olive oil and brown the beef cubes on all sides, 4–5 minutes. Remove and keep with the other meats.",
        "Chop the onion, garlic and half pepper, and cook them in the pot 5–6 minutes until the onion is translucent.",
        "Add the 2 chopped tomatoes and cook 3 minutes.",
        "Return all the meats to the pot, pour in the 1/2 cup of wine and scrape the bottom with a wooden spoon to lift everything stuck there — that's where the flavor is.",
        "Add the cubed potato and carrot, and season: a teaspoon of paprika, a teaspoon of oregano, salt and pepper.",
        "Add the tomato purée and the 350 g of rinsed lentils, and stir everything together.",
        "Cover with hot water to about 2 cm above everything, add the 2 bay leaves, cover and cook over medium-low heat 40–50 minutes, stirring now and then so it doesn't stick.",
        "It's ready when the lentils are soft and the sauce is thick. Taste, adjust the seasoning, scatter parsley and serve hot. Day two — even better.",
      ],
    },
  },
  {
    id: "ej-gnocchi",
    ejemplo: true,
    categoria: "pasta",
    dificultad: "medium",
    tiempo: 75,
    porciones: 4,
    imagen: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=70",
    videoQuery: "מתכון ניוקי תפוחי אדמה",
    fuente: { nombre: "GialloZafferano", url: "https://www.giallozafferano.com/recipes/Potato-gnocchi.html" },
    he: {
      nombre: "ניוקי תפוחי אדמה מאפס",
      descripcion: "לפי המתכון של ג'אלו־זפרנו, אתר המתכונים הכי גדול באיטליה: 1 ק\"ג תפוחי אדמה, 300 גרם קמח וביצה. עם כל הטריקים כתובים.",
      ingredientes: [
        "1 ק\"ג תפוחי אדמה בגודל דומה (עדיף מסוג קמחי)",
        "300 גרם קמח (ועוד קצת לקימוח משטח)",
        "ביצה אחת",
        "כפית מלח, קורט אגוז מוסקט",
        "80 גרם חמאה",
        "10 עלי מרווה (או בלעדיהם — חמאה חומה לבד זה נפלא)",
        "פרמז'ן מגורר, להגשה",
      ],
      pasos: [
        "שוטפים את תפוחי האדמה ומבשלים אותם שלמים ועם הקליפה בסיר מים רותחים עם מלח, 25–30 דקות. הקליפה שומרת שלא ייספגו מים — וזה כל ההבדל בבצק.",
        "בודקים עם סכין: אם היא נכנסת עד הלב בלי התנגדות, הם מוכנים. מסננים.",
        "מקלפים אותם בעודם חמים (מחזיקים במגבת, הקליפה יורדת בקלות) ומועכים מיד — במועך פירה, מזלג או פומפייה. אסור שיתקררו לפני המעיכה.",
        "מפזרים את המחית על משטח העבודה ונותנים לה 10 דקות להצטנן ולשחרר אדים. מחית חמה מדי תספוג יותר מדי קמח.",
        "אוספים את המחית לתלולית, יוצרים גומה, ושוברים לתוכה את הביצה. מוסיפים כפית מלח וקורט אגוז מוסקט.",
        "מפזרים את 300 גרם הקמח מעל ומאחדים בידיים בתנועות קיפול עדינות — רק עד שנוצר בצק רך ואחיד שלא נדבק לידיים. לא ללוש כמו לחם! לישה = ניוקי גומי.",
        "מחלקים את הבצק ל־6 חלקים. על משטח מקומח, מגלגלים כל חלק לנחש בעובי 2 ס\"מ.",
        "חותכים כל נחש לכריות של 2 ס\"מ עם סכין. רוצים את הפסים הקלאסיים? מגלגלים כל כרית על שיני מזלג בלחיצה קלה.",
        "מרתיחים סיר גדול של מים עם כף מלח. שמים ליד המחבת עם 80 גרם החמאה ועלי המרווה — הכול קורה מהר בסוף.",
        "מבשלים את הניוקי בשתי מנות: זורקים חצי לכל פעם, ומחכים שיצופו. מרגע הציפה — עוד 30 שניות, ומוציאים עם כף מחוררת ישר למחבת.",
        "בזמן הבישול: ממיסים את החמאה עם המרווה על אש בינונית עד שהיא מפסיקה לקצוף ומריחה אגוזי (2–3 דקות). לא חומה כהה — זהוב עמוק.",
        "מקפיצים את הניוקי בחמאה חצי דקה עם 2 כפות ממי הבישול, עד שנוצר רוטב מבריק. מגישים מיד עם פרמז'ן בנדיבות.",
      ],
    },
    en: {
      nombre: "Potato gnocchi from scratch",
      descripcion: "Based on the GialloZafferano recipe, Italy's biggest recipe site: 1 kg potatoes, 300 g flour and an egg. Every trick written down.",
      ingredientes: [
        "1 kg potatoes, similar size (floury type is best)",
        "300 g flour (plus extra for dusting)",
        "1 egg",
        "1 tsp salt, pinch of nutmeg",
        "80 g butter",
        "10 sage leaves (or skip them — brown butter alone is wonderful)",
        "Grated parmesan, to serve",
      ],
      pasos: [
        "Wash the potatoes and boil them whole, skin on, in salted water for 25–30 minutes. The skin keeps water out — and that's the whole difference in the dough.",
        "Test with a knife: if it slides to the center with no resistance, they're done. Drain.",
        "Peel them while hot (hold with a towel; the skin slips right off) and mash immediately — with a masher, fork or ricer. They must not cool before mashing.",
        "Spread the mash on your work surface and give it 10 minutes to cool and release steam. Mash that's too hot drinks too much flour.",
        "Gather the mash into a mound, make a well, and crack the egg into it. Add the teaspoon of salt and a pinch of nutmeg.",
        "Scatter the 300 g of flour on top and bring it together with gentle folding motions — just until you have a soft, uniform dough that doesn't stick. Don't knead it like bread! Kneading = rubber gnocchi.",
        "Divide the dough into 6 pieces. On a floured surface, roll each piece into a 2 cm thick rope.",
        "Cut each rope into 2 cm pillows with a knife. Want the classic ridges? Roll each pillow lightly over the tines of a fork.",
        "Boil a big pot of water with a tablespoon of salt. Set a pan with the 80 g of butter and the sage leaves next to it — everything happens fast at the end.",
        "Cook the gnocchi in two batches: drop in half at a time and wait for them to float. From the moment they float — 30 more seconds, then lift them with a slotted spoon straight into the pan.",
        "While they cook: melt the butter with the sage over medium heat until it stops foaming and smells nutty (2–3 minutes). Not dark brown — deep gold.",
        "Toss the gnocchi in the butter for half a minute with 2 tbsp of the cooking water, until a glossy sauce forms. Serve immediately with plenty of parmesan.",
      ],
    },
  },
  {
    id: "ej-shokolad",
    ejemplo: true,
    categoria: "sweet",
    dificultad: "easy",
    tiempo: 60,
    porciones: 12,
    imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=70",
    videoQuery: "מתכון עוגת שוקולד קלה",
    fuente: { nombre: "Hershey's", url: "https://www.hersheyland.com/recipes/hersheys-perfectly-chocolate-chocolate-cake.html" },
    he: {
      nombre: "עוגת השוקולד „המושלמת” של הרשי",
      descripcion: "המתכון שמודפס על קופסת הקקאו של הרשי כבר עשרות שנים — מעוגות השוקולד הכי מוכנות בעולם. בקערה אחת, בלי מיקסר חובה, עם הסוד של כוס המים הרותחים.",
      ingredientes: [
        "2 כוסות סוכר (400 גרם)",
        "כוס ושלושה רבעים קמח (220 גרם)",
        "3/4 כוס אבקת קקאו (65 גרם)",
        "כפית וחצי אבקת אפייה",
        "כפית וחצי סודה לשתייה",
        "כפית מלח",
        "2 ביצים",
        "כוס חלב (240 מ\"ל)",
        "חצי כוס שמן (120 מ\"ל)",
        "2 כפיות תמצית וניל",
        "כוס מים רותחים (240 מ\"ל)",
        "לציפוי: 115 גרם חמאה, 2/3 כוס קקאו, 3 כוסות אבקת סוכר, 1/3 כוס חלב, כפית וניל",
      ],
      pasos: [
        "מחממים תנור ל־175 מעלות. משמנים ומקמחים 2 תבניות עגולות של 23 ס\"מ (או תבנית מלבנית אחת של 23×33).",
        "בקערה גדולה מערבבים את כל היבשים: 2 כוסות סוכר, כוס ושלושה רבעים קמח, 3/4 כוס קקאו, כפית וחצי אבקת אפייה, כפית וחצי סודה לשתייה וכפית מלח.",
        "מוסיפים את 2 הביצים, כוס החלב, חצי כוס השמן ו־2 כפיות הווניל.",
        "מערבבים 2 דקות — במיקסר על מהירות בינונית, או במרץ עם מטרפה ידנית.",
        "מרתיחים כוס מים ומערבבים אותה פנימה. הבלילה תיראה נוזלית מדי — זה בדיוק ככה אמור להיות, זה מה שעושה אותה לחה.",
        "מחלקים את הבלילה בין התבניות ואופים 30–35 דקות, עד שקיסם שננעץ במרכז יוצא נקי.",
        "מצננים 10 דקות בתבניות, ואז מחלצים בעדינות לרשת עד צינון מלא. עוגה חמה + ציפוי = ציפוי שנוזל.",
        "הציפוי של הרשי: ממיסים 115 גרם חמאה בסיר קטן ומערבבים פנימה 2/3 כוס קקאו עד שחלק.",
        "מוסיפים לסירוגין את 3 כוסות אבקת הסוכר ואת 1/3 כוס החלב — קצת מזה, קצת מזה — תוך ערבוב, עד שמתקבל קרם חלק שנוח למריחה. מוסיפים כפית וניל.",
        "אם הקרם סמיך מדי מוסיפים עוד טיפת חלב; דליל מדי — עוד קצת אבקת סוכר.",
        "מניחים עוגה אחת על צלחת הגשה, מורחים שכבת ציפוי, מניחים את השנייה מעל ומצפים את כל העוגה. וזהו — העוגה מהקופסה, בבית.",
      ],
    },
    en: {
      nombre: "Hershey's \"Perfectly Chocolate\" cake",
      descripcion: "The recipe printed on the Hershey's cocoa box for decades — one of the best-known chocolate cakes in the world. One bowl, no mixer required, with the boiling-water secret.",
      ingredientes: [
        "2 cups sugar (400 g)",
        "1 3/4 cups flour (220 g)",
        "3/4 cup cocoa powder (65 g)",
        "1 1/2 tsp baking powder",
        "1 1/2 tsp baking soda",
        "1 tsp salt",
        "2 eggs",
        "1 cup milk (240 ml)",
        "1/2 cup vegetable oil (120 ml)",
        "2 tsp vanilla extract",
        "1 cup boiling water (240 ml)",
        "Frosting: 115 g butter, 2/3 cup cocoa, 3 cups powdered sugar, 1/3 cup milk, 1 tsp vanilla",
      ],
      pasos: [
        "Heat the oven to 175 °C (350 °F). Grease and flour two 23 cm round pans (or one 23×33 cm rectangular pan).",
        "In a large bowl, stir together all the dry ingredients: 2 cups sugar, 1 3/4 cups flour, 3/4 cup cocoa, 1 1/2 tsp baking powder, 1 1/2 tsp baking soda and 1 tsp salt.",
        "Add the 2 eggs, the cup of milk, the 1/2 cup of oil and the 2 tsp of vanilla.",
        "Beat for 2 minutes — with a mixer on medium speed, or vigorously with a hand whisk.",
        "Boil a cup of water and stir it in. The batter will look way too thin — that's exactly right; it's what makes the cake moist.",
        "Divide the batter between the pans and bake 30–35 minutes, until a toothpick in the center comes out clean.",
        "Cool 10 minutes in the pans, then gently turn out onto racks until fully cool. Warm cake + frosting = frosting that slides off.",
        "Hershey's frosting: melt the 115 g of butter in a small pot and stir in the 2/3 cup of cocoa until smooth.",
        "Alternately add the 3 cups of powdered sugar and the 1/3 cup of milk — a bit of one, a bit of the other — beating until you get a smooth, spreadable cream. Add the teaspoon of vanilla.",
        "Too thick? Add a splash more milk. Too thin? A little more powdered sugar.",
        "Set one cake on a serving plate, spread a layer of frosting, place the second on top and frost the whole cake. That's it — the back-of-the-box cake, at home.",
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

// Video: si la receta trae un link propio, se usa ese. Si no,
// búsqueda de YouTube en hebreo (si no hay videos en hebreo,
// YouTube muestra lo que exista).
export function linkVideo(r, lang = getLang()) {
  if (r.video) return r.video;
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
