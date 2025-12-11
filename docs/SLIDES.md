# Секции и фоновые изображения

## Принцип работы секций

1. **Hero (Главная)** — `height: 100vh`, слайд на весь экран
2. **Остальные секции с фоном** — растягиваются по контенту, фон cover

## CSS для Hero

```css
.hero {
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('images/FILENAME.jpg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #000;
}
```

## CSS для секций с фоном (История и др.)

**Рабочий подход (как в "Не придешь"):**

```css
.section-name {
    background: linear-gradient(rgba(10, 10, 10, 0.65), rgba(10, 10, 10, 0.65)),
                url('images/FILENAME.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}
```

## Ключевые моменты

- **`background-size: cover`** — фон заполняет всю секцию
- **`background-attachment: fixed`** — параллакс-эффект при скролле
- **Затемнение через градиент** — `linear-gradient(rgba(10, 10, 10, 0.65), ...)`
- Секции наследуют `padding: 100px 0` от класса `.section`

## ВАЖНО: Адаптивность для мобильных

`background-attachment: fixed` НЕ РАБОТАЕТ на iOS!

Обязательно добавь медиа-запрос:

```css
@media (max-width: 1024px) {
    .hero,
    .story,
    .visual,
    .characters,
    .rhythm,
    .vision,
    .production,
    .contacts {
        background-attachment: scroll !important;
    }
}
```

## Добавление новой секции с фоном

1. Загрузи изображение в `images/`
2. Добавь CSS по шаблону выше с `cover` и `fixed`
3. Убедись, что секция добавлена в медиа-запрос для 1024px
