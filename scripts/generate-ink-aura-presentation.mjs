/**
 * Generates Ink & Aura business plan as .pptx (PowerPoint / import to Google Slides).
 * Run: npm run pptx:ink-aura
 */
import pptxgen from "pptxgenjs";
import { mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "presentations");
const OUT_FILE = join(OUT_DIR, "Ink-Aura-Business-Plan.pptx");

const INK = "2C2A4A";
const AURA = "C9A962";
const MUTED = "4A4A5A";

const IMG = {
  hero: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1920&q=85&auto=format&fit=crop",
  lounge: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&q=85&auto=format&fit=crop",
  social: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1600&q=85&auto=format&fit=crop",
};

function safeAddImage(slide, opts) {
  try {
    slide.addImage(opts);
    return true;
  } catch (e) {
    console.warn("Image skipped:", e.message);
    return false;
  }
}

function addBullets(slide, items, box) {
  const body = items.map((t) => ({ text: t, options: { bullet: true, color: MUTED, fontSize: 13 } }));
  slide.addText(body, {
    x: box.x,
    y: box.y,
    w: box.w,
    h: box.h,
    valign: "top",
    lineSpacingMultiple: 1.15,
  });
}

function main() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";
  pptx.author = "Ink & Aura";
  pptx.title = "Ink & Aura — бизнес-план";
  pptx.subject = "Арт-студия татуировки и дизайна";

  // --- Slide 1: Title ---
  const s1 = pptx.addSlide();
  safeAddImage(s1, { path: IMG.hero, x: 0, y: 0, w: 5.2, h: 5.625, sizing: { type: "cover" } });
  s1.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 5.2,
    h: 5.625,
    fill: { color: INK, transparency: 35 },
    line: { color: INK, width: 0 },
  });
  s1.addText("Ink & Aura", {
    x: 5.4,
    y: 1.35,
    w: 4.3,
    h: 1.1,
    fontSize: 40,
    bold: true,
    color: INK,
    fontFace: "Arial",
  });
  s1.addText("Арт-студия татуировки и дизайна", {
    x: 5.4,
    y: 2.35,
    w: 4.3,
    h: 0.5,
    fontSize: 16,
    color: AURA,
    fontFace: "Arial",
  });
  s1.addText("Бизнес-план · гибридное арт-пространство в центре города", {
    x: 5.4,
    y: 2.95,
    w: 4.2,
    h: 1.2,
    fontSize: 14,
    color: MUTED,
    fontFace: "Arial",
  });
  s1.addText("Тату как терапия и искусство — не стресс", {
    x: 5.4,
    y: 4.15,
    w: 4.2,
    h: 0.6,
    fontSize: 13,
    italic: true,
    color: INK,
  });

  // --- Slide 2: Project ---
  const s2 = pptx.addSlide();
  s2.addText("Описание проекта", { x: 0.5, y: 0.35, w: 6.2, h: 0.55, fontSize: 28, bold: true, color: INK });
  addBullets(s2, [
    "Художественная татуировка — основной продукт; эскизы и цифровой арт.",
    "Мини-кофейня «для своих», лаунж; авторский мерч (принты, футболки, стикеры).",
    "Формат: светлое премиальное пространство вместо «брутального подвала».",
    "Масштаб: 3–4 рабочих места мастеров, зона стерилизации, отдельный лаунж.",
  ], { x: 0.5, y: 1.05, w: 5.9, h: 4.2 });
  safeAddImage(s2, { path: IMG.lounge, x: 6.55, y: 1.0, w: 3.35, h: 4.0, rounding: true });

  // --- Slide 3: Competitors ---
  const s3 = pptx.addSlide();
  s3.addText("Анализ конкурентов", { x: 0.5, y: 0.35, w: 9, h: 0.55, fontSize: 28, bold: true, color: INK });
  addBullets(s3, [
    "Прямые конкуренты: классические салоны (олдскул, агрессивный визуал) — мрачная атмосфера, слабый сервис, слабые соцсети.",
    "Непрямые: мастера «на дому» — риски стерильности и отсутствие юридических гарантий.",
    "Вывод: рынок насыщен, но мало «дружелюбных» студий с медбезопасностью и высоким сервисом.",
  ], { x: 0.5, y: 1.05, w: 5.85, h: 3.8 });
  safeAddImage(s3, { path: IMG.social, x: 6.5, y: 1.15, w: 3.4, h: 3.5, rounding: true });
  s3.addText("Ниша: эстетика + безопасность + комфорт ожидания", {
    x: 0.5,
    y: 4.85,
    w: 9,
    h: 0.45,
    fontSize: 14,
    bold: true,
    color: AURA,
  });

  // --- Slide 4: USP ---
  const s4 = pptx.addSlide();
  s4.addText("Уникальное торговое предложение", { x: 0.5, y: 0.35, w: 9, h: 0.55, fontSize: 26, bold: true, color: INK });
  s4.addText("«Татуировка как терапия и искусство, а не стресс»", {
    x: 0.5,
    y: 0.95,
    w: 9,
    h: 0.4,
    fontSize: 15,
    italic: true,
    color: AURA,
  });
  addBullets(
    s4,
    [
      "AR-примерка: приложение / фильтры — «примерить» тату до сеанса.",
      "Эко-подход: веганские пигменты, биоразлагаемые расходники.",
      "Beauty-стандарт: интерьер уровня спа/галереи — ЦА с высоким чеком.",
      "Care-box: подарочный набор для заживления в фирменной упаковке.",
    ],
    { x: 0.5, y: 1.45, w: 9, h: 3.9 }
  );

  // --- Slide 5: Organization ---
  const s5 = pptx.addSlide();
  s5.addText("Организация и команда", { x: 0.5, y: 0.35, w: 9, h: 0.55, fontSize: 28, bold: true, color: INK });
  addBullets(s5, [
    "Правовая форма: ИП, УСН 6% — оптимально для старта и работы с физлицами.",
    "Основатель: стратегия, маркетинг, контроль качества.",
    "2 топ-мастера (аренда места или % от чека).",
    "Администратор-бариста: встреча, запись, кофе, CRM.",
    "SMM (фриланс), приходящий бухгалтер и клининг.",
    "Налоги: фиксированные взносы ИП + налог с выручки.",
  ], { x: 0.5, y: 1.05, w: 9, h: 4.3 });

  // --- Slide 6: Capex chart ---
  const s6 = pptx.addSlide();
  s6.addText("Инвестиции на запуск (~2,0–2,5 млн ₽)", {
    x: 0.5,
    y: 0.35,
    w: 9,
    h: 0.55,
    fontSize: 26,
    bold: true,
    color: INK,
  });
  const investK = [
    { name: "Запуск", labels: ["Аренда+депозит", "Ремонт СанПиН", "Мебель и оборуд.", "Маркетинг", "Запас расходников"], values: [125, 800, 700, 200, 150] },
  ];
  s6.addChart(pptx.ChartType.bar, investK, {
    x: 0.45,
    y: 1.0,
    w: 9.1,
    h: 4.35,
    barDir: "col",
    showTitle: false,
    showLegend: false,
    chartColors: [AURA],
    valAxisMaxVal: 900,
    catAxisLabelFontSize: 11,
    valAxisLabelFontSize: 10,
    dataLabelFormatCode: "#,##0",
    showValue: true,
    valAxisTitle: "тыс. ₽",
    showValAxisTitle: true,
  });

  // --- Slide 7: Opex pie ---
  const s7 = pptx.addSlide();
  s7.addText("Ежемесячные операционные расходы (ориентир)", {
    x: 0.5,
    y: 0.35,
    w: 6.2,
    h: 0.9,
    fontSize: 24,
    bold: true,
    color: INK,
  });
  s7.addText("Аренда+КУ ~100 тыс. · ФОТ 250–400 тыс. · Расходники 50–70 тыс. · Реклама ~50 тыс.", {
    x: 0.5,
    y: 1.15,
    w: 5.8,
    h: 0.85,
    fontSize: 12,
    color: MUTED,
  });
  const pieData = [
    {
      name: "Статьи",
      labels: ["Аренда+КУ", "ФОТ (среднее)", "Расходники (среднее)", "Реклама"],
      values: [100, 325, 60, 50],
    },
  ];
  s7.addChart(pptx.ChartType.pie, pieData, {
    x: 5.85,
    y: 1.0,
    w: 4.0,
    h: 3.85,
    chartColors: [INK, AURA, "8B7355", "D4C4A8"],
    showPercent: true,
    showLegend: true,
    legendPos: "b",
    legendFontSize: 10,
  });

  // --- Slide 8: Performance charts ---
  const s8 = pptx.addSlide();
  s8.addText("Эффективность и рентабельность", { x: 0.5, y: 0.35, w: 9, h: 0.5, fontSize: 26, bold: true, color: INK });
  const barRev = [
    {
      name: "Выручка тату (оценка)",
      labels: ["Безубыток (~30 сеансов)", "План 2×20 сеансов/мес"],
      values: [375000, 500000],
    },
  ];
  s8.addChart(pptx.ChartType.bar, barRev, {
    x: 0.45,
    y: 0.95,
    w: 5.5,
    h: 3.15,
    barDir: "col",
    chartColors: [INK, AURA],
    showLegend: false,
    showValue: true,
    dataLabelFormatCode: "#,##0",
    valAxisTitle: "₽ / мес",
    showValAxisTitle: true,
    catAxisLabelFontSize: 10,
  });
  const linePayback = [
    {
      name: "Накопленный результат (условно)",
      labels: ["Мес. 1", "Мес. 2", "Мес. 3", "Мес. 4"],
      values: [-400000, -250000, -80000, 50000],
    },
  ];
  s8.addChart(pptx.ChartType.line, linePayback, {
    x: 6.05,
    y: 0.95,
    w: 3.55,
    h: 3.15,
    lineDataSymbol: "circle",
    lineSize: 3,
    chartColors: [AURA],
    showLegend: false,
    valAxisLabelFormatCode: "#,##0",
  });
  addBullets(
    s8,
    [
      "Средний чек: 10 000–15 000 ₽ за сеанс.",
      "Выручка: 400 000–600 000 ₽/мес при загрузке 2 мастеров × ~20 сеансов + мерч и кофе.",
      "Точка окупаемости: ~30 сеансов/мес (~4-й месяц).",
      "Срок возврата инвестиций: 14–18 мес. · Рентабельность: 25–35%.",
    ],
    { x: 0.5, y: 4.15, w: 9, h: 1.35 }
  );

  // --- Slide 9: Marketing ---
  const s9 = pptx.addSlide();
  s9.addText("Маркетинговая стратегия", { x: 0.5, y: 0.35, w: 9, h: 0.55, fontSize: 28, bold: true, color: INK });
  addBullets(s9, [
    "Контент: TikTok / Reels — процесс, ASMR, до/после, реакции клиентов.",
    "Инфлюенсеры: бартер с локальными блогерами (тату ↔ серия сторис).",
    "Реферальная программа: друг = скидка / кофе / мерч.",
    "Геосервисы: Яндекс.Карты и Google — фото интерьера и отзывы.",
    "Event: раз в квартал Flash Day — фикс-цена, диджей, безалкогольные коктейли.",
  ], { x: 0.5, y: 1.05, w: 9, h: 4.2 });

  // --- Slide 10: Summary ---
  const s10 = pptx.addSlide();
  s10.addText("Итоги", { x: 0.5, y: 0.35, w: 9, h: 0.55, fontSize: 28, bold: true, color: INK });
  addBullets(s10, [
    "Концепция: премиальное светлое арт-пространство Ink & Aura с кофе и мерчем.",
    "Капитальные затраты: ~2–2,5 млн ₽; окупаемость при дисциплине загрузки.",
    "Ключевой драйвер — сочетание сервиса, безопасности и digital/AR-опыта.",
    "Следующий шаг: подбор локации, смета ремонта по СанПиН, пилотный контент-план.",
  ], { x: 0.5, y: 1.0, w: 9, h: 3.5 });
  s10.addShape(pptx.ShapeType.rect, {
    x: 0.5,
    y: 4.55,
    w: 9,
    h: 0.75,
    fill: { color: INK, transparency: 92 },
    line: { color: AURA, width: 0.5 },
  });
  s10.addText("Импорт в Google Презентации: Файл → Импортировать слайды → загрузить этот .pptx", {
    x: 0.65,
    y: 4.62,
    w: 8.7,
    h: 0.6,
    fontSize: 11,
    color: MUTED,
  });

  mkdirSync(OUT_DIR, { recursive: true });
  pptx.writeFile({ fileName: OUT_FILE }).then(() => {
    console.log("Saved:", OUT_FILE);
  });
}

main();
