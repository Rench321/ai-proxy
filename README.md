# AI-Прокси Сервер

Простой прокси-сервер на Express, который перенаправляет запросы к различным AI-сервисам.

## Описание

Этот сервер принимает запросы, предназначенные для API, совместимых с OpenAI, и динамически перенаправляет их на `baseURL`, указанный в качестве query-параметра. Это позволяет использовать один эндпоинт для доступа к разным моделям и сервисам.

## Установка

Для установки зависимостей выполните:

```bash
bun install
```

## Запуск

Для запуска сервера выполните:

```bash
bun run index.ts
```

Сервер будет запущен по адресу `http://localhost:3000`.

## Использование

Чтобы использовать прокси, необходимо в `baseURL` клиента OpenAI указать URL прокси-сервера и добавить параметр `baseURL` с адресом целевого API.

**Пример с библиотекой OpenAI для Node.js:**

```typescript
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "GEMINI_API_KEY",
    baseURL: "http://localhost:3000?baseURL=https://generativelanguage.googleapis.com/v1beta/openai"
});

const response = await openai.chat.completions.create({
    model: "gemini-2.5-flash",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: "Explain to me how AI works",
        },
    ],
});

console.log(response.choices[0].message);
```