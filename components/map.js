import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import MapMarker from './map-marker'
import MapGeoJson from '../public/assets/maps/barangays-municity-ph043411000.0.1.json'
import MapLegend from './map-legend'
import { useState } from 'react'
import {FilterButton} from './styled'

const Map = ({events, futureEvents}) => {

  const [markers, setMarkers] = useState(events);
  const [filter, setFilter] = useState(0);
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_API
  const id = 'mapbox/light-v10'
  const pinkOptions = { color: 'hotPink', opacity: 1, fillOpacity: 0.02, weight: 1 }

  return (
    <>
    <div className="flex gap-5 mb-5">
        <FilterButton active={filter === 0} onClick={() => {setMarkers(events); setFilter(0)}}>Show All</FilterButton>
        <FilterButton active={filter === 1} onClick={() => {setMarkers(futureEvents); setFilter(1)}}>Upcoming Only</FilterButton>
    </div>
    <div className="border border-pink-500 shadow-lg">
      <MapContainer 
          center={[14.171000903522813, 121.23059094560394]} 
          zoom={13} 
          scrollWheelZoom={false} 
          style={{height: 400, width: "100%"}}>
        <TileLayer
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          zoomOffset={-1}
          tileSize={512}
          url={`https://api.mapbox.com/styles/v1/${id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`}
        />
        { markers.map((event) => {
            return (
                <MapMarker event={event} key={event._id} />
            )
        })}
        <GeoJSON data={MapGeoJson} style={pinkOptions} />
      </MapContainer>
    </div>
    <MapLegend />
    </>
  )
}

export default Map