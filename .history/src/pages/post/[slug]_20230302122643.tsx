import { GetStaticPaths, GetStaticProps } from 'next';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

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

export default function Post() {
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
    </div>
    </>
    
  )

}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient({});
//   const posts = await prismic.getByType(TODO);

//   // TODO
// };

// export const getStaticProps = async ({params }) => {
//   const prismic = getPrismicClient({});
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
