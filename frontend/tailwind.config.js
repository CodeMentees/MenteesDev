/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        light: {
          text: "#49491d",
          background: "#d8ecfd",
          primary: "#266392",
          secondary: "#92c2fc",
          accent: "#49491d",
        },
        dark: {
          text: "#ffffff",
          h1:"#6eacda",
          background: "#021526",
          primary: "#6EACDA",
          box :"#031c35",
          btn:  "#CD0094",
          secondary: "#03346E",
          accent: "#E2E2B6",
          h:"#6eacda"
        },
      },
    },
    fontFamily: {
      body: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      sans: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },
  },
};
