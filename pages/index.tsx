import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { client } from '../libs/client';
import Link from 'next/link';

type ArticleData = {
  id: string,
  createdAt: string,
  updatedAt: string,
  publishedAt: string,
  revisedAt: string,
  title: string,
  body: string,
  category: string[],
  thumbnail: {
    url: string,
    height: number,
    width: number
  },
}

type BlogDataProps = {
  contents: ArticleData[],
  totalCount: number,
  offset: number,
  limit: number
}

// SSG
export const getStaticProps = async() => {
  const data = await client.get({
    endpoint: 'blog',
  });

  console.log(data.contents[0].thumbnail)

  return {
    props: {
      blog: data
    }
  }
}

export default function Home({ blog }) {
  return (
    <div className={styles.container}>
      {blog.contents.map((article: ArticleData) => {
        return (
          <li key={article.id}>
            <Link href={`blog/${article.id}`}>
              <img src={article.thumbnail.url} alt="" />
              <div>{article.title}</div>
            </Link>
          </li>
        )
      })}
    </div>
  )
}
