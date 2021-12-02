import React from 'react'
import dynamic from 'next/dynamic'
import groq from 'groq'
import client from '../client'

function HomePage(props) {
    const { events = [] } = props
    console.log('=> homepage', events)
  const Map = React.useMemo(() => dynamic(
    () => import('../components/map'), // replace '@components/map' with your component's location
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false // This line is important. It's what prevents server-side render
    }
  ), [/* list variables which should trigger a re-render here */])
  return <Map events={events} />
}

HomePage.getInitialProps = async () => ({
    events: await client.fetch(groq`
      *[_type == "event" && publishedAt < now()]|order(publishedAt desc)
    `)
  })

export default HomePage