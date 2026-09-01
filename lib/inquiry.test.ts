import { describe, expect, it } from "vitest";
import { formatInquiry, parseInquiry, type Inquiry } from "./inquiry";

const valid = {
  name: "Alex Rivera",
  email: "alex@example.com",
  company: "Northline",
  projectType: "new-product",
  stage: "idea",
  timeline: "1-3",
  budget: "75-150",
  ownership: "all",
  brief: "We need a payments product built and taken to a first market.",
} satisfies Inquiry;

describe("parseInquiry", () => {
  it("accepts a complete inquiry", () => {
    const result = parseInquiry(valid);
    expect(result).toEqual({ ok: true, spam: false, data: valid });
  });

  it("trims whitespace", () => {
    const result = parseInquiry({ ...valid, name: "  Alex Rivera  " });
    expect(result.ok && !result.spam && result.data.name).toBe("Alex Rivera");
  });

  it("rejects a missing name", () => {
    const result = parseInquiry({ ...valid, name: "   " });
    expect(result).toEqual({
      ok: false,
      errors: { name: "Name is required." },
    });
  });

  it("treats omitted fields as required, not oversized", () => {
    const result = parseInquiry({ name: "Alex" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.email).toBe("Email is required.");
      expect(result.errors.company).toBe("Company is required.");
      expect(result.errors.brief).toBe("Tell us what you need.");
    }
  });

  it("rejects a bad email", () => {
    const result = parseInquiry({ ...valid, email: "not-an-email" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.email).toBe("Enter a valid email.");
  });

  it("rejects an unknown project type", () => {
    const result = parseInquiry({ ...valid, projectType: "synergy" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.projectType).toBe("Select a project type.");
    }
  });

  it("rejects a short brief", () => {
    const result = parseInquiry({ ...valid, brief: "Help please" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.brief).toMatch(/20\+/);
    }
  });

  it("rejects an oversized brief", () => {
    const result = parseInquiry({ ...valid, brief: "x".repeat(4001) });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.brief).toMatch(/4000/);
    }
  });

  it("treats a filled honeypot as spam without errors", () => {
    const result = parseInquiry({ ...valid, website: "https://spam.test" });
    expect(result).toEqual({ ok: true, spam: true });
  });

  it("rejects a non-object body", () => {
    expect(parseInquiry("nope")).toEqual({
      ok: false,
      errors: { form: "Invalid request." },
    });
  });
});

describe("formatInquiry", () => {
  it("renders labels, not raw values", () => {
    const text = formatInquiry(valid);
    expect(text).toContain("Project type: New product");
    expect(text).toContain("Budget: $75k to $150k");
    expect(text).toContain(valid.brief);
  });
});
