import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { IcoLugaw } from './icons'

const Map = (props) => {
    const accessToken = 'pk.eyJ1IjoiZ3JnMDIxIiwiYSI6ImNrd296ZTNpbTA3dTkyd3FvMHI1Y2llanYifQ.1I_iWVWjVcxV1C0yjwearg'
    const id = 'mapbox/streets-v11'
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