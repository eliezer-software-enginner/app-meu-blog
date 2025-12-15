import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; {new Date().getFullYear()} Meu Blog Pessoal. Built with Next.js & CSS Modules.</p>
      </div>
    </footer>
  );
}
