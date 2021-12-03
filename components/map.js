import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { IcoLugaw } from './icons'
import Moment from 'react-moment'

const Map = (props) => {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_API
    const id = 'mapbox/light-v10'
    console.log(props);
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
                    <Moment className="text-pink-500" format="lll">{event.publishedAt}</Moment>
                    <div className="text-gray-700 text-base font-medium mb-1">{ event.title }</div>
                    <div>
                      <span>{event.author?.name}</span>
                      <span className="text-gray-500 italic"> (Coordinator)</span>
                    </div>
                  </Popup>
              </Marker>
          )
      })}
    </MapContainer>
  )
}

export default Map