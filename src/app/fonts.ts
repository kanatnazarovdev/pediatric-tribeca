// src/app/fonts.ts
import localFont from "next/font/local";

export const brandonGrotesque = localFont({
  src: [
    {
      path: "./fonts/Brandon_Grotesque_regular.woff2",
      weight: "400",
      style: "normal", // "regular" is not a valid CSS style value
    },
    {
      path: "./fonts/Brandon_Grotesque_medium.woff2",
      weight: "500",
      style: "normal", // Use "normal" for non-italic fonts
    },
    {
      path: "./fonts/Brandon_Grotesque_bold.woff2",
      weight: "700",
      style: "normal", // Use "normal" here as well
    },
  ],
  variable: "--font-brandon",
});