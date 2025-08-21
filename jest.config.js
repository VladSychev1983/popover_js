// jest.config.js
module.exports = {
  preset: "jest-puppeteer",
  testMatch: ["*/__tests__/*/*.test.js", "**/?(*.)+(spec|test).[jt]s?(x)"],
  // Дополнительные настройки для Jest
  setupFilesAfterEnv: ["<rootDir>/jest-setup.js"], // Опционально: для дополнительных настроек перед каждым тестом
};
