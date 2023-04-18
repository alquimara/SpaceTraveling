import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import Head from 'next/head';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { getPrismicClient } from '../../services/prismic';
import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Carregando...</p>;
  }

  const qtdPalvrasContent = post.data.content.reduce((acc, item) => {
    const heading = item.heading.trim().split(' ').length
    const body = item.body.reduce((result, bo) => {
      return result += bo.text.trim().split(' ').length
    }, 0)
    return acc += heading + body
  }, 0)

  const somaTempoLeitura = Math.round(qtdPalvrasContent / 200)

  return !post ? (<p>Carregando ...</p>) : (
    <>
      <Head>
        <title>{post.data.title} | SpaceTraveling</title>
      </Head>
      <main>

        <article>
          <img className={styles.banner} src="/image/banner.svg" alt='banner' />
          <div className={`${commonStyles.maximumSize} ${styles.container} `}>
            <h1>{post.data.title}</h1>
            <div className={commonStyles.info}>
              <div className={commonStyles.details}>
                <FiCalendar />
                <span>
                  {format(parseISO(post.first_publication_date), 'dd MMM yyyy', {
                    locale: ptBR,
                  }).toString()}
                </span>
              </div>
              <div className={commonStyles.details}>
                <FiUser />
                <span>{post.data.author}</span>
              </div>
              <div className={commonStyles.details}>
                <FiClock />
                <span>{somaTempoLeitura} min</span>
              </div>
            </div>
            {post.data.content.map((cont => (
              <div key={cont.heading} className={styles.content}>
                <h3>{cont.heading}</h3>
                {cont.body.map(({ text }, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            )))}
          </div>
        </article>
      </main>

    </>
  )
}

export const getStaticPaths = async () => {

  const prismic = getPrismicClient({});
  const posts = await prismic.getByType('posts');
  const paths = posts.results.map((post => {
    return {
      params: {
        slug: post.uid
      }
    }
  }))
  return {
    paths,
    fallback: true
  }

};

export const getStaticProps = async ({ params }) => {
  const prismic = getPrismicClient({});
  const { slug } = params;
  const response = await prismic.getByUID('posts', String(slug), {});


  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtite: response.data.subtitle,
      banner: {
        url: response.data.banner.url
      },
      author: response.data.autor,
      content: response.data.content
    }
  }
  return {
    props: {
      post
    },
    redirect: 60 * 30
  }
};
