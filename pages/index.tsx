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

      <div className="bg-gray-200 border-y border-black py-10 lg:py-0">
        <div className="flex justify-between items-center lg:mx-10">
          <div className="px-10 space-y-5">
            <h1 className="text-6xl max-w-xl font-serif"><span className="underline decoration-black decoration-4">Cordoba Bitcoin</span> es la comunidad cripto más grande del interior de Argentina.</h1>
            <h2>Puedes unirte a nuestros eventos, debates y clases abiertas cuando quieras.</h2>
          </div>
          <img className="hidden md:inline-flex h-48 pr-10 lg:my-20" src="./bitcoin.png" alt="" />
        </div>
      </div>

      {/* Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts.map(post => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="border rounded-lg group cursor-pointer overflow-hidden">
              <div className="overflow-hidden"><img className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out" src={urlFor(post.mainImage).url()} alt="" /></div>
              <div className="flex justify-between items-center p-5">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-xs">{post.description}<span className="text-yellow-600"> by {post.author.name}.</span></p>
                </div>
                <img className="h-12 w-12 rounded-full"src={urlFor(post.author.image).url()!} alt="" />
              </div>
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