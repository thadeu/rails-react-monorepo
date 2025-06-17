import { defineConfig } from "vite";

import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from "vite-tsconfig-paths";

export default ({ mode }: { mode: string }) => {
  return defineConfig({
    plugins: [
      tailwindcss(),
      reactRouter(),
      tsconfigPaths()
    ],
  });
}
