import MapLegend from './map-legend'
import { useState, useMemo } from 'react'
import {FilterButton} from './styled'
import MapLoading from './map-loading'
import dynamic from 'next/dynamic'

const Map = ({events, futureEvents}) => {
  const MapBox = useMemo(() => dynamic(
    () => import('../components/map-box'),
    { 
      loading: () => <MapLoading />,
      ssr: false
    }
  ), [/* list variables which should trigger a re-render here */])
  const [markers, setMarkers] = useState(events);
  const [filter, setFilter] = useState(0);

  return (
    <>
    <div className="flex gap-5 mb-5">
        <FilterButton active={filter === 0} onClick={() => {setMarkers(events); setFilter(0)}}>Show All</FilterButton>
        <FilterButton active={filter === 1} onClick={() => {setMarkers(futureEvents); setFilter(1)}}>Upcoming Only</FilterButton>
    </div>
    <MapBox markers={markers} />
    <MapLegend />
    </>
  )
}

export default Map