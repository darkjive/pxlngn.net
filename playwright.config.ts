import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Timeout für einzelne Tests
  timeout: 30 * 1000,

  // Globales Timeout für alle Tests
  globalTimeout: 10 * 60 * 1000,

  // Test Retries bei Fehlern (nur im CI)
  retries: process.env.CI ? 2 : 0,

  // Parallele Ausführung
  workers: process.env.CI ? 2 : undefined,

  // Reporter
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    process.env.CI ? ['github'] : ['list'],
  ],

  // WebServer Configuration
  webServer: {
    command: 'npm run dev',
    port: 4321,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },

  // Globale Test-Einstellungen
  use: {
    baseURL: 'http://localhost:4321',

    // Trace bei Fehler erstellen
    trace: 'on-first-retry',

    // Screenshots bei Fehlern
    screenshot: 'only-on-failure',

    // Video bei Fehlern
    video: 'retain-on-failure',

    // Viewport (Standard Desktop)
    viewport: { width: 1280, height: 720 },

    // Locale und Timezone
    locale: 'de-DE',
    timezoneId: 'Europe/Berlin',
  },

  // Browser-Konfiguration
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Mobile Tests
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
    // Tablet Tests
    {
      name: 'tablet',
      use: {
        ...devices['iPad Pro'],
        viewport: { width: 1024, height: 768 },
      },
    },
  ],
});
