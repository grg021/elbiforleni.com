import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import MapMarker from './map-marker'
import MapGeoJson from '../public/assets/maps/barangays-municity-ph043411000.0.1.json'
import 'leaflet/dist/leaflet.css'

const MapBox = ({markers}) => {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_API
    const id = 'mapbox/light-v10'
    const pinkOptions = { color: 'hotPink', opacity: 1, fillOpacity: 0.02, weight: 1 }
    return (
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
    )
}

export default MapBox;