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
    line: "Stablecoin payments, from wallet to card.",
    href: "https://psifi.app",
    host: "psifi.app",
    status: "Ongoing",
  },
  {
    name: "Direct",
    line: "RPC infrastructure for on-chain development.",
    href: "https://direct.dev",
    host: "direct.dev",
    status: "Ongoing",
  },
  {
    name: "Panoptic",
    line: "Perpetual options on Uniswap concentrated liquidity.",
    href: "https://panoptic.xyz",
    host: "panoptic.xyz",
    status: "Completed",
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
