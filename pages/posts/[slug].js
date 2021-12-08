import { sanityClient, getClient } from '../../lib/sanity.server'
import { postSlugsQuery, postBySlugQuery, eventQuery} from '../../lib/queries'
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
import Moment from 'react-moment'
import { urlForImage, usePreviewSubscription } from '../../lib/sanity'
import {SITE_TITLE, SITE_URL} from '../../lib/constants'

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
    author = {
      name: ''
    },
    mainImage,
    publishedAt,
    description = '',
    body = []
  } = event

  return (
    <Layout preview={preview}>
        <Head>
          <title>{title} | {SITE_TITLE}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} key="ogTitle" />
          <meta property="og:description" content={description} key="ogDescription" />
          <meta property="og:url" content={`${SITE_URL}posts/${event.slug}`} key="ogurl" />
          {mainImage && (
          <meta property="og:image" content={urlForImage(mainImage).url()} key="ogImage" />
          )}
        </Head>
        <Container>
            <Header />
            {router.isFallback ? (
                <EventTitle>Loading…</EventTitle>
            ) : (
                <article className="max-w-2xl mx-auto my-16">
                    <div className="text-pink-500 text-lg"><Moment format="lll">{publishedAt}</Moment></div>
                    <h1 className={'text-3xl my-3'}>{title}</h1>
                    { author && (<span className={'text-gray-600 text-lg'}>By {author.name}</span>)}
                    {mainImage && (
                      <div className="bg-pink-200 p-2 my-5">
                        <div className="w-full h-96 relative filter drop-shadow-sm">
                        <Image
                            src={urlForImage(mainImage).url()}
                            alt="main image"
                            layout="fill" 
                            objectFit="contain"
                        />
                        </div>
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
    revalidate: 60,
  }
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(postSlugsQuery)
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  }
}

export default Post