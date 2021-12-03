import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { IcoLugaw } from './icons'

const Map = (props) => {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_API
    const id = 'mapbox/light-v10'
    const { events = [] } = props
  return (
    <MapContainer 
        center={[14.171000903522813, 121.23059094560394]} 
        zoom={14} 
        scrollWheelZoom={false} 
        style={{height: 400, width: "100%"}}>
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        zoomOffset={-1}
        tileSize={512}
        url={`https://api.mapbox.com/styles/v1/${id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`}
      />
      { events.map((event) => {
          return (
              <Marker key={event._id} position={[event.location.lat, event.location.lng]} 
              icon={IcoLugaw}
              >
                  <Popup>
                      { event.title } - { event.publishedAt }
                  </Popup>
              </Marker>
          )
      })}
    </MapContainer>
  )
}

export default Map