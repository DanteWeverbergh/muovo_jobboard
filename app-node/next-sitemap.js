module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.SITE_URL}/sitemap.xml`,
      `${process.env.SITE_URL}/server-sitemap.xml/jobs`,
      `${process.env.SITE_URL}/server-sitemap.xml/companies`,
      `${process.env.SITE_URL}/server-sitemap.xml/hrtalks`,
      `${process.env.SITE_URL}/server-sitemap.xml/sectors`,
      `${process.env.SITE_URL}/server-sitemap.xml/categories`,
    ],
  },
};
