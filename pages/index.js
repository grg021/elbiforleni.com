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
import {SITE_TITLE} from '../lib/constants'
import moment from 'moment'
import { Highlight } from '../components/styled'
import tw from 'tailwind-styled-components'

const MidCard = tw.div`
  p-4 lg:p-6 text-gray-700 text-l lg:text-lg shadow-inner rounded-lg bg-white
`

const MidLink = tw.a`
  uppercase focus:outline-none text-white py-2.5 px-5 rounded-md bg-leni-blue hover:bg-blue-800 hover:shadow-lg text-sm xl:text-lg
`

function HomePage(props) {
  const { events = [], posts = [], preview } = props
  const futureEvents = events.filter(event => moment(event.publishedAt).isAfter())
  return (
    <>
      <Layout preview={preview} >
        <Head>
          <title>{SITE_TITLE}</title>
        </Head>
        <Container>
          <Header />
          <Map events={events} futureEvents={futureEvents}/>
          <section className="my-4 shadow-inner py-10 px-5 lg:px-10 rounded-lg" style={{backgroundImage: "linear-gradient(0deg,rgba(206,15,105,.75),rgba(206,15,105,.75)),url('/assets/donate/leni-solo.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}> 
            <div className="text-4xl lg:text-5xl text-center font-bold mb-5 text-white opacity-90">Welcome, KakamPink!</div>
            <div className="text-center text-l lg:text-xl text-white my-10 max-w-2xl mx-auto opacity-70">Ito ang ating <strong>&quot;Virtual Headquarters&quot;</strong> kung saan makikita ating <strong>&quot;Pink Activities&quot;</strong>. Layunin natin na maabot ang bawat sulok ng ating bayan para sa <strong>landslide</strong> na pagka-panalo ni VP Leni at Sen. Kiko. </div>
            <div className="text-center text-l lg:text-xl text-white my-10 max-w-2xl mx-auto opacity-80">Let&apos;s paint Los Baños PINK!</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MidCard>
                Ang iyong donasyon ay malaking tulong para maabot ng Elbi4Leni-Kiko volunteers ang iba&apos;t-ibang komunidad ng Los Baños.<br/><br/>  
                <div className='text-center'>
                  <Link href="/donate"><MidLink>Donate</MidLink></Link>
                </div>
              </MidCard>
              <MidCard>
                Kailangan pa natin ng mas maraming barangay volunteers at coordinators. <br/>Tara&apos;t palawakin pa ang ating hanay!<br/><br/>
                <div className='text-center'>
                  <MidLink 
                  href="https://forms.gle/hooYPbw4JoMPX5u69"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Volunteer</MidLink>
                </div>
               </MidCard>
               <MidCard>
                I-rehistro ang iyong activity (or mag-sumite ng activity proposal) para mabigyan ng full support ng Elbi4Leni-Kiko core team.<br/><br/>
                <div className='text-center'>
                <MidLink 
                  href="https://forms.gle/VL6m4aiwy7e6nbqC6"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Organize Activity</MidLink>
                </div>
              </MidCard>
            </div>
          </section>
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            <div className="bg-leni-blue text-white p-6 text-lg shadow-inner rounded-md">
              <div className="uppercase opacity-80 text-3xl font-bold mb-4 mt-2">Upcoming Events</div>
              <div className="overflow-auto h-72">
              { 
                futureEvents
                .map((event, key) => {
                  return (
                  <div key={key} className="leading-relaxed mb-4 opacity-80">
                    <Moment className="text-pink-500" format="llll">{event.publishedAt}</Moment>
                    <div className="font-medium text-xl">{ event.title }</div>
                    <div>
                        <span className="font-small text-sm">Contact: {event.author?.name}</span>
                        { event.author?.contact && <span className="font-small text-sm"> ({event.author?.contact})</span>}
                    </div>
                    <div className="font-small text-sm">{event.exactLocation && <div>at {event.exactLocation}</div>}</div>
                  </div>
                  )
                })
              }
              </div>
            </div>
            <div className="bg-leni-pink p-6 text-white text-lg shadow-inner rounded-md">
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
                    <div className="mb-2">
                      <div className="font-medium text-lg text-gray-300 opacity-90">
                        <Link href="/posts/[slug]" as={`/posts/${event.slug}`}>
                          <a className="underline hover:text-pink-100 tracking-wide">{ event.title }</a>
                        </Link>
                      </div>
                      <div className="font-small text-sm text-gray-300"><Moment className="" format="lll">{event.publishedAt}</Moment></div>
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