import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import Head from 'next/head';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { getPrismicClient } from '../../services/prismic';
import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

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

export default function Post({post}:PostProps) {
  return(
    <>
    <Head>
    <title>{post.data.title} | SpaceTraveling</title>
  </Head>
  <main>

    <article>
    <img  className={styles.banner} src="/image/banner.svg" alt='banner'/>
    <div className={`${commonStyles.maximumSize} ${styles.container} `}>
      <h1>{post.data.title}</h1>
      <div className={commonStyles.info}>
        <div className={commonStyles.details}>
          <FiCalendar />
          <time>{post.first_publication_date}</time>
        </div>
        <div className={commonStyles.details}>
          <FiUser />
          <time>{post.data.author}</time>
        </div>
        <div className={commonStyles.details}>
          <FiClock />
          <time>4 min</time>
        </div>
    </div>
    <div className={styles.content}>
      {post.data.content.map((cont =>(
        <>
         <h2>{cont.heading}</h2>
         {cont.body.map((bo =>(
          <p>{bo.text}</p>
         )))}
         
         </>
      )
      ))}
    </div>
    
    </div>
    </article>
    </main>

    </>
    
  )

}

export const getStaticPaths = async () => {

  const prismic = getPrismicClient({});
  const posts = await prismic.getByType('posts');
  return{
    paths:[{params:{slug:posts.results[0].uid}},{params:{slug:posts.results[1].uid}},{params:{slug:posts.results[2].uid}}],
    fallback:true
  }

};

export const getStaticProps = async ({params}) => {
  const prismic = getPrismicClient({});
  const {slug} = params;
  const response = await prismic.getByUID('posts',String(slug),{});


  const post = {
    uid:slug,
    first_publication_date:format(new Date(response.first_publication_date), 'dd MMM yyyy',{locale: ptBR}),
    data:{
      title:response.data.title,
      banner:{
        url:response.data.banner.url
      },
      author:response.data.autor,
      content: response.data.content
  }
}

return{
  props:{
    post
  }
}
};
