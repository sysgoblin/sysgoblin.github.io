import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧙‍♂️</text></svg>",
      },
    ],
  ],
  title: "rm -rf lol",
  description: "blog ennit",
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "About", link: "/about" },
      { text: "Posts", link: "/posts/posts" },
    ],

    search: {
      provider: "local",
    },

    sidebar: {
      "/posts/": [
        {
          // text: "Posts",
          items: [
            {
              text: "2022",
              items: [
                {
                  text: "Using and Monetizing Victim Data from Phishing",
                  link: "https://www.zerofox.com/blog/phishing-ecosystem-using-and-monetizing-victim-data/",
                },
                {
                  text: "Phishing Kit Victim Workflow and Data Exfiltration",
                  link: "https://www.zerofox.com/blog/phishing-kit-victim-workflow-and-data-exfiltration/",
                },
              ],
            },
            {
              text: "2021",
              items: [
                {
                  text: "Phishing Lure Distribution",
                  link: "https://www.zerofox.com/blog/phishing-kit-lure-distribution/",
                },
                {
                  text: "Types of Phishing Kits",
                  link: "https://www.zerofox.com/blog/types-of-phishing-kits/",
                },
                {
                  text: "Webinar: Dismantling Puppeteer Kits Targeting Financial Organisations",
                  link: "https://www.zerofox.com/webinars/dismantling-puppeteer-kits-targeting-financial-organisations-938d107108387a3189b0e12afc553cf3/",
                },
              ],
            },
            {
              text: "2020",
              items: [
                {
                  text: "FreakzBrothers: Revenge of the Nerd(face)",
                  link: "/posts/2020-08-10-freakzbrothers-revenge-of-the-nerdface",
                },
                {
                  text: "16Shop: Dissecting the Slimy Phish",
                  link: "/posts/2020-07-31-16Shop-dissecting-the-slimy-phish",
                },
                {
                  text: "16Shop Victim Analysis",
                  link: "/posts/2020-05-12-16Shop-victim-analysis",
                },
              ],
            },
          ],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/sysgoblin" }],
  },
});
