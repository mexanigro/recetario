// ============================================================
// ספר המתכונים — i18n
// עברית (ברירת מחדל, RTL) + אנגלית. התרגום נכתב ידנית ולא
// מילולית: כל שפה מנוסחת כמו שמדברים בה.
// ============================================================

export const TEXTOS = {
  he: {
    // כללי
    title_index: "ספר המתכונים — האוכל של הבית, כתוב",
    title_add: "הוספת מתכון — ספר המתכונים",
    title_recipe: "מתכון — ספר המתכונים",
    brand: "ספר המתכונים",
    nav_recipes: "מתכונים",
    nav_inspiration: "השראה",
    nav_add: "+ הוספת מתכון",
    back_home: "→ חזרה לספר המתכונים",
    footer_tag: "ספר המתכונים — נעשה בבית, עם רעב.",
    footer_add: "הוסיפו מתכון",
    toggle: "English",
    min: "דק׳",
    servings_short: "מנות",
    example: "דוגמה",

    // דף הבית
    hero_title_html: "האוכל של הבית, <em>כתוב.</em>",
    hero_sub: "המתכונים שאתם תמיד מחפשים בצ׳אט עם אמא, בצילומי מסך או בפתקים במגירה — כאן, עם תמונה, מצרכים והוראות.",
    hero_note: "כמו שסבתא הייתה מכינה",
    hero_img_alt: "מצרכים טריים על שולחן מטבח",
    cta_first: "להוסיף מתכון ראשון",
    cta_view: "לעיין בספר",
    sec_recipes: "ספר המתכונים",
    sec_inspiration: "מקורות השראה",
    filter_all: "הכל",
    loading_pantry: "מחטטים במזווה…",
    empty_html: "עוד אין מתכונים בקטגוריה הזו.<br><a href=\"agregar.html\">הוסיפו את הראשון</a> וחנכו אותה.",
    counter: (n) => (n === 1 ? "מתכון אחד" : `${n} מתכונים`),

    insp: [
      { name: "וואלה! אוכל", desc: "מתכונים, טרנדים וכתבות — אחד מהמגזינים הגדולים בארץ." },
      { name: "מאקו אוכל", desc: "המתכונים של השפים מהטלוויזיה, כולל מאסטר שף." },
      { name: "ynet אוכל", desc: "מתכונים יומיומיים ועונתיים לצד ביקורות ומדריכים." },
      { name: "בצק אלים", desc: "בלוג האפייה האהוב בישראל — מתוקים בלי פשרות." },
      { name: "עוגיו.נט", desc: "האפייה של נטלי לוין: מדויקת, מצולמת ומוסברת שלב־שלב." },
      { name: "סרטוני בישול ביוטיוב", desc: "חיפוש מוכן של מתכונים מצולמים בעברית — לראות איך עושים את זה." },
    ],

    // טופס הוספה
    add_title: "כותבים מתכון חדש",
    add_sub: "תכתבו אותו כמו שהייתם מסבירים למישהו מהמשפחה. מצד שמאל רואים איך זה ייראה בספר.",
    lbl_name: "שם המתכון",
    ph_name: "שניצל אפוי עם פירה",
    err_name: "תנו למתכון שם.",
    lbl_cat: "קטגוריה",
    lbl_time: "זמן (בדקות)",
    lbl_servings: "מנות",
    lbl_diff: "דרגת קושי",
    lbl_img: "תמונה של המנה",
    optional: "(קישור לתמונה, לא חובה)",
    help_img_html: "אפשר למצוא תמונה ב־<a href=\"https://unsplash.com/s/photos/food\" target=\"_blank\" rel=\"noopener\">Unsplash</a>, לפתוח אותה ולהעתיק את הקישור. אם משאירים ריק — נשים תמונת מטבח.",
    lbl_desc: "תיאור קצר",
    optional_short: "(לא חובה)",
    ph_desc: "הקלאסיקה של ארוחת שישי",
    lbl_ing: "מצרכים",
    per_line: "(אחד בכל שורה)",
    ph_ing: "4 חזות עוף פרוסים\nפירורי לחם\n2 ביצים\nקמח ותבלינים",
    err_ing: "רשמו לפחות מצרך אחד.",
    lbl_steps: "הוראות הכנה",
    ph_steps: "טובלים את העוף בקמח, בביצה ובפירורי הלחם.\nמסדרים בתבנית עם מעט שמן.\nאופים בתנור חם עד שמזהיב משני הצדדים.",
    err_steps: "ספרו לפחות שלב אחד.",
    submit: "לשמור בספר המתכונים",
    saving: "שומרים…",
    save_error: "לא הצלחנו לשמור את המתכון. בדקו את החיבור ונסו שוב.",
    preview_title: "ככה זה ייראה",
    preview_name: "המתכון שלכם",
    success_title: "נכנס לספר!",
    success_sub: (nombre) => `„${nombre}" נשמר בספר המתכונים.`,
    success_view: "לעיין בספר",
    success_again: "להוסיף עוד מתכון",

    // דף מתכון
    loading_recipe: "מחפשים את המתכון…",
    notfound_html: "לא מצאנו את המתכון הזה. <a href=\"index.html\">חזרה לספר</a>.",
    dt_time: "זמן",
    dt_servings: "מנות",
    dt_diff: "דרגת קושי",
    ingredients: "מצרכים",
    steps: "אופן ההכנה",
    tick_note: "סמנו כל מצרך אחרי שהשתמשתם בו.",
    video_btn: "▶ לצפות איך מכינים (יוטיוב)",
    video_note: "",

    cats: { pasta: "פסטה", stew: "תבשילים", meat: "בשרים", salad: "סלטים", sweet: "מתוקים", baked: "מאפים", other: "עוד" },
    diffs: { easy: "קל", medium: "בינוני", hard: "מאתגר" },
  },

  en: {
    title_index: "The Recipe Book — home cooking, written down",
    title_add: "Add a recipe — The Recipe Book",
    title_recipe: "Recipe — The Recipe Book",
    brand: "The Recipe Book",
    nav_recipes: "Recipes",
    nav_inspiration: "Inspiration",
    nav_add: "+ Add a recipe",
    back_home: "← Back to the book",
    footer_tag: "The Recipe Book — made at home, hungry.",
    footer_add: "Add a recipe",
    toggle: "עברית",
    min: "min",
    servings_short: "servings",
    example: "Sample",

    hero_title_html: "Home cooking, <em>written down.</em>",
    hero_sub: "The recipes you keep digging up from your mom's chat, screenshots and notes in a drawer — here, with a photo, ingredients and steps.",
    hero_note: "just like grandma made it",
    hero_img_alt: "Fresh ingredients on a kitchen table",
    cta_first: "Add my first recipe",
    cta_view: "Browse the book",
    sec_recipes: "The recipe book",
    sec_inspiration: "Places to get inspired",
    filter_all: "All",
    loading_pantry: "Rummaging through the pantry…",
    empty_html: "No recipes in this category yet.<br><a href=\"agregar.html\">Add the first one</a> and break it in.",
    counter: (n) => (n === 1 ? "1 recipe" : `${n} recipes`),

    insp: [
      { name: "Walla! Food", desc: "Recipes, trends and features from one of Israel's biggest food magazines (Hebrew)." },
      { name: "Mako Food", desc: "Recipes from Israel's TV chefs, including MasterChef (Hebrew)." },
      { name: "Ynet Food", desc: "Everyday and seasonal recipes, reviews and guides (Hebrew)." },
      { name: "Bazek Alim", desc: "Israel's best-loved baking blog — desserts with no compromises (Hebrew)." },
      { name: "Oogio.net", desc: "Natalie Levin's baking: precise, beautifully shot, step by step (Hebrew)." },
      { name: "Cooking videos on YouTube", desc: "A ready-made search for recipe videos in Hebrew — watch how it's done." },
    ],

    add_title: "Write down a new recipe",
    add_sub: "Write it the way you'd explain it to family. On the side you can see how it will look in the book.",
    lbl_name: "Recipe name",
    ph_name: "Oven-baked schnitzel with mash",
    err_name: "Give the recipe a name.",
    lbl_cat: "Category",
    lbl_time: "Time (minutes)",
    lbl_servings: "Servings",
    lbl_diff: "Difficulty",
    lbl_img: "Photo of the dish",
    optional: "(link to an image, optional)",
    help_img_html: "You can find a photo on <a href=\"https://unsplash.com/s/photos/food\" target=\"_blank\" rel=\"noopener\">Unsplash</a>, open it and copy the link. Leave it empty and we'll use a kitchen photo.",
    lbl_desc: "Short description",
    optional_short: "(optional)",
    ph_desc: "The Friday-dinner classic",
    lbl_ing: "Ingredients",
    per_line: "(one per line)",
    ph_ing: "4 chicken breasts, sliced\nBreadcrumbs\n2 eggs\nFlour and spices",
    err_ing: "List at least one ingredient.",
    lbl_steps: "Steps",
    ph_steps: "Dip the chicken in flour, egg and breadcrumbs.\nArrange on a tray with a little oil.\nBake in a hot oven until golden on both sides.",
    err_steps: "Describe at least one step.",
    submit: "Save to the book",
    saving: "Saving…",
    save_error: "We couldn't save the recipe. Check your connection and try again.",
    preview_title: "How it will look",
    preview_name: "Your recipe",
    success_title: "It's in the book!",
    success_sub: (nombre) => `"${nombre}" was saved to the recipe book.`,
    success_view: "Browse the book",
    success_again: "Add another recipe",

    loading_recipe: "Looking for the recipe…",
    notfound_html: "We couldn't find that recipe. <a href=\"index.html\">Back to the book</a>.",
    dt_time: "Time",
    dt_servings: "Servings",
    dt_diff: "Difficulty",
    ingredients: "Ingredients",
    steps: "Method",
    tick_note: "Tick each ingredient as you use it.",
    video_btn: "▶ Watch how it's made (YouTube, Hebrew)",
    video_note: "",

    cats: { pasta: "Pasta", stew: "Stews", meat: "Meat", salad: "Salads", sweet: "Sweets", baked: "Baking", other: "More" },
    diffs: { easy: "Easy", medium: "Medium", hard: "Challenging" },
  },
};

