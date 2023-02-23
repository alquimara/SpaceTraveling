//import { GetStaticProps } from 'next';

import Head from "next/head";
import Header from "../components/Header";
import { FiCalendar } from 'react-icons/fi'
import { FiUser } from 'react-icons/fi'

//import { getPrismicClient } from '../services/prismic';

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

export default function Home() {
return(
  <>
  <Header/>
  <Head>
    <title>Home | SpaceTraveling</title>
  </Head>
  <main>
    <div className={`${styles.post} ${commonStyles.maximumSize}`}>
      <a href="#" className={styles.postContainer}>
        <h1>
          Criando um app CRA do zero
        </h1>
        <p>
        Tudo sobre como criar a sua primeira aplicação utilizando Create React App
        </p>
        <div className={styles.info}>
          <div className={styles.details}>
            <FiCalendar />
            <time>12 de marco de 2023</time>
          </div>
          <div className={styles.details}>
            <FiUser />
            <span>Marcos Fernades</span>
          </div>

        </div>

      </a>
      <a href="#" className={styles.postContainer}>
        <h1>
          Criando um app CRA do zero
        </h1>
        <p>
        Tudo sobre como criar a sua primeira aplicação utilizando Create React App
        </p>
        <div className={styles.info}>
          <div className={styles.details}>
            <FiCalendar />
            <time>12 de marco de 2023</time>
          </div>
          <div className={styles.details}>
            <FiUser />
            <span>Marcos Fernades</span>
          </div>

        </div>

      </a>
      <a href="#" className={styles.carregarPost}>
        Carregar mais posts
      </a>
      
      </div>
     
  </main>
  </>

)
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient({});
//   // const postsResponse = await prismic.getByType(TODO);

//   // TODO
// };
