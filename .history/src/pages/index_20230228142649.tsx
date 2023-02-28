
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
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import { el } from 'date-fns/locale';


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

  const[nextPage,setNextPage] = useState(postPagination.next_page);
  const[posts,setPosts]=useState(postPagination.results)
  

  // useEffect(()=>{
  //   fetch(postPagination.next_page).then(result => result.json()).then(data => setNextPage(data))
  // },[])

  async function nextPagePost(){
    
     const responseNextPage = await fetch(nextPage).then(result => result.json()).then(data => data)

      const nextPost = responseNextPage.results.map(postnext =>
        {
          return{
            uid:postnext.uid,
            first_publication_date:format(new Date(postnext.first_publication_date), 'dd MMM yyyy',{locale: ptBR}),
            data:{
              title:postnext.data.title,
              subtitle:postnext.data.subtitle,
              author:postnext.data.autor,
            }
          }
        })
        setPosts([...posts,...nextPost])
        
  

  }
return(
  <>
  <Head>
    <title>Home | SpaceTraveling</title>
  </Head>
  <main>
    <div className={`${styles.post} ${commonStyles.maximumSize}`}>
      {posts.map((post) =>(
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
      <a href='#' onClick={nextPagePost} className={styles.carregarPost}>Carregar mais post</a>
  
      </div>
  </main>
  </>

)
}
export const getStaticProps:GetStaticProps = async () => {
  
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('posts',{
  pageSize:2
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
  
    const postsPagination = {
      next_page:postsResponse.next_page,
      results:posts
    }

  return {
    props:
      postsPagination
  }
}
function data(value: any) {
  throw new Error('Function not implemented.');
}

