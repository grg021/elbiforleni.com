import { sanityClient, getClient } from '../../lib/sanity.server'
import {eventSlugsQuery, eventBySlugQuery, eventQuery} from '../../lib/queries'
import {usePreviewSubscription} from '../../lib/sanity'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import EventTitle from '../../components/event-title'
import Layout from '../../components/layout'
import Container from '../../components/container'
import Header from '../../components/header'

const Event = ({ data = {}, preview }) => {

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

  return (
    <Layout preview={preview}>
    <Container>
      <Header />
      {router.isFallback ? (
        <EventTitle>Loading…</EventTitle>
      ) : (
        <article>
          <h1 className={'text-3xl'}>{event.title}</h1>
          <span className={'text-sm text-gray-400'}>By {event.name}</span>
        </article>
      )}
    </Container>
    </Layout>
  
  )
}

export async function getStaticProps({ params, preview = false }) {
  const event = await getClient(preview).fetch(eventBySlugQuery, {
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
  const paths = await sanityClient.fetch(eventSlugsQuery)
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  }
}

export default Event