import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import { Head } from 'next/document';
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

export default function Post(post:Post) {
  return(
    <>
    <Head>
    <title>jhjhjh | SpaceTraveling</title>
  </Head>
  <main>

    <article>
    <img  className={styles.banner} src="/image/banner.svg" alt='banner'/>
    <div className={`${commonStyles.maximumSize} ${styles.container} `}>
      <h1>dasdasdasd</h1>
      <div className={commonStyles.info}>
        <div className={commonStyles.details}>
          <FiCalendar />
          <time>12 marc 2023</time>
        </div>
        <div className={commonStyles.details}>
          <FiUser />
          <time>Marcos Nanini</time>
        </div>
        <div className={commonStyles.details}>
          <FiClock />
          <time>4 min</time>
        </div>
    </div>
    <div className={styles.content}>
      <h2>Proin et varius</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Nullam dolor sapien, vulputate eu diam at, condimentum hendrerit tellus. Nam facilisis sodales felis, pharetra pharetra lectus auctor sed.

        Ut venenatis mauris vel libero pretium, et pretium ligula faucibu</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Nullam dolor sapien, vulputate eu diam at, condimentum hendrerit tellus. Nam facilisis sodales felis, pharetra pharetra lectus auctor sed.

        Ut venenatis mauris vel libero pretium, et pretium ligula faucibu</p>

    </div>
    <div className={styles.content}>
      <h2>Proin et varius</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Nullam dolor sapien, vulputate eu diam at, condimentum hendrerit tellus. Nam facilisis sodales felis, pharetra pharetra lectus auctor sed.

        Ut venenatis mauris vel libero pretium, et pretium ligula faucibu</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Nullam dolor sapien, vulputate eu diam at, condimentum hendrerit tellus. Nam facilisis sodales felis, pharetra pharetra lectus auctor sed.

        Ut venenatis mauris vel libero pretium, et pretium ligula faucibu</p>

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
  console.log(JSON.stringify(response,null,2))
  

  const post = {
    uid:slug,
    first_publication_date:format(new Date(response.first_publication_date), 'dd MMM yyyy',{locale: ptBR}),
    data:{
      title:response.data.title,
      banner:{
        url:response.data.banner.url
      },
      author:response.data.autor,
      content:{
      heading:response.data.heading,
      body:{
        text:RichText.asText(response.data.content.body.text)
      }
    }
  }
}
console.log(post)
return{
  props:{
    post
    
  }
}
};
