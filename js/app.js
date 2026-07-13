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
    he: {
      nombre: "שקשוקה אדומה קלאסית",
      descripcion: "מנת הפתיחה המושלמת למי שלומד לבשל: מחבת אחת, מצרכים פשוטים, ותוצאה שתמיד מרשימה.",
      ingredientes: [
        "6 עגבניות בשלות מגוררות (או קופסת עגבניות מרוסקות 400 גרם)",
        "פלפל אדום אחד",
        "בצל אחד",
        "3 שיני שום",
        "5 ביצים",
        "כפית פפריקה מתוקה",
        "חצי כפית כמון",
        "3 כפות שמן זית",
        "כפית שטוחה מלח, פלפל שחור",
        "חופן פטרוזיליה קצוצה ולחם טרי, להגשה",
      ],
      pasos: [
        "קוצצים את הבצל לקוביות קטנות ואת הפלפל האדום לקוביות של כ־1 ס\"מ. קוצצים דק את השום ושומרים אותו בנפרד (הוא נכנס אחר כך).",
        "אם משתמשים בעגבניות טריות: חוצים ומגררים אותן על פומפייה גסה מעל קערה, עד שנשארת רק הקליפה ביד.",
        "מחממים 3 כפות שמן זית במחבת רחבה על אש בינונית, חצי דקה.",
        "מוסיפים את הבצל והפלפל ומטגנים 6–7 דקות תוך ערבוב מדי פעם, עד שהבצל שקוף והפלפל רך.",
        "מוסיפים את השום, כפית הפפריקה וחצי כפית הכמון, ומערבבים 30 שניות בלבד — תבלינים נשרפים מהר.",
        "שופכים את העגבניות, מוסיפים כפית שטוחה מלח ופלפל שחור, ומערבבים.",
        "מבשלים 12–15 דקות על אש בינונית־נמוכה בלי מכסה, עד שהרוטב מסמיך ולא נשארים שלוליות של נוזל. בודקים: מעבירים כף באמצע — אם נשאר שביל, הרוטב מוכן.",
        "טועמים את הרוטב ומתקנים תיבול. זה הרגע — אחרי הביצים כבר קשה לערבב.",
        "יוצרים 5 גומות ברוטב עם גב של כף, ושוברים ביצה לתוך כל גומה. הכי בטוח: לשבור כל ביצה קודם לכוס קטנה, ולשפוך ממנה.",
        "מכסים את המחבת ומבשלים 5–7 דקות על אש נמוכה, עד שהחלבון לבן ויציב אבל החלמון עדיין רוטט. מפזרים פטרוזיליה ומגישים ישר מהמחבת עם לחם טרי.",
      ],
    },
    en: {
      nombre: "Classic red shakshuka",
      descripcion: "The perfect first dish when you're learning to cook: one pan, simple ingredients, and a result that always impresses.",
      ingredientes: [
        "6 ripe tomatoes, grated (or a 400 g can of crushed tomatoes)",
        "1 red bell pepper",
        "1 onion",
        "3 garlic cloves",
        "5 eggs",
        "1 tsp sweet paprika",
        "1/2 tsp cumin",
        "3 tbsp olive oil",
        "1 level tsp salt, black pepper",
        "Handful of chopped parsley and fresh bread, to serve",
      ],
      pasos: [
        "Dice the onion small and cut the red pepper into ~1 cm pieces. Mince the garlic and keep it separate (it goes in later).",
        "If using fresh tomatoes: halve them and grate on the coarse side of a box grater over a bowl, until only the skin is left in your hand.",
        "Heat 3 tbsp olive oil in a wide pan over medium heat for half a minute.",
        "Add the onion and pepper and cook 6–7 minutes, stirring now and then, until the onion is translucent and the pepper is soft.",
        "Add the garlic, the teaspoon of paprika and the 1/2 tsp of cumin, and stir for just 30 seconds — spices burn fast.",
        "Pour in the tomatoes, add a level teaspoon of salt and some black pepper, and stir.",
        "Simmer 12–15 minutes over medium-low heat, uncovered, until the sauce thickens and no puddles of liquid remain. Test: drag a spoon through the middle — if it leaves a trail, the sauce is ready.",
        "Taste the sauce and adjust the seasoning. This is the moment — once the eggs are in, stirring is over.",
        "Make 5 wells in the sauce with the back of a spoon and crack an egg into each. Safest way: crack each egg into a small cup first, then slide it in.",
        "Cover the pan and cook 5–7 minutes on low, until the whites are set but the yolks still wobble. Scatter with parsley and serve straight from the pan with fresh bread.",
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
      nombre: "סלט ירוק עם ויניגרט ראשון",
      descripcion: "המתכון הכי פשוט כאן — ובו לומדים את הטכניקה הכי שימושית במטבח: ויניגרט ביתי בקערה אחת.",
      ingredientes: [
        "חבילת מיקס עלים ירוקים (כ־150 גרם)",
        "אבוקדו בשל אחד",
        "10 עגבניות שרי",
        "חצי מלפפון",
        "2 כפות גרעיני חמנייה",
        "מיץ מחצי לימון (בערך 2 כפות)",
        "כפית חרדל",
        "3 כפות שמן זית",
        "רבע כפית מלח, פלפל שחור",
      ],
      pasos: [
        "שוטפים את העלים במים קרים ומייבשים היטב — במגבת נקייה או במסננת. עלים רטובים דוחים את הרוטב, זה ההבדל בין סלט טוב לרטוב.",
        "חוצים את עגבניות השרי. פורסים את חצי המלפפון למדליונים דקים.",
        "חוצים את האבוקדו לאורכו, מסובבים לפתיחה, מוציאים את הגלעין בזהירות וחותכים את הבשר לקוביות ישר בתוך הקליפה — ואז מרוקנים עם כף.",
        "קולים את 2 כפות הגרעינים במחבת יבשה (בלי שמן) על אש בינונית 2–3 דקות, תוך ניעור, עד שהם מזהיבים ומריחים. לא עוזבים אותם — הם נשרפים בשנייה.",
        "עכשיו הוויניגרט, בתחתית קערת ההגשה: סוחטים 2 כפות מיץ לימון, מוסיפים כפית חרדל, רבע כפית מלח ופלפל שחור, וטורפים במזלג.",
        "מוסיפים את 3 כפות שמן הזית לאט, תוך טריפה מתמדת, עד שהרוטב נהיה אחיד וסמיך מעט. זה נקרא אמולסיה — והרגע הזה עובד בכל רוטב שתכינו בחיים.",
        "מניחים את העלים על הרוטב, ומעל את השרי, המלפפון והאבוקדו. לא מערבבים עדיין!",
        "רגע לפני ההגשה בלבד: מערבבים בעדינות עם שתי כפות מלמטה למעלה, ומפזרים את הגרעינים הקלויים. עלים שמחכים ברוטב — נובלים.",
      ],
    },
    en: {
      nombre: "Green salad with your first vinaigrette",
      descripcion: "The simplest recipe here — and the one that teaches the most useful kitchen technique: a homemade vinaigrette in one bowl.",
      ingredientes: [
        "1 bag mixed salad greens (about 150 g)",
        "1 ripe avocado",
        "10 cherry tomatoes",
        "1/2 cucumber",
        "2 tbsp sunflower seeds",
        "Juice of half a lemon (about 2 tbsp)",
        "1 tsp mustard",
        "3 tbsp olive oil",
        "1/4 tsp salt, black pepper",
      ],
      pasos: [
        "Wash the greens in cold water and dry them really well — in a clean towel or colander. Wet leaves repel dressing; it's the difference between a good salad and a soggy one.",
        "Halve the cherry tomatoes. Slice the half cucumber into thin rounds.",
        "Halve the avocado lengthwise, twist it open, carefully remove the pit and cube the flesh right inside the skin — then scoop it out with a spoon.",
        "Toast the 2 tbsp of seeds in a dry pan (no oil) over medium heat for 2–3 minutes, shaking, until golden and fragrant. Don't walk away — they burn in a second.",
        "Now the vinaigrette, in the bottom of your serving bowl: squeeze in 2 tbsp lemon juice, add the teaspoon of mustard, 1/4 tsp salt and black pepper, and whisk with a fork.",
        "Add the 3 tbsp of olive oil slowly, whisking the whole time, until the dressing turns uniform and slightly thick. That's an emulsion — and this exact move works in every dressing you'll ever make.",
        "Lay the greens on top of the dressing, then the tomatoes, cucumber and avocado. Don't toss yet!",
        "Only right before serving: toss gently with two spoons from the bottom up, and scatter the toasted seeds on top. Leaves that sit in dressing wilt.",
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
    he: {
      nombre: "פנקייקים אווריריים ראשונים",
      descripcion: "מתכון הפנקייקים שמלמד את שני הכללים הגדולים של בלילות: לא לערבב יותר מדי, ולתת לבלילה לנוח.",
      ingredientes: [
        "2 כוסות קמח תופח (280 גרם)",
        "2 כפות סוכר",
        "רבע כפית מלח",
        "2 ביצים",
        "כוס ושלושה רבעים חלב (420 מ\"ל)",
        "40 גרם חמאה מומסת (וקצת נוספת לטיגון)",
        "כפית תמצית וניל",
        "דבש או מייפל ופירות, להגשה",
      ],
      pasos: [
        "ממיסים 40 גרם חמאה במיקרו (20–30 שניות) או במחבת, ונותנים לה להתקרר 2 דקות — חמאה רותחת מבשלת את הביצים.",
        "בקערה גדולה מערבבים את היבשים: 2 כוסות קמח, 2 כפות סוכר ורבע כפית מלח.",
        "בקערה שנייה שוברים 2 ביצים, מוסיפים את החלב, החמאה המומסת והווניל, וטורפים חצי דקה עד שהכול אחיד.",
        "יוצרים גומה במרכז היבשים, שופכים לתוכה את הנוזלים, ומערבבים בעדינות רק עד שלא רואים קמח יבש — בערך 10 סיבובי כף. גושים קטנים זה מצוין! ערבוב יתר = פנקייקים קשים.",
        "נותנים לבלילה לנוח 10 דקות בלי לגעת. בזמן הזה הקמח סופג נוזלים והבלילה מתעבה — זה סוד הגובה.",
        "מחממים מחבת רחבה על אש בינונית־נמוכה 2 דקות, ומשמנים בשכבה דקה של חמאה (מנגבים עודף עם נייר).",
        "יוצקים רבע כוס בלילה לכל פנקייק. לא מזיזים אותו אחרי היציקה.",
        "מחכים 2–3 דקות, עד שמופיעות בועות על כל פני השטח והשוליים נראים יבשים — זה הסימן היחיד שצריך. הופכים בתנועה אחת בטוחה.",
        "עוד דקה־שתיים מהצד השני, עד שהוא זהוב. הפנקייק הראשון תמיד יוצא מוזר — זה חוק טבע, טועמים אותו ומתקדמים.",
        "עורמים מגדל, מוזגים דבש או מייפל, ומוסיפים פירות. מגישים מיד — פנקייקים לא אוהבים לחכות.",
      ],
    },
    en: {
      nombre: "Your first fluffy pancakes",
      descripcion: "The pancake recipe that teaches the two big rules of batters: don't overmix, and let it rest.",
      ingredientes: [
        "2 cups self-raising flour (280 g)",
        "2 tbsp sugar",
        "1/4 tsp salt",
        "2 eggs",
        "1 3/4 cups milk (420 ml)",
        "40 g melted butter (plus a little extra for the pan)",
        "1 tsp vanilla extract",
        "Honey or maple syrup and fruit, to serve",
      ],
      pasos: [
        "Melt the 40 g of butter in the microwave (20–30 seconds) or in a pan, and let it cool for 2 minutes — boiling butter scrambles the eggs.",
        "In a large bowl, mix the dry ingredients: 2 cups flour, 2 tbsp sugar and 1/4 tsp salt.",
        "In a second bowl, crack the 2 eggs, add the milk, melted butter and vanilla, and whisk for half a minute until uniform.",
        "Make a well in the middle of the dry mix, pour in the wet, and stir gently just until no dry flour is visible — about 10 turns of the spoon. Small lumps are great! Overmixing = tough pancakes.",
        "Let the batter rest for 10 minutes without touching it. The flour absorbs liquid and the batter thickens — that's the secret to tall pancakes.",
        "Heat a wide pan over medium-low heat for 2 minutes, and grease with a thin layer of butter (wipe off the excess with paper towel).",
        "Pour 1/4 cup of batter per pancake. Don't move it once it's poured.",
        "Wait 2–3 minutes, until bubbles cover the surface and the edges look dry — that's the only signal you need. Flip in one confident motion.",
        "One or two more minutes on the other side, until golden. The first pancake always comes out weird — it's a law of nature; taste it and move on.",
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
    videoQuery: "מתכון מרק עדשים",
    he: {
      nombre: "תבשיל עדשים לסיר אחד",
      descripcion: "שיעור בבישול איטי: איך בונים טעם שכבה אחרי שכבה, בסיר אחד, עם מצרכים של סופר שכונתי.",
      ingredientes: [
        "2 כוסות עדשים ירוקות או חומות (400 גרם)",
        "בצל אחד",
        "2 גזרים",
        "2 תפוחי אדמה",
        "פלפל אדום אחד",
        "3 שיני שום",
        "קופסת עגבניות מרוסקות (400 גרם)",
        "כפית פפריקה מתוקה, עלה דפנה",
        "3 כפות שמן זית",
        "כפית מלח, פלפל שחור",
        "6 כוסות מים חמים",
      ],
      pasos: [
        "שוטפים את העדשים במסננת תחת מים זורמים, ובודקים שאין אבנים קטנות (קורה!). אין צורך בהשריה לעדשים ירוקות או חומות.",
        "קוצצים את הבצל לקוביות קטנות. מקלפים את הגזרים ופורסים למדליונים. קוצצים את הפלפל לקוביות. מקלפים את תפוחי האדמה וחותכים לקוביות של 2 ס\"מ — שומרים אותם בקערת מים שלא ישחירו.",
        "מחממים 3 כפות שמן זית בסיר גדול על אש בינונית.",
        "מוסיפים את הבצל ומטגנים 5 דקות עד שהוא שקוף. מוסיפים את הגזר והפלפל ומטגנים עוד 5 דקות. זו השכבה הראשונה של הטעם — לא לקצר אותה.",
        "קוצצים את השום, מוסיפים אותו עם כפית הפפריקה, ומערבבים חצי דקה.",
        "מוסיפים את העגבניות המרוסקות ומבשלים 3–4 דקות עד שהן מסמיכות מעט.",
        "מוסיפים את העדשים השטופות, עלה הדפנה ו־6 כוסות מים חמים. מביאים לרתיחה, מנמיכים לאש נמוכה ומכסים חלקית.",
        "מבשלים 25 דקות ואז מוסיפים את קוביות תפוחי האדמה ואת כפית המלח. (מלח בסוף — מלח בהתחלה מקשה את העדשים.)",
        "ממשיכים לבשל 20–25 דקות, עד שהעדשים רכות לגמרי ותפוחי האדמה נמעכים בלחיצת מזלג. אם התבשיל סמיך מדי — מוסיפים קצת מים חמים.",
        "מוציאים את עלה הדפנה, טועמים, מתקנים מלח ופלפל, ומגישים חם. במקרר הוא רק משתפר — יום אחרי זה השיא שלו.",
      ],
    },
    en: {
      nombre: "One-pot lentil stew",
      descripcion: "A lesson in slow cooking: how to build flavor layer by layer, in one pot, with corner-store ingredients.",
      ingredientes: [
        "2 cups green or brown lentils (400 g)",
        "1 onion",
        "2 carrots",
        "2 potatoes",
        "1 red bell pepper",
        "3 garlic cloves",
        "1 can crushed tomatoes (400 g)",
        "1 tsp sweet paprika, 1 bay leaf",
        "3 tbsp olive oil",
        "1 tsp salt, black pepper",
        "6 cups hot water",
      ],
      pasos: [
        "Rinse the lentils in a colander under running water and check for small stones (it happens!). Green and brown lentils need no soaking.",
        "Dice the onion small. Peel the carrots and slice into rounds. Dice the pepper. Peel the potatoes and cut into 2 cm cubes — keep them in a bowl of water so they don't darken.",
        "Heat 3 tbsp olive oil in a big pot over medium heat.",
        "Add the onion and cook 5 minutes until translucent. Add the carrot and pepper and cook 5 more minutes. This is the first layer of flavor — don't rush it.",
        "Mince the garlic, add it with the teaspoon of paprika, and stir for half a minute.",
        "Add the crushed tomatoes and cook 3–4 minutes until they thicken slightly.",
        "Add the rinsed lentils, the bay leaf and 6 cups of hot water. Bring to a boil, lower the heat and partially cover.",
        "Cook 25 minutes, then add the potato cubes and the teaspoon of salt. (Salt at the end — salting early keeps lentils hard.)",
        "Keep cooking 20–25 minutes, until the lentils are fully soft and the potatoes mash under a fork. Too thick? Add a splash of hot water.",
        "Fish out the bay leaf, taste, adjust salt and pepper, and serve hot. It only improves in the fridge — day two is its peak.",
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
    he: {
      nombre: "ניוקי תפוחי אדמה מאפס",
      descripcion: "הפרויקט הראשון שמרגיש כמו בישול אמיתי: בצק מתפוחי אדמה, בשלושה מצרכים, עם כל הטריקים כתובים.",
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
      descripcion: "The first project that feels like real cooking: a three-ingredient potato dough, with every trick written down.",
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
    dificultad: "medium",
    tiempo: 80,
    porciones: 8,
    imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=70",
    videoQuery: "מתכון עוגת שוקולד עסיסית",
    he: {
      nombre: "עוגת שוקולד עסיסית עם גנאש",
      descripcion: "עוגה שמלמדת שלוש טכניקות בסיס: המסה על בן־מארי, הקצפה נכונה, וגנאש משני מצרכים.",
      ingredientes: [
        "200 גרם שוקולד מריר (לעוגה)",
        "150 גרם חמאה",
        "4 ביצים בטמפרטורת החדר",
        "200 גרם סוכר (כוס)",
        "120 גרם קמח (כוס פחות 2 כפות)",
        "כפית אבקת אפייה",
        "קורט מלח",
        "200 מ\"ל שמנת מתוקה (לגנאש)",
        "150 גרם שוקולד מריר קצוץ (לגנאש)",
        "חמאה וקמח לתבנית",
      ],
      pasos: [
        "מחממים תנור ל־170 מעלות. משמנים תבנית עגולה של 24 ס\"מ בחמאה, מפזרים כף קמח, מסובבים שיצפה הכול והופכים לנער עודפים.",
        "בן־מארי למתחילים: ממלאים סיר קטן ברבע מים ומביאים לרתיחה עדינה. מניחים מעליו קערה חסינת חום — שהתחתית שלה לא נוגעת במים.",
        "שוברים לקערה את 200 גרם השוקולד עם 150 גרם החמאה, וממיסים תוך ערבוב איטי 3–4 דקות עד שהכול חלק. מורידים ונותנים להתקרר 5 דקות.",
        "בקערה גדולה שוברים 4 ביצים ומוסיפים את כוס הסוכר. מקציפים במיקסר ידני במהירות גבוהה 4–5 דקות — עד שהתערובת בהירה, תופחת פי שניים, וכשמרימים את המקצף נשאר סרט שנעלם לאט. הנפח הזה הוא מה שמחזיק את העוגה.",
        "שופכים את השוקולד הפושר על הביצים בזרם דק, תוך קיפול עדין עם לקקן — מלמטה למעלה, לא לערבב במרץ.",
        "מנפים מעל את 120 גרם הקמח עם כפית אבקת האפייה וקורט המלח, ומקפלים באותה עדינות רק עד שלא רואים קמח.",
        "יוצקים לתבנית ואופים 35–40 דקות. בדיקה: קיסם שננעץ במרכז צריך לצאת עם פירורים לחים — לא רטוב, ולא יבש לגמרי. יבש לגמרי = אפוי מדי.",
        "מצננים 15 דקות בתבנית, ואז מחלצים לרשת עד צינון מלא. עוגה חמה + גנאש = גנאש שנוזל לרצפה.",
        "גנאש: קוצצים 150 גרם שוקולד לקערה. מחממים 200 מ\"ל שמנת בסיר קטן עד ממש לפני רתיחה — בועות קטנות בשוליים, לא רתיחה מלאה.",
        "שופכים את השמנת החמה על השוקולד, מחכים דקה שלמה בלי לגעת, ואז מערבבים מהמרכז החוצה עד שנוצר קרם חלק ומבריק.",
        "נותנים לגנאש 10 דקות להסמיך מעט, יוצקים על מרכז העוגה ומורחים לשוליים בגב של כף. נותנים לו חצי שעה להתייצב — אם מתאפקים.",
      ],
    },
    en: {
      nombre: "Fudgy chocolate cake with ganache",
      descripcion: "A cake that teaches three foundation techniques: melting over a double boiler, whipping properly, and a two-ingredient ganache.",
      ingredientes: [
        "200 g dark chocolate (for the cake)",
        "150 g butter",
        "4 room-temperature eggs",
        "200 g sugar (1 cup)",
        "120 g flour (1 cup minus 2 tbsp)",
        "1 tsp baking powder",
        "Pinch of salt",
        "200 ml heavy cream (for the ganache)",
        "150 g dark chocolate, chopped (for the ganache)",
        "Butter and flour for the tin",
      ],
      pasos: [
        "Heat the oven to 170 °C. Butter a 24 cm round tin, add a spoonful of flour, turn to coat everything and tap out the excess.",
        "Double boiler for beginners: fill a small pot a quarter with water and bring to a gentle simmer. Set a heatproof bowl on top — its bottom must not touch the water.",
        "Break the 200 g of chocolate into the bowl with the 150 g of butter, and melt, stirring slowly, 3–4 minutes until smooth. Remove and let cool 5 minutes.",
        "In a large bowl, crack the 4 eggs and add the cup of sugar. Beat with a hand mixer on high for 4–5 minutes — until pale, doubled in volume, and when you lift the beaters a ribbon sits on the surface before slowly disappearing. That volume is what holds the cake up.",
        "Pour the lukewarm chocolate over the eggs in a thin stream, folding gently with a spatula — bottom to top, no vigorous stirring.",
        "Sift the 120 g of flour with the teaspoon of baking powder and pinch of salt over the top, and fold with the same gentleness just until no flour shows.",
        "Pour into the tin and bake 35–40 minutes. Test: a toothpick in the center should come out with moist crumbs — not wet, not bone dry. Bone dry = overbaked.",
        "Cool 15 minutes in the tin, then turn out onto a rack until fully cool. Warm cake + ganache = ganache on the floor.",
        "Ganache: chop the 150 g of chocolate into a bowl. Heat the 200 ml of cream in a small pot until just before boiling — small bubbles at the edges, not a full boil.",
        "Pour the hot cream over the chocolate, wait one full minute without touching, then stir from the center outward until you have a smooth, glossy cream.",
        "Let the ganache thicken for 10 minutes, pour onto the middle of the cake and spread to the edges with the back of a spoon. Give it half an hour to set — if you can hold out.",
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
