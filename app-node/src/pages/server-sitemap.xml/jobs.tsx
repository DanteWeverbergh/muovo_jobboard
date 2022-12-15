import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const perPage = 12;
  const page = 1;

  const response = await fetch(
    `${apiUrl}/wp-json/rs/v1/jobs/?per_page=${perPage}&page=${page}`
  );

  const jobs: any[] = await response.json();

  const fields: ISitemapField[] = jobs.map((job) => ({
    loc: `http://localhost:10010/jobs/${job.slug}-${job.id}`,
  }));

  return getServerSideSitemap(ctx, fields);
};

export default function Jobs() {}
