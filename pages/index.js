import React from 'react'
import dynamic from 'next/dynamic'
import { indexQuery } from '../lib/queries'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import Layout from '../components/layout'
import Head from 'next/head'
import Container from '../components/container'
import Image from 'next/image'

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
        <div className="filter drop-shadow-lg">
          <Map events={events} />
        </div>
        <div className={'flex flex-col my-8 gap-x-5 max-w-3xl mx-auto sm:flex-row gap-y-5'}>
          <div className={'p-2 bg-pink-50 flex items-center rounded-md'}>
            <span className="w-10 text-center"><Image src="/assets/icons/marker-lugaw.png" alt="lugaw icon" width="32" height="35" /></span>
            <span className="ml-2">PalugawNiLeni</span>
          </div>
          <div className={'p-2 bg-pink-50 flex items-center rounded-md'}>
          <span className="w-10 text-center"><Image src="/assets/icons/cafe-icon.png" alt="lugaw icon" width="35" height="35" /></span>
            <span className="ml-2">FreeTahoNiLeni / FreeKapeNiLeni</span>
          </div>
          <div className={'p-2 bg-pink-50 flex items-center rounded-md'}>
            <span className="w-10 text-center"><Image src="/assets/icons/car-icon.png" alt="lugaw icon" width="23" height="35" /></span>
            <span className="ml-2">Leni-Kiko Caravan</span>
          </div>
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
        revalidate: 60,
    }
}

export default HomePage