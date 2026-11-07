/**
 * The measured facts about the Journal API.
 *
 * Every number here is measured from the project itself, and
 * `scripts/verify-facts.mjs` checks it against the real repository. That
 * matters because this project is a closed one — it was torn down on
 * 2026-11-06 — so its facts should be frozen. The one that was not: the
 * commit count moved when other work landed in the same repository, which
 * is exactly the kind of drift the "no number without a source" rule exists
 * to catch.
 *
 * `commitsAuthored` counts only commits authored by Rodrigo. The branch
 * total is larger because the project started as a fork and had
 * contributors and tooling in it; a recruiter reading "N commits" on a
 * portfolio reads it as "this person wrote N commits", so the authored
 * count is the number to publish.
 */
export const journalApiFacts = {
  /** Commits authored by Rodrigo in the branch. */
  commitsAuthored: 83,
  /** Total commits in the branch, including upstream and other contributors. */
  commitsInBranch: 233,
  /** Terraform resources declared across the stack. */
  terraformResources: 79,
  /** AWS Config managed rules: 8 conformity + 5 threat. */
  configRules: 13,
  /** CloudWatch custom metric series after the filter was applied. */
  metricSeries: 15,
  /** Real AWS Config findings on the first evaluation, all closed. */
  configFindings: 3,
  /** Resources destroyed by the teardown. */
  resourcesDestroyed: 99,
  /** S3 versions emptied by hand, because force_destroy was false. */
  s3VersionsEmptied: 6107,
  /** ECR images deleted before the repository could be removed. */
  ecrImagesDeleted: 66,
  /** The measured cost of the whole deployment. */
  costUsd: 0,
} as const;

export type JournalApiFactName = keyof typeof journalApiFacts;
