export const site = {
  name: "A8 Enterprises",
  shortName: "A8",
  url: "https://a8enterprises.com",
  description:
    "Software consultancy. We build products and take them to market.",
  headline: "From first commit to market.",
  subtext:
    "A consultancy for founders who need the product built and launched.",
};

export const projects = [
  {
    name: "PsiFi",
    line: "Stablecoin payments, from wallet to card. Built by A8 and acquired by Prime Delta in October 2026.",
    href: "https://psifi.app",
    host: "psifi.app",
    status: "Acquired",
    dates: "2023-present",
  },
  {
    name: "Direct",
    line: "RPC infrastructure for on-chain development.",
    href: "https://direct.dev",
    host: "direct.dev",
    status: "Ongoing",
    dates: "2025-present",
  },
  {
    name: "Panoptic",
    line: "Perpetual options on Uniswap concentrated liquidity.",
    href: "https://panoptic.xyz",
    host: "panoptic.xyz",
    status: "Completed",
    dates: "2021-2023",
  },
] as const;

export const capabilities = [
  {
    name: "Build",
    line: "Architecture, product, and the production system.",
  },
  {
    name: "Launch",
    line: "Positioning, first customers, and the motion around the product.",
  },
  {
    name: "Lead",
    line: "Fractional technical leadership after version one.",
  },
] as const;
