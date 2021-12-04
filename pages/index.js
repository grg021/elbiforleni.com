import React from 'react'
import dynamic from 'next/dynamic'
import { eventQuery } from '../lib/queries'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import Layout from '../components/layout'
import Head from 'next/head'
import Container from '../components/container'

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
              elbi for Leni
            </h1>
            <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
              A project to paint the town <span className="text-pink-500 font-medium">pink</span>.
            </h4>
          </section>
          <Map events={events} futureEvents={futureEvents} />
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