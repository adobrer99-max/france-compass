import type { CountryConfig } from "../types";

export const COUNTRY = {
  id: "it",
  storagePrefix: "it27",
  langs: ["en", "it"],
  defaultLang: "en",
  siteUrl: "https://adamdobrer.ca/projects/italy-compass/",
  shareFile: { en: "italy-chooses.png", it: "italia-sceglie.png" },
  subject: "party",
  headToHead: false,
} as const satisfies CountryConfig;
