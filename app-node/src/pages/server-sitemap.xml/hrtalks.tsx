import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

  const response = await fetch(
    `${apiUrl}/wp-json/rs/v1/blog/?per_page=10&page=1`
  );

  const posts: any[] = await response.json();

  const fields: ISitemapField[] = posts.map((post) => ({
    loc: `http://localhost:10010/hrtalks/${post.title
      .replace(/ /g, '-')
      .toLowerCase()}}`,
  }));

  return getServerSideSitemap(ctx, fields);
};

export default function HrTalks() {}
