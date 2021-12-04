import React from 'react'
import dynamic from 'next/dynamic'
import { eventQuery } from '../lib/queries'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import Layout from '../components/layout'
import Head from 'next/head'
import Container from '../components/container'
import Moment from 'react-moment'

function HomePage(props) {
  const { futureEvents = [], events = [], preview } = props
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
          <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
            <h1 className="text-pink-500 text-5xl md:text-7xl font-bold tracking-tighter leading-tight md:pr-8">
              elbi for Leni &amp; <span className="text-white bg-pink-500 px-3">Kiko</span>
            </h1>
            <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
              A project to paint the town <span className="text-pink-500 font-medium">pink</span>.
            </h4>
          </section>
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
            <div className="bg-leni-pink p-4 text-white">
              <div className="uppercase opacity-80 text-3xl font-bold mb-4 mt-2">Press Release</div>
            </div>
          </section>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const { events, futureEvents } = await getClient(preview).fetch(eventQuery)
  return {
      props: { 
        events: overlayDrafts(events), 
        futureEvents: overlayDrafts(futureEvents) 
      },
      revalidate: 60,
  }
}

export default HomePage