import type { CountryPanels, ExtraPanel } from "../types";
import type { CandidateCode } from "./candidates";

/** No extra panels yet. Candidates for later: the 5% threshold and the coalition maths. */
const none: ExtraPanel<CandidateCode>[] = [];

export const PANELS = {
  extraPanels: none,
} satisfies CountryPanels<CandidateCode>;
