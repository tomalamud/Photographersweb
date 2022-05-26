import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import Header from '../components/Header'
import { sanityClient, urlFor } from '../sanity';
import { Post } from '../typings'

interface Props {
  posts: [Post];
}

const Home = ({ posts }: Props) => {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Cordoba Bitcoin</title>
        <link rel="icon" href="/bitcoin.png" />
      </Head>

      <Header />

      {/* Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts.map(post => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="border group cursor-pointer overflow-hidden">
            {/* group-hover:scale-105 transition-transform duration-200 ease-in-out */}
              <div className="overflow-hidden"><img className="h-60 w-full object-cover" src={urlFor(post.mainImage).url()} alt="" /></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home;

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    slug,
    author -> {
      name,
      image
  },
    description,
    mainImage,
    slug
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    }
  }
}