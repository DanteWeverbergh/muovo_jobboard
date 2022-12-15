import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

  const response = await fetch(`${apiUrl}/wp-json/rs/v1/taxonomy/categories`);

  const categories: any[] = await response.json();

  const fields: ISitemapField[] = categories.map((category) => ({
    loc: `http://localhost:10010/categories/${category.category
      .toLowerCase()
      .replace(/\s/g, '-')}}`,
  }));

  return getServerSideSitemap(ctx, fields);
};

export default function Jobs() {}
