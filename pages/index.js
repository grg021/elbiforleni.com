import React from 'react'
import dynamic from 'next/dynamic'
import { indexQuery } from '../lib/queries'
import { getClient, overlayDrafts } from '../lib/sanity.server'

function HomePage(props) {
    const { events = [] } = props
  const Map = React.useMemo(() => dynamic(
    () => import('../components/map'), // replace '@components/map' with your component's location
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false // This line is important. It's what prevents server-side render
    }
  ), [/* list variables which should trigger a re-render here */])
  return <Map events={events} />
}

export async function getStaticProps() {
    const preview = false;
    const events = overlayDrafts(await getClient(preview).fetch(indexQuery))
    return {
        props: { events },
    }
}

export default HomePage