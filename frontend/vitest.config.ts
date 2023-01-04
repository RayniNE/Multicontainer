import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
  define: {
    "import.meta.vitest": "undefined",
  },
  test: {
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "**/__mocks__/**", "**/__tests__/**"],
    includeSource: ["src/**/*.{ts,tsx}"],
    coverage: {
      provider: "c8",
    },
  },
});
