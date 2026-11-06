export type Locale = "es" | "en";

export const LOCALES: Locale[] = ["es", "en"];

export const DEFAULT_LOCALE: Locale = "es";

export type Localized<T> = { es: T; en: T };

export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

export type CaseStudySection = {
  heading: Localized<string>;
  body: Localized<string[]>;
  list?: Localized<string[]>;
};

export type TechGroup = {
  label: Localized<string>;
  value: string;
};

/**
 * A link on a case study.
 *
 * `kind` is what a card reads to decide which action to surface. The
 * repository is the primary proof; a demo is secondary and only exists when
 * it is verified live.
 */
export type CaseStudyLink = {
  href: string;
  label: Localized<string>;
  kind: "repo" | "demo" | "pipeline";
  /** Marks the link as the primary action on the page. */
  primary?: boolean;
};

export type CaseStudy = {
  slug: string;
  name: string;
  year: string;
  tags: string[];
  /** Short line for the card and the listing. */
  tagline: Localized<string>;
  /** One-paragraph summary for the case study header. */
  summary: Localized<string>;
  role: Localized<string>;
  status: Localized<string>;
  tech: TechGroup[];
  sections: CaseStudySection[];
  /** Optional ASCII diagram, rendered in a pre block. */
  architecture?: Localized<string>;
  links: CaseStudyLink[];
};
