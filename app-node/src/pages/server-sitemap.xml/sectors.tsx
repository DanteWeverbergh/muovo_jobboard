import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const siteUrl = process.env.SITE_URL;

  //get data
  const response = await fetch(`${apiUrl}/wp-json/rs/v1/taxonomy/sectors`);

  const sectors: any[] = await response.json();

  const fields: ISitemapField[] = sectors.map((sector) => ({
    loc: `http://localhost:10010/sectors/${sector.sector
      .toLowerCase()
      .replace(/\s/g, '-')}}`,
  }));

  return getServerSideSitemap(ctx, fields);
};

export default function Sectors() {}
