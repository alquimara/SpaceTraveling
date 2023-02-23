import styles from './header.module.scss';

export default function Header() {
return(
  <header>
    <div className={styles.container}>
      <a href="#">
        <img src='/image/logo.svg' alt='logo'/>
      </a>
    </div>
  </header>
)
}
