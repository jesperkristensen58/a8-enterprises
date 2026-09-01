export const PROJECT_TYPES = [
  { value: "new-product", label: "New product" },
  { value: "rebuild", label: "Rebuild or extend" },
  { value: "gtm", label: "Go to market" },
  { value: "leadership", label: "Technical leadership" },
] as const;

export const STAGES = [
  { value: "idea", label: "Idea" },
  { value: "in-progress", label: "In progress" },
  { value: "production", label: "In production" },
] as const;

export const TIMELINES = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3", label: "1 to 3 months" },
  { value: "3-6", label: "3 to 6 months" },
  { value: "exploratory", label: "Exploratory" },
] as const;

export const BUDGETS = [
  { value: "under-25", label: "Under $25k" },
  { value: "25-75", label: "$25k to $75k" },
  { value: "75-150", label: "$75k to $150k" },
  { value: "150-plus", label: "$150k+" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const OWNERSHIP = [
  { value: "engineering", label: "Product engineering" },
  { value: "gtm", label: "Go to market" },
  { value: "leadership", label: "Technical leadership" },
  { value: "all", label: "All of the above" },
] as const;

const LIMITS = {
  name: 80,
  email: 120,
  company: 120,
  brief: 4000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type Inquiry = {
  name: string;
  email: string;
  company: string;
  projectType: (typeof PROJECT_TYPES)[number]["value"];
  stage: (typeof STAGES)[number]["value"];
  timeline: (typeof TIMELINES)[number]["value"];
  budget: (typeof BUDGETS)[number]["value"];
  ownership: (typeof OWNERSHIP)[number]["value"];
  brief: string;
};

export type InquiryInput = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  stage: string;
  timeline: string;
  budget: string;
  ownership: string;
  brief: string;
  website?: string;
};

export type ParseResult =
  | { ok: true; spam: true }
  | { ok: true; spam: false; data: Inquiry }
  | { ok: false; errors: Record<string, string> };

function str(value: unknown, max: number): string | null {
  if (value === undefined || value === null) return "";
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed.length > max) return null;
  return trimmed;
}

function oneOf<T extends string>(
  value: unknown,
  options: readonly { value: T }[],
): T | null {
  if (typeof value !== "string") return null;
  return options.some((option) => option.value === value) ? (value as T) : null;
}

function labelOf(
  value: string,
  options: readonly { value: string; label: string }[],
): string {
  return options.find((option) => option.value === value)?.label ?? value;
}

export function parseInquiry(body: unknown): ParseResult {
  if (body === null || typeof body !== "object") {
    return { ok: false, errors: { form: "Invalid request." } };
  }

  const input = body as Record<string, unknown>;
  const honeypot = typeof input.website === "string" ? input.website.trim() : "";
  if (honeypot) {
    return { ok: true, spam: true };
  }

  const errors: Record<string, string> = {};

  const name = str(input.name, LIMITS.name);
  if (name === null) errors.name = "Use a name under 80 characters.";
  else if (!name) errors.name = "Name is required.";

  const email = str(input.email, LIMITS.email);
  if (email === null) errors.email = "Use an email under 120 characters.";
  else if (!email) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email.";

  const company = str(input.company, LIMITS.company);
  if (company === null) errors.company = "Use a company name under 120 characters.";
  else if (!company) errors.company = "Company is required.";

  const projectType = oneOf(input.projectType, PROJECT_TYPES);
  if (!projectType) errors.projectType = "Select a project type.";

  const stage = oneOf(input.stage, STAGES);
  if (!stage) errors.stage = "Select a stage.";

  const timeline = oneOf(input.timeline, TIMELINES);
  if (!timeline) errors.timeline = "Select a timeline.";

  const budget = oneOf(input.budget, BUDGETS);
  if (!budget) errors.budget = "Select a budget.";

  const ownership = oneOf(input.ownership, OWNERSHIP);
  if (!ownership) errors.ownership = "Select what you need owned.";

  const brief = str(input.brief, LIMITS.brief);
  if (brief === null) errors.brief = "Keep the brief under 4000 characters.";
  else if (!brief) errors.brief = "Tell us what you need.";
  else if (brief.length < 20) errors.brief = "Add a little more context (20+ characters).";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    spam: false,
    data: {
      name: name as string,
      email: email as string,
      company: company as string,
      projectType: projectType as Inquiry["projectType"],
      stage: stage as Inquiry["stage"],
      timeline: timeline as Inquiry["timeline"],
      budget: budget as Inquiry["budget"],
      ownership: ownership as Inquiry["ownership"],
      brief: brief as string,
    },
  };
}

export function formatInquiry(data: Inquiry): string {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company}`,
    `Project type: ${labelOf(data.projectType, PROJECT_TYPES)}`,
    `Stage: ${labelOf(data.stage, STAGES)}`,
    `Timeline: ${labelOf(data.timeline, TIMELINES)}`,
    `Budget: ${labelOf(data.budget, BUDGETS)}`,
    `Ownership: ${labelOf(data.ownership, OWNERSHIP)}`,
    "",
    "Brief:",
    data.brief,
  ].join("\n");
}

export const emptyInquiry = (): InquiryInput => ({
  name: "",
  email: "",
  company: "",
  projectType: "",
  stage: "",
  timeline: "",
  budget: "",
  ownership: "",
  brief: "",
  website: "",
});
