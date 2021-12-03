import { Marker, Popup } from 'react-leaflet'
import { IcoLugaw, IcoCafe, IcoCar } from './icons'
import Moment from 'react-moment'

const MapMarker = (props) => {
    const {event} = props;
    let icon;

    switch(event.category.title) {
        case 'Caravan':
            icon = IcoCar;
            break;
        case 'Kapihan':
        case 'Free Taho':
            icon = IcoCafe;
            break;
        default:
            icon = IcoLugaw;
    }
    return (
        <Marker key={event._id} position={[event.location.lat, event.location.lng]} 
              icon={icon}
              >
                  <Popup>
                    <Moment className="text-pink-500" calendar>{event.publishedAt}</Moment>
                    <div className="text-gray-700 text-base font-medium mb-1">{ event.title }</div>
                    <div>
                      <span>{event.author?.name}</span>
                      <span className="text-gray-500 italic"> (Coordinator)</span>
                    </div>
                  </Popup>
              </Marker>
    )
}

export default MapMarker;