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
  links: {
    href: string;
    label: Localized<string>;
    /** Marks the link as a primary action on the page. */
    primary?: boolean;
  }[];
};
