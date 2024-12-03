import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "canvas-primary": "#f5f5f5",
        "bg-primary": "#fff",
        "bg-secondary": "#f9fafb",
        "border-primary": "#D0D5DD",
        "border-secondary": "eaecf0",
        "button-primary": "#7F56D9",
        "button-secondary": "#fff",
        "button-secondary-fg": "#6941C6",
        "button-primary-fg": "#fff",
        "text-primary": "#101828",
        "text-secondary": "##344054",
        "text-tertiary": "#475467",
        "text-placeholder": "#667085",
        shadow: "#1018280D",
      },

      container: {
        center: true,
      },
    },
  },
  plugins: [],
} satisfies Config;
