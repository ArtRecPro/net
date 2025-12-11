# Контражур (эффект свечения)

## Принципы

1. **Изолированное свечение** — каждый блок светится отдельно, свечения не сливаются
2. **Единообразие** — все карточки одинаковые, без особых `.highlight` стилей
3. **Hover эффект** — свечение усиливается только при наведении
4. **Псевдоэлемент `::before`** — для свечения, чтобы не мешать контенту

## Реализация

### Базовые стили для всех блоков с контражуром

```css
.block-with-glow {
    position: relative;
    overflow: hidden;  /* Изолирует свечение внутри блока */
    border: 1px solid rgba(106, 159, 181, 0.3);
}
```

### Свечение через ::before

```css
.block-with-glow::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: inset 0 0 30px rgba(106, 159, 181, 0.25),
                inset 0 0 60px rgba(106, 159, 181, 0.15),
                inset 0 0 100px rgba(106, 159, 181, 0.08);
    pointer-events: none;  /* Не блокирует клики */
    z-index: 1;
    transition: all 0.3s;
}
```

### Hover эффект

```css
.block-with-glow:hover {
    border-color: rgba(106, 159, 181, 0.6);
}

.block-with-glow:hover::before {
    box-shadow: inset 0 0 40px rgba(106, 159, 181, 0.4),
                inset 0 0 80px rgba(106, 159, 181, 0.25),
                inset 0 0 120px rgba(106, 159, 181, 0.12);
}
```

## Почему inset box-shadow?

- **Обычный box-shadow** распространяется наружу и сливается с соседними блоками
- **inset box-shadow** светит внутрь блока
- **overflow: hidden** обрезает всё что выходит за границы

## Блоки с контражуром

- `.character-card` — карточки персонажей
- `.emotion-card` — карточки эмоций
- `.production-card` — карточки производства (хронометраж, структура, преимущества)
- `.location-card` — карточки локаций
- `.camera-card` — карточки камеры
- `.screenplay-intro` — блоки PDF (сценарий, синопсис)
- `.color-block` — цветовые блоки
- `.audience-block` — блок "Для кого эта история"
- `.story-block.synopsis` — синопсис
- `.story-block.logline` — логлайн
- `.rhythm-concept` — концепция ритма
- `.vision-statement blockquote` — цитата режиссёра
- `.accent-item` — акцентные элементы
- `.vision-principle` — принципы видения
- `.poster-image` — постеры референсов

---

# Заголовки секций (металлический эффект)

## Стиль Nokia S60

Заголовки "История", "Герои" и т.д. используют мягкий серебристо-голубой градиент в стиле интерфейса Nokia S60 2003 года.

```css
.section-title {
    /* Мягкий серебристо-голубой как Nokia S60 */
    background: linear-gradient(
        180deg,
        #e8f0f8 0%,
        #c8d8e8 50%,
        #e0ecf4 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 8px rgba(160, 200, 220, 0.4));
}
```

## Принципы

- Мягкий градиент, не агрессивный хром
- Голубовато-серебристые тона
- Лёгкое свечение через `drop-shadow`

---

# Подзаголовки (hover эффект)

## Стиль

Подзаголовки "Референсы", "Цветовая палитра" и т.д. используют простой hover эффект.

```css
/* Простой hover — небольшое увеличение */
.subsection-title {
    transition: transform 0.3s ease;
}

.subsection-title:hover {
    transform: scale(1.05);
}

/* Hover эффект для линий */
.title-decorated:hover::before,
.title-decorated:hover::after {
    width: 100px;
}
```

## Принципы

- Небольшое увеличение (scale 1.05) при наведении
- Линии по бокам удлиняются (80px → 100px)
- Плавная анимация 0.3s

---

# Цветовая палитра

## CSS переменные

```css
:root {
    --primary-color: #6a9fb5;      /* Приглушённый серо-синий (основной) */
    --secondary-color: #12161a;    /* Тёмный фон */
    --text-color: #e0e5e9;         /* Тёплый белый (основной текст) */
    --text-secondary: #a8c0d0;     /* Светлый серо-голубой (вторичный текст) */
    --bg-dark: #0c0f12;           /* Почти чёрный с синевой */
    --bg-medium: #14181c;         /* Тёмно-серый */
    --bg-light: #1e2328;          /* Карточки */
    --accent-color: #8bb8c9;       /* Мягкий голубой (акценты) */
    --title-color: #e8ecf0;        /* Серебристый для заголовков */
}
```

## Принципы

- **--text-color** (`#e0e5e9`) — основной текст, хорошо читается на тёмном фоне
- **--text-secondary** (`#a8c0d0`) — вторичный текст, светлый серо-голубой с голубым оттенком, но отличается от основного цвета
- **--primary-color** (`#6a9fb5`) — основной акцентный цвет, используется для ссылок и активных элементов
- **--accent-color** (`#8bb8c9`) — мягкий голубой для дополнительных акцентов
