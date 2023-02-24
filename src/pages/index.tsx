//import { GetStaticProps } from 'next';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Head from "next/head";
import Header from "../components/Header";
import { FiCalendar } from 'react-icons/fi'
import { FiUser } from 'react-icons/fi'
import Prismic from '@prismicio/client'
import { getPrismicClient } from '../services/prismic';
import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';


interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home(postPagination: PostPagination) {
  console.log(postPagination)

  const posts = postPagination.results
return(
  <>
  <Header/>
  <Head>
    <title>Home | SpaceTraveling</title>
  </Head>
  <main>
    <div className={`${styles.post} ${commonStyles.maximumSize}`}>
      {posts?.map((post) =>(
        <a href="#" className={styles.postContainer} key={post.uid}>
        <h1>
          {post.data.title}
        </h1>
        <p>
        {post.data.subtitle}
        </p>
        <div className={styles.info}>
          <div className={styles.details}>
            <FiCalendar />
            <time>{post.first_publication_date}</time>
          </div>
          <div className={styles.details}>
            <FiUser />
            <span>{post.data.author}</span>
          </div>
        </div>
      </a>
      ))}
      
      </div>
  </main>
  </>

)
}

export const getStaticProps = async () => {
  
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('posts',{
  pageSize:20
  })
  
  const posts = postsResponse.results.map(post =>
    {
      return{
        uid:post.uid,
        first_publication_date:format(new Date(post.first_publication_date), 'dd MMM yyyy',{locale: ptBR}),
        data:{
          title:post.data.title,
          subtitle:post.data.subtitle,
          author:post.data.autor,
        }
      }
    })
    console.log(posts)

    const postsPagination = {
      next_page:postsResponse.next_page,
      results:posts
    }
  return {
    props:
      postsPagination
  }
};
