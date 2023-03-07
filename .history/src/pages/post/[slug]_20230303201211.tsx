import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { getPrismicClient } from '../../services/prismic';

//import { getPrismicClient } from '../../services/prismic';

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

export default function Post(post: PostProps) {
  return(
    <>
    <img  className={styles.banner} src="/image/banner.svg" alt='banner'/>
    <div className={`${commonStyles.maximumSize} ${styles.container} `}>
      <h1>Criando um app CRA do zero</h1>
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
    </>
    
  )

}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient({});
//   const posts = await prismic.getByType(TODO);

//   // TODO
// };

export const getStaticProps = async ({params }) => {
  const prismic = getPrismicClient({});
  const{slug} = params;
  const response = await prismic.getByUID('posts',String(slug),{});
  console.log(response)
  const post = {
    uid:slug,
    first_publication_date:format(new Date(RichText.asText(response.first_publication_date)), 'dd MMM yyyy',{locale: ptBR}),
    data:{
      title:RichText.asText(response.data.title),
      author:RichText.asText(response.data.author)
      },
    content:{
      heading:RichText.asHtml(response.content.heading),
      body:{
        text:RichText.asText(response.data.content[0].body[0].text)
      }
    }
  }
  return{
    props:{
      post
    }
  }

  // TODO
};
