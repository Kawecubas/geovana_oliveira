import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cafe: "#2B1E17",
        marrom: "#4B3428",
        marromSuave: "#7A5E4A",

        champagne: "#D8C39A",
        ouro: "#B99655",
        ouroFosco: "#A9823F",

        bege: "#F4EFE7",
        begeClaro: "#FFFDF8",
        areia: "#D7C8B8",

        oliva: "#3F4735",
        olivaClaro: "#68725A",

        texto: "#2B1E17",
        textoSuave: "#6F6258",
      },
      boxShadow: {
        premium: "0 24px 80px rgba(43, 30, 23, 0.16)",
        card: "0 18px 45px rgba(43, 30, 23, 0.10)",
        soft: "0 10px 28px rgba(43, 30, 23, 0.08)",
      },
      borderRadius: {
        premium: "2rem",
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
        serif: ["Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;