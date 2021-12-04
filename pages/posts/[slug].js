import { sanityClient, getClient } from '../../lib/sanity.server'
import { postSlugsQuery, postBySlugQuery, eventQuery} from '../../lib/queries'
import {usePreviewSubscription} from '../../lib/sanity'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import EventTitle from '../../components/event-title'
import Layout from '../../components/layout'
import Container from '../../components/container'
import Header from '../../components/header'
import Head from 'next/head'
import BlockContent from '@sanity/block-content-to-react'
import client from '../../client'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import Moment from 'react-moment'
import post from '../../schemas/post'

function urlFor (source) {
    return imageUrlBuilder(client).image(source)
  }

const Post = ({ data = {}, preview }) => {

  const router = useRouter()

  const slug = data?.event?.slug

  const {
    data: { event },
  } = usePreviewSubscription(eventQuery, {
    params: { slug },
    initialData: data,
    enabled: preview && slug,
  })

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  const {
    title = 'Missing title',
    mainImage,
    body = []
  } = event

  return (
    <Layout preview={preview}>
        <Head>
          <title>{event.title} | elbi for Leni Robredo</title>
        </Head>
        <Container>
            <Header />
            {router.isFallback ? (
                <EventTitle>Loading…</EventTitle>
            ) : (
                <article className="max-w-2xl mx-auto my-16">
                    <div className="text-pink-500 text-lg"><Moment format="lll">{post.publishedAt}</Moment></div>
                    <h1 className={'text-3xl my-3'}>{event.title}</h1>
                    <span className={'text-gray-400 text-lg'}>By {event.author.name}</span>
                    {mainImage && (
                        <div className="bg-pink-200 p-2 my-5">
                        <img
                            src={urlFor(mainImage)
                            .url()}
                            alt="main image"
                        />
                        </div>
                    )}
                    <BlockContent
                        className="leading-loose text-xl"
                        blocks={body}
                        imageOptions={{ w: 320, h: 240, fit: 'max' }}
                        {...client.config()}
                    />
                </article>
            )}
        </Container>
    </Layout>
  
  )
}

export async function getStaticProps({ params, preview = false }) {
  const event = await getClient(preview).fetch(postBySlugQuery, {
    slug: params.slug,
  })

  return {
    props: {
      preview,
      data: {
        event
      },
    },
  }
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(postSlugsQuery)
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  }
}

export default Post