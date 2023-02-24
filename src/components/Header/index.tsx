import styles from './header.module.scss';
import stylesCommon from '../../styles/common.module.scss'


export default function Header() {
return(
  <header>
    <div className={`${styles.container} ${stylesCommon.maximumSize}`}>
      <a href="#">
        <img src='/image/logo.svg' alt='logo'/>
      </a>
    </div>
  </header>
)
}
