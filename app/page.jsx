'use client';

import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '@/lib/firebase';
import Link from 'next/link';
import styles from './page.module.css';

const PostCard = ({ id, title, content, date }) => (
  <Link href={`/post/${id}`} className={styles.cardLink}>
    <div className={styles.glow} />
    <div className={styles.card}>
      <div style={{ marginBottom: '1rem' }}>
        <h3 className={styles.cardTitle}>
          {title}
        </h3>
        <time className={styles.cardDate}>
          {new Date(date).toLocaleDateString('pt-BR', { dateStyle: 'long' })}
        </time>
      </div>
      <p className={styles.cardContent}>
        {content}
      </p>
      <div className={styles.readMore}>
        Ler mais <span className={styles.arrow}>→</span>
      </div>
    </div>
  </Link>
);

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, 'posts');
        const q = query(postsCollection, orderBy('createdAt', 'desc'));
        const postSnapshot = await getDocs(q);

        const postsList = postSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsList);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar posts: ', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Explorando <br/>
          <span className={styles.highlight}>Ideias & Códigos</span>
        </h1>
        <p className={styles.subtitle}>
          Um espaço minimalista para compartilhar aprendizados, tutoriais e pensamentos sobre tecnologia.
        </p>
      </section>

      {/* Posts Grid */}
      <section>
        {loading ? (
          <div className={styles.grid}>
             {/* Loading Skeleton Mockup */}
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ height: '16rem', borderRadius: '1rem', backgroundColor: 'rgba(255,255,255,0.05)' }} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>Nenhum post encontrado.</p>
            <Link href="/create" className={styles.createButton}>
              Criar o Primeiro Post
            </Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content || ''}
                date={post.createdAt?.toDate ? post.createdAt.toDate() : post.createdAt || new Date()}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