export function getLang() {
  const l = localStorage.getItem("recetario-lang");
  return l === "en" ? "en" : "he";
}

export function setLang(l) {
  localStorage.setItem("recetario-lang", l);
}

export function t(clave, ...args) {
  const valor = TEXTOS[getLang()][clave];
  return typeof valor === "function" ? valor(...args) : valor;
}

// מחיל שפה + כיוון על הדף ומעדכן את כל הטקסטים הסטטיים.
export function aplicarIdioma() {
  const lang = getLang();
  const d = TEXTOS[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "he" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = d[el.dataset.i18n];
    if (typeof v === "string") el.textContent = v;
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const v = d[el.dataset.i18nHtml];
    if (typeof v === "string") el.innerHTML = v;
  });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    const v = d[el.dataset.i18nPh];
    if (typeof v === "string") el.placeholder = v;
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    const v = d[el.dataset.i18nAlt];
    if (typeof v === "string") el.alt = v;
  });

  const toggle = document.getElementById("lang-toggle");
  if (toggle) toggle.textContent = d.toggle;
}

// כפתור החלפת שפה — כל דף קורא לזה פעם אחת.
export function conectarToggle(alCambiar) {
  const toggle = document.getElementById("lang-toggle");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    setLang(getLang() === "he" ? "en" : "he");
    aplicarIdioma();
    alCambiar?.(getLang());
  });
}
