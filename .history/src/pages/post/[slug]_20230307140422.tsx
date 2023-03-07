import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import Head from 'next/head';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { getPrismicClient } from '../../services/prismic';
import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { useState } from 'react';

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
  const[tempoLeitura,setTempoLeitura] = useState(0)
const he = post.data.content.map((conetn =>{
  return conetn.body
}))

const qtdPalvrasContent = post.data.content.reduce((acc,item)=>{
  const heading = item.heading.trim().split(' ').length
  const body = item.body.reduce((result,bo)=>{
    return result += bo.text.trim().split(' ').length
  },0)

  

  return acc +=body + heading

},0)
const qtdPalvrasTitle = post.data.title.trim().split(' ').length
console.log(qtdPalvrasTitle)

const somaTempoLeitura = qtdPalvrasContent/200

console.log(somaTempoLeitura)





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
    {post.data.content.map((cont=>(
      <div className={styles.content}>
        <h2>{cont.heading}</h2>
        {cont.body.map(bod =>(
          <p>{bod.text}</p>
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
  const paths = posts.results.map((post =>{
    return {
      params: {
        slug: post.uid
      }
    }
  }))
  return{
    paths:paths,
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
