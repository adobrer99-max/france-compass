/* ============================================================
   What a country folder has to provide. Every country lives in
   src/countries/<id>/ with the same files:

     config.ts       COUNTRY: ids, languages, links (plain data, no imports)
     panels.tsx      PANELS: extra panels and the runoff note (may use React)
     strings.ts      COUNTRY_STRINGS: its own text, per language
     candidates.ts   CANDIDATES, BY_CODE, ACTIVE, LIKELY_RUNOFF, POLL_SOURCE, initials
     statements.ts   STATEMENTS, AREAS, AREA, AXES, BY_ID
     codes.ts        CODES, CHANGES, positionOf

   The build picks one with COUNTRY=<id> (default fr). See
   src/countries/README.md.
   ============================================================ */

import type { ReactNode } from "react";
import type { Strings } from "../i18n";

/** A panel only this country has (France: the firewall, past elections). Opens at ?<id>. */
export interface ExtraPanel<Code extends string = string> {
  id: string;
  /** label in the bottom nav */
  nav: (t: Strings) => string;
  /** sheet title */
  heading: (t: Strings) => string;
  /** one line under the heading on the intro card */
  blurb: (t: Strings) => string;
  render: (p: { onCandidate: (c: Code) => void }) => ReactNode;
}

export interface CountryConfig {
  /** folder name and ISO code, e.g. "fr" */
  id: string;
  /** localStorage prefix; never change it once live or saved progress is lost */
  storagePrefix: string;
  /** interface languages, first = fallback for the share card and context default */
  langs: readonly string[];
  /** used when neither the address, storage nor the browser picks a supported language */
  defaultLang: string;
  /** where the live compass is, for the share text */
  siteUrl: string;
  /** downloaded share-card file name, per language */
  shareFile: Record<string, string>;
}

/** Kept apart from the config so the language setup never imports components. */
export interface CountryPanels<Code extends string = string> {
  extraPanels: ExtraPanel<Code>[];
  /** an extra line under the runoff card for some pairs, with links to extra panels */
  runoffNote?: (pair: [Code, Code]) => { text: (t: Strings) => string; panels: string[] } | null;
}
