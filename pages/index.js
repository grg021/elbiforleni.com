import React from 'react'
import dynamic from 'next/dynamic'
import { eventQuery } from '../lib/queries'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import Layout from '../components/layout'
import Head from 'next/head'
import Container from '../components/container'
import Moment from 'react-moment'
import Header from '../components/header'
import Link from 'next/link'

function HomePage(props) {
  const { futureEvents = [], events = [], posts = [], preview } = props
  const Map = React.useMemo(() => dynamic(
    () => import('../components/map'),
    { 
      loading: () => <p>Map is loading</p>,
      ssr: false
    }
  ), [/* list variables which should trigger a re-render here */])
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>elbi for Leni Robredo</title>
        </Head>
        <Container>
          <Header />
          <Map events={events} futureEvents={futureEvents} />
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            <div className="bg-leni-blue text-white p-6 text-lg">
              <div className="uppercase opacity-80 text-3xl font-bold mb-4 mt-2">Events</div>
              <div className="overflow-auto h-72">
              { 
                futureEvents.map((event, key) => {
                  return (
                  <div key={key} className="leading-relaxed mb-2">
                    <Moment className="text-pink-500" calendar>{event.publishedAt}</Moment>
                    <div className="font-medium text-xl">{ event.title }</div>
                    <div>
                        <span className="">{event.author?.name}</span>
                        <span className="text-gray-100 italic text-sm"> (Coordinator)</span>
                    </div>
                  </div>
                  )
                })
              }
              </div>
            </div>
            <div className="bg-leni-pink p-6 text-white text-lg">
              <div className="uppercase opacity-80 text-3xl font-bold mb-4 mt-2">Press Release</div>
              <div className="overflow-auto h-72">
              { 
                posts.map((event, key) => {
                  return (
                  <div key={key} className="leading-relaxed mb-2">
                    <Moment className="" format="lll">{event.publishedAt}</Moment>
                    <div className="font-medium text-xl">
                      <Link href="/posts/[slug]" as={`/posts/${event.slug}`}>
                        <a>{ event.title }</a>
                      </Link>
                      </div>
                    <div>
                        <span className="">{event.author?.name}</span>
                        <span className="text-gray-100 italic text-sm"> (Coordinator)</span>
                    </div>
                  </div>
                  )
                })
              }
              </div>
            </div>
          </section>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const { events, futureEvents, posts } = await getClient(preview).fetch(eventQuery)
  return {
      props: { 
        events: overlayDrafts(events), 
        futureEvents: overlayDrafts(futureEvents),
        posts: overlayDrafts(posts) 
      },
      revalidate: 60,
  }
}

export default HomePage