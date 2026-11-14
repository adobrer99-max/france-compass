/* The active country's panels, typed to the shared contract so the engine
   never depends on which optional parts a given country fills in. */
import { PANELS as RAW } from "@country/panels";
import type { CandidateCode } from "@country/candidates";
import type { CountryPanels } from "./countries/types";

export const PANELS = RAW as CountryPanels<CandidateCode>;
