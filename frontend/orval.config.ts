import { defineConfig } from "orval";

export default defineConfig({
  projects: {
    input: "./projects.yaml",
    output: {
      mode: "single",
      target: "src/api/projectAPI.ts",
      schemas: "src/api/model",
      client: "axios",
    },
  },
});
