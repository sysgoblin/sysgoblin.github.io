module.exports = {
  title: 'rm -rf lol',
  description: '...',
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Posts", link: "/posts/" },
      { text: "About", link: "/about/" },
    ],
    sidebar: 'auto',
    sidebarDepth: 2
  },
  plugins: [
    "@vuepress/active-header-links",
    "@vuepress/back-to-top",
    "vuepress-plugin-reading-time",
    "vuepress-plugin-smooth-scroll",
    "vuepress-plugin-typescript",
    [
      "@vuepress/blog",
      {
        directories: [
          {
            id: "post",
            dirname: "_posts",
            itemPermalink: "/:year/:month/:day/:slug.html",
          },
        ],
        feed: {
          canonical_base: "https://sysgoblin.github.io",
        },
      },
    ],
    [
      "@vuepress/google-analytics",
      {
        ga: "G-S0VQK58D6J",
      },
    ],
    [
      "@limdongjin/vuepress-plugin-simple-seo",
      {
        root_url: "https://sysgoblin.github.io",
        default_site_name: "sysgoblin.github.io",
        twitter_creator: "@sysgoblin",
        twitter_site: "@sysgoblin",
      },
    ],
  ],
};