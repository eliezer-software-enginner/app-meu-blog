// /app/post/[id]/page.jsx
'use client';

import { doc, getDoc } from 'firebase/firestore';
import { use, useEffect, useState } from 'react';

import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { db } from '../../../lib/firebase';
import styles from './page.module.css';

export default function PostPage({ params }) {
  const { id } = use(params);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error('Erro ao buscar post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Carregando post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={styles.error}>
        <h1 className={styles.errorTitle}>Post não encontrado</h1>
        <p>O conteúdo que você procura não existe ou foi removido.</p>
        <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
          ← Voltar para Home
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Link 
        href="/" 
        className={styles.backLink}
      >
        <span className={styles.arrow}>←</span> 
        Voltar para Home
      </Link>
      
      <article>
        <header className={styles.header}>
          <time className={styles.date}>
            {post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString('pt-BR', { dateStyle: 'long' }) : 'Data desconhecida'}
          </time>
          <h1 className={styles.title}>
            {post.title}
          </h1>
        </header>
        
        <div className={styles.content}>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
