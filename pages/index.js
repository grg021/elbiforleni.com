import React from 'react'
import { eventQuery } from '../lib/queries'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import Layout from '../components/layout'
import Head from 'next/head'
import Container from '../components/container'
import Moment from 'react-moment'
import Header from '../components/header'
import Link from 'next/link'
import Map from '../components/map'
import { urlForImage } from '../lib/sanity'
import Image from 'next/image'

function HomePage(props) {
  const { futureEvents = [], events = [], posts = [], preview } = props
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>elbi for Leni Robredo</title>
        </Head>
        <Container>
          <Header />
          <Map events={events} futureEvents={futureEvents} />
          <section className="my-4 shadow-inner p-10 bg-pink-50 rounded-sm">
            <div className="text-5xl text-center font-bold mb-5 text-leni-pink">Elbi4Leni-Kiko</div>
            <div className="text-center text-xl text-gray-600 my-10 max-w-2xl mx-auto ">The Elbi4Leni-Kiko group is composed of volunteers from Los Banos or with roots or connections with Los Banos. The vision of the group is to transform Los Banos into a Pink Town and ensure a landslide win for VP Leni Robredo and Sen. Kiko Pangilinan.</div>
            <div className="text-center">
              <Link href="/contact">
                <a className="uppercase focus:outline-none text-white py-2.5 px-5 rounded-md bg-pink-500 hover:bg-pink-600 hover:shadow-lg text-xl">Contact Us or Donate</a></Link>
            </div>
          </section>
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            <div className="bg-leni-blue text-white p-6 text-lg shadow-inner rounded-sm">
              <div className="uppercase opacity-80 text-3xl font-bold mb-4 mt-2">Upcoming Events</div>
              <div className="overflow-auto h-72">
              { 
                futureEvents.map((event, key) => {
                  return (
                  <div key={key} className="leading-relaxed mb-2">
                    <Moment className="text-pink-500" format="llll">{event.publishedAt}</Moment>
                    <div className="font-medium text-xl">{ event.title }</div>
                    <div>
                        <span className="">{event.author?.name}</span>
                        { event.author?.contact && <span className="text-gray-100 italic"> ({event.author?.contact})</span>}
                    </div>
                  </div>
                  )
                })
              }
              </div>
            </div>
            <div className="bg-leni-pink p-6 text-white text-lg shadow-inner rounded-sm">
              <div className="uppercase opacity-80 text-3xl font-bold mb-4 mt-2">Press Releases</div>
              <div className="overflow-auto h-72">
              { 
                posts.map((event, key) => {
                  return (
                  <div key={key} className="leading-relaxed mb-2">
                    <div className="flex">
                    {event.mainImage && (
                      <div className="mr-3 mt-2">
                        <div className="h-16 w-16 relative">
                        <Image
                          className="rounded-full shadow-inner"
                            src={urlForImage(event.mainImage).url()}
                            alt="main image"
                            layout="fill" 
                            objectFit="cover"
                        />
                        </div>
                        </div>
                    )}
                    <div>
                      <div className="text-base text-gray-100"><Moment className="" format="lll">{event.publishedAt}</Moment></div>
                      <div className="font-medium text-xl">
                        <Link href="/posts/[slug]" as={`/posts/${event.slug}`}>
                          <a className="underline hover:text-pink-100 tracking-wide">{ event.title }</a>
                        </Link>
                        </div>
                      <div className="text-base text-gray-100">
                          <span className="">by {event.author?.name}</span>
                      </div>
                    </div>
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