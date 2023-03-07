import styles from './header.module.scss';
import stylesCommon from '../../styles/common.module.scss'
import Link from 'next/link';


export default function Header() {
return(
  <header>
    <div className={`${styles.container} ${stylesCommon.maximumSize}`}>
      <Link href='/' legacyBehavior>
      <a>
        <img src='/image/logo.svg' alt='logo'/>
      </a>
      </Link>
    </div>
  </header>
)
}
