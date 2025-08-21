// jest-puppeteer.config.js
module.exports = {
  launch: {
    headless: true, // true - безголовый режим (быстрее), false - с графическим интерфейсом (для отладки)
    // slowMo: 50, // Замедляет выполнение операций Puppeteer на 50 мс (полезно для отладки)
    // devtools: true, // Открывает DevTools при запуске браузера (только если headless: false)
  },
  server: {
    // В этом примере мы не используем сервер, а открываем файл напрямую.
    // Если бы мы использовали сервер, это выглядело бы так:
    command: "npm run start", // Команда для запуска вашего сервера
    port: 9000,
    launchTimeout: 30000,
  },
};
