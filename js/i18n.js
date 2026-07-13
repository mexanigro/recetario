// ============================================================
// ספר המתכונים — i18n
// עברית (ברירת מחדל, RTL) + אנגלית. התרגום נכתב ידנית ולא
// מילולית: כל שפה מנוסחת כמו שמדברים בה.
// ============================================================

export const TEXTOS = {
  he: {
    // כללי
    title_index: "פינת המתכונים — לומדים לבשל מהבסיס",
    title_add: "הוספת מתכון — פינת המתכונים",
    title_recipe: "מתכון — פינת המתכונים",
    brand: "פינת המתכונים",
    nav_recipes: "מתכונים",
    nav_inspiration: "השראה",
    nav_add: "+ הוספת מתכון",
    back_home: "→ חזרה למתכונים",
    footer_tag: "פינת המתכונים — לומדים לבשל, צעד אחרי צעד.",
    footer_add: "הוסיפו מתכון",
    toggle: "English",
    min: "דק׳",
    servings_short: "מנות",
    example: "דוגמה",

    // דף הבית
    hero_kicker: "הספוט שלי למתכונים",
    hero_title_html: "מתכון טוב הוא פשוט <em>הרבה צעדים קטנים.</em>",
    hero_sub: "כל מתכון כאן כתוב מהצעד הראשון — כמויות מדויקות, זמנים, ואיך יודעים שמוכן. גם אם אף פעם לא בישלתם, מכאן מתחילים.",
    ticker_step: (i, total, nombre) => `שלב ${i} מתוך ${total} · ${nombre}`,
    cta_first: "להוסיף מתכון ראשון",
    cta_view: "לעיין במתכונים",
    sec_recipes: "המתכונים",
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
    add_sub: "פרטו כל שלב, גם מה שנראה מובן מאליו — כמויות, זמנים, גודל חיתוך. מתכון מפורט מצליח גם בפעם הראשונה.",
    lbl_name: "שם המתכון",
    ph_name: "שניצל אפוי עם פירה",
    err_name: "תנו למתכון שם.",
    lbl_cat: "קטגוריה",
    ph_cat: "בחרו מהרשימה או כתבו משלכם",
    lbl_time: "זמן (בדקות)",
    lbl_servings: "מנות",
    lbl_diff: "דרגת קושי",
    ph_diff: "קל? מאתגר? כתבו איך שבא לכם",
    lbl_img: "תמונה של המנה",
    optional: "(קישור לתמונה, לא חובה)",
    help_img_html: "אפשר למצוא תמונה ב־<a href=\"https://unsplash.com/s/photos/food\" target=\"_blank\" rel=\"noopener\">Unsplash</a>, לפתוח אותה ולהעתיק את הקישור. אם משאירים ריק — נשים תמונת מטבח.",
    lbl_desc: "תיאור קצר",
    optional_short: "(לא חובה)",
    ph_desc: "המנה הראשונה שלמדתי לבשל",
    lbl_ing: "מצרכים",
    ing_hint: "(שורה לכל מצרך, עם הכמות)",
    ph_ing: "3 ביצים",
    err_ing: "רשמו לפחות מצרך אחד.",
    btn_add_ing: "+ עוד מצרך",
    lbl_steps: "הוראות הכנה — צעד־צעד",
    steps_hint: "כל שורה היא צעד קטן אחד. אל תחסכו: גם „שוטפים את הירקות” זה שלב.",
    ph_step: "שוברים 3 ביצים לקערה רחבה ומוסיפים חצי כף מלח",
    err_steps: "ספרו לפחות שלב אחד.",
    btn_add_step: "+ עוד שלב",
    quitar_aria: "הסרת שורה",
    mas_detalles: "עוד פרטים למתכון (לא חובה)",
    lbl_tip: "טיפ אישי",
    ph_tip: "אצלי זה יוצא הכי טוב כש…",
    lbl_video: "קישור לסרטון הכנה",
    help_video: "אם יש סרטון שאתם אוהבים (יוטיוב, טיקטוק…) — הדביקו קישור והוא יופיע במתכון.",
    lbl_fuente: "קישור למקור",
    help_fuente: "אם המתכון מבוסס על אתר או בלוג — תנו קרדיט עם קישור.",
    submit: "לשמור בפינת המתכונים",
    saving: "שומרים…",
    save_error: "לא הצלחנו לשמור את המתכון. בדקו את החיבור ונסו שוב.",
    preview_title: "ככה זה ייראה",
    preview_name: "המתכון שלכם",
    success_title: "נשמר!",
    success_sub: (nombre) => `„${nombre}" נכנס לפינת המתכונים.`,
    success_view: "לעיין במתכונים",
    success_again: "להוסיף עוד מתכון",

    // דף מתכון
    loading_recipe: "מחפשים את המתכון…",
    notfound_html: "לא מצאנו את המתכון הזה. <a href=\"index.html\">חזרה למתכונים</a>.",
    dt_time: "זמן",
    dt_servings: "מנות",
    dt_diff: "דרגת קושי",
    ingredients: "מצרכים",
    steps: "אופן ההכנה",
    tick_note: "סמנו כל מצרך אחרי שהשתמשתם בו.",
    video_btn: "▶ לצפות איך מכינים (יוטיוב)",
    video_btn_custom: "▶ לצפות בסרטון ההכנה",
    source_label: "מבוסס על המתכון של",
    tip_label: "טיפ מהמטבח",
    video_note: "",

    cats: { pasta: "פסטה", stew: "תבשילים", meat: "בשרים", salad: "סלטים", sweet: "מתוקים", baked: "מאפים", other: "עוד" },
    diffs: { easy: "קל", medium: "בינוני", hard: "מאתגר" },
  },

  en: {
    title_index: "My Recipe Spot — learning to cook from scratch",
    title_add: "Add a recipe — My Recipe Spot",
    title_recipe: "Recipe — My Recipe Spot",
    brand: "My Recipe Spot",
    nav_recipes: "Recipes",
    nav_inspiration: "Inspiration",
    nav_add: "+ Add a recipe",
    back_home: "← Back to the recipes",
    footer_tag: "My Recipe Spot — learning to cook, one step at a time.",
    footer_add: "Add a recipe",
    toggle: "עברית",
    min: "min",
    servings_short: "servings",
    example: "Sample",

    hero_kicker: "My recipe spot",
    hero_title_html: "A good recipe is just <em>a lot of small steps.</em>",
    hero_sub: "Every recipe here starts at step one — exact amounts, timings, and how to tell when it's done. Never cooked before? This is where you start.",
    ticker_step: (i, total, nombre) => `Step ${i} of ${total} · ${nombre}`,
    cta_first: "Add my first recipe",
    cta_view: "Browse the recipes",
    sec_recipes: "The recipes",
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
    add_sub: "Spell out every step, even the obvious ones — amounts, timings, how small to chop. A detailed recipe works on the very first try.",
    lbl_name: "Recipe name",
    ph_name: "Oven-baked schnitzel with mash",
    err_name: "Give the recipe a name.",
    lbl_cat: "Category",
    ph_cat: "Pick from the list or write your own",
    lbl_time: "Time (minutes)",
    lbl_servings: "Servings",
    lbl_diff: "Difficulty",
    ph_diff: "Easy? Tricky? Say it your way",
    lbl_img: "Photo of the dish",
    optional: "(link to an image, optional)",
    help_img_html: "You can find a photo on <a href=\"https://unsplash.com/s/photos/food\" target=\"_blank\" rel=\"noopener\">Unsplash</a>, open it and copy the link. Leave it empty and we'll use a kitchen photo.",
    lbl_desc: "Short description",
    optional_short: "(optional)",
    ph_desc: "The first dish I learned to cook",
    lbl_ing: "Ingredients",
    ing_hint: "(one row per ingredient, with the amount)",
    ph_ing: "3 eggs",
    err_ing: "List at least one ingredient.",
    btn_add_ing: "+ Add ingredient",
    lbl_steps: "Steps — one at a time",
    steps_hint: "Each row is one tiny step. Don't hold back: even \"wash the vegetables\" counts.",
    ph_step: "Crack 3 eggs into a wide bowl and add half a tablespoon of salt",
    err_steps: "Describe at least one step.",
    btn_add_step: "+ Add step",
    quitar_aria: "Remove row",
    mas_detalles: "More recipe details (optional)",
    lbl_tip: "Personal tip",
    ph_tip: "It comes out best when…",
    lbl_video: "Link to a how-to video",
    help_video: "Got a video you like (YouTube, TikTok…)? Paste the link and it'll show on the recipe.",
    lbl_fuente: "Source link",
    help_fuente: "If the recipe is based on a website or blog — give credit with a link.",
    submit: "Save to my recipe spot",
    saving: "Saving…",
    save_error: "We couldn't save the recipe. Check your connection and try again.",
    preview_title: "How it will look",
    preview_name: "Your recipe",
    success_title: "Saved!",
    success_sub: (nombre) => `"${nombre}" is now in your recipe spot.`,
    success_view: "Browse the recipes",
    success_again: "Add another recipe",

    loading_recipe: "Looking for the recipe…",
    notfound_html: "We couldn't find that recipe. <a href=\"index.html\">Back to the recipes</a>.",
    dt_time: "Time",
    dt_servings: "Servings",
    dt_diff: "Difficulty",
    ingredients: "Ingredients",
    steps: "Method",
    tick_note: "Tick each ingredient as you use it.",
    video_btn: "▶ Watch how it's made (YouTube, Hebrew)",
    video_btn_custom: "▶ Watch the how-to video",
    source_label: "Based on the recipe by",
    tip_label: "Kitchen tip",
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
