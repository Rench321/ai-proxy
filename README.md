# AI-Прокси Сервер

Простой прокси-сервер на Express, который перенаправляет запросы к различным AI-сервисам.

## Описание

Этот сервер принимает запросы, предназначенные для API, совместимых с OpenAI, и динамически перенаправляет их на `baseURL`, указанный в качестве query-параметра. Это позволяет использовать один эндпоинт для доступа к разным моделям и сервисам.

Важно отметить, что прокси не ограничивается только AI-запросами и может быть использован для перенаправления любых HTTP-запросов.

## Запуск

Есть два способа запустить сервер:

### Локально

1.  **Установите зависимости:**
    ```bash
    bun install
    ```

2.  **Запустите сервер:**
    ```bash
    bun run index.ts
    ```

### С помощью Docker

[Ссылка на Docker Hub](https://hub.docker.com/r/rench321/ai-proxy)

1.  **Загрузите образ из Docker Hub:**
    ```bash
    docker pull rench321/ai-proxy
    ```

2.  **Запустите контейнер:**
    ```bash
    docker run -p 3000:3000 rench321/ai-proxy
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

**Пример с `curl`:**

```bash
curl "http://localhost:3000?baseURL=https://generativelanguage.googleapis.com/v1beta/openai/chat/completions" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer GEMINI_API_KEY" \
-d '{
    "model": "gemini-2.5-flash",
    "messages": [
        {"role": "user", "content": "Explain to me how AI works"}
    ]
    }'
```