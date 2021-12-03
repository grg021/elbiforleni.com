import React from 'react'
import dynamic from 'next/dynamic'
import { indexQuery } from '../lib/queries'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import Layout from '../components/layout'
import Head from 'next/head'
import Container from '../components/container'

function HomePage(props) {
    const { events = [], preview } = props
  const Map = React.useMemo(() => dynamic(
    () => import('../components/map'), // replace '@components/map' with your component's location
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false // This line is important. It's what prevents server-side render
    }
  ), [/* list variables which should trigger a re-render here */])
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>elbiforleni</title>
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
        <div className="filter drop-shadow-lg">
          <Map events={events} />
        </div>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
    const events = overlayDrafts(await getClient(preview).fetch(indexQuery))
    return {
        props: { events },
    }
}

export default HomePage