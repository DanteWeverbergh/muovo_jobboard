import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const siteUrl = process.env.SITE_URL;

  //get data
  const response = await fetch(`${apiUrl}/wp-json/rs/v1/companies`);

  const companies: any[] = await response.json();

  const fields: ISitemapField[] = companies.map((company) => ({
    loc: `${siteUrl}/directory/${company.slug}`,
  }));

  return getServerSideSitemap(ctx, fields);
};

export default function Companies() {}
