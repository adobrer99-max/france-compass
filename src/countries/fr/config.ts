import type { CountryConfig } from "../types";

export const COUNTRY = {
  id: "fr",
  storagePrefix: "fc",
  langs: ["en", "fr"],
  defaultLang: "en",
  siteUrl: "https://adamdobrer.ca/projects/france-compass/",
  shareFile: { en: "france-chooses.png", fr: "la-france-choisit.png" },
} as const satisfies CountryConfig;
