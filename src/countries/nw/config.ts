import type { CountryConfig } from "../types";

export const COUNTRY = {
  id: "nw",
  storagePrefix: "nw27",
  langs: ["en", "de"],
  defaultLang: "de",
  siteUrl: "https://adamdobrer.ca/projects/nrw-compass/",
  shareFile: { en: "nrw-chooses.png", de: "nrw-waehlt.png" },
  subject: "party",
  headToHead: false,
} as const satisfies CountryConfig;
