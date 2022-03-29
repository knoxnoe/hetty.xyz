/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    "intro",
    "getting-started",
    {
      type: "category",
      label: "Guides",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: ["guides/intercept", "guides/trust-root-ca"],
    },
    {
      type: "category",
      label: "Appendix",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: ["appendix/filter-lang", "appendix/cli-options"],
    },
  ],
};

module.exports = sidebars;
