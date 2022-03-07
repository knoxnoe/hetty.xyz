// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

async function createConfig() {
  const smartypants = (await import("remark-smartypants")).default;

  /** @type {import('@docusaurus/types').Config} */
  return {
    title: "Hetty",
    tagline: "An HTTP toolkit for security research.",
    url: "https://hetty.xyz",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",
    organizationName: "dstotijn",
    projectName: "hetty",

    plugins: [
      async function nullitics() {
        return {
          name: "nullitics",
          injectHtmlTags() {
            return {
              postBodyTags: [
                `<script async defer src="https://nullitics.com/script.js"></script>`,
              ],
            };
          },
        };
      },
    ],

    presets: [
      [
        "classic",
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            sidebarPath: require.resolve("./sidebars.js"),
            editUrl: "https://github.com/hettysoft/hetty.xyz/tree/main/",
            remarkPlugins: [smartypants],
          },
          theme: {
            customCss: require.resolve("./src/css/custom.css"),
          },
        }),
      ],
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        colorMode: {
          respectPrefersColorScheme: true,
        },
        navbar: {
          logo: {
            alt: "Hetty (logo)",
            src: "img/hetty_light.svg",
            srcDark: "img/hetty_dark.svg",
          },
          items: [
            {
              type: "doc",
              docId: "intro",
              position: "left",
              label: "Docs",
            },
            {
              href: "https://github.com/dstotijn/hetty",
              label: "GitHub",
              position: "right",
            },
          ],
        },
        footer: {
          style: "dark",
          links: [
            {
              title: "Docs",
              items: [
                {
                  label: "Introduction",
                  to: "/docs",
                },
                {
                  label: "Getting Started",
                  to: "/docs/getting-started",
                },
                {
                  label: "Guides",
                  to: "/docs/category/guides",
                },
                {
                  label: "Appendix",
                  to: "/docs/category/appendix",
                },
              ],
            },
            {
              title: "Community",
              items: [
                {
                  label: "GitHub Discussions",
                  href: "https://github.com/dstotijn/hetty/discussions",
                },
                {
                  label: "Discord",
                  href: "https://discord.gg/3HVsj5pTFP",
                },
                {
                  label: "Twitter",
                  href: "https://twitter.com/hettyapp",
                },
              ],
            },
            {
              title: "More",
              items: [
                {
                  label: "GitHub",
                  href: "https://github.com/dstotijn/hetty",
                },
              ],
            },
          ],
          copyright: `© ${new Date().getFullYear()} Hetty Software`,
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
        },
      }),
  };
}

module.exports = createConfig;
