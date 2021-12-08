import { Marker, Popup } from 'react-leaflet'
import { IcoLugaw, IcoCafe, IcoCar } from './icons'
import Moment from 'react-moment'
import * as ga from '../lib/ga'
import Link from 'next/link'
import moment from 'moment'

const MapMarker = (props) => {
    const {event} = props;
    let icon;

    const markerClickHandler = (e) => {
        ga.event({
          action: "marker_click",
          params : {
            event: event
          }
        })
      }

    switch(event.category?.title) {
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
        <Marker 
            eventHandlers={{
                click: markerClickHandler
            }}
            key={event._id} 
            position={[event.location.lat, event.location.lng]} 
            icon={icon}>
            <Popup>
                <div className="text-base leading-relaxed">
                <Moment className="text-pink-500" format="llll">{event.publishedAt}</Moment>
                <div className="text-gray-700 font-medium text-lg">{ event.title }</div>
                <div>
                    <div className="">{event.author?.name}
                    {event.author?.contact && <span className="text-gray-500 italic"> ({event.author?.contact})</span>}
                    </div>
                    {event.exactLocation && <div>📍 {event.exactLocation}</div>}
                    {event.preEventUrl && moment(event.publishedAt).isAfter() && <div className="underline"><Link href={event.preEventUrl}>Press Release</Link></div>}
                    {event.postEventUrl && moment(event.publishedAt).isBefore() && <div className="underline"><Link href={event.postEventUrl}>Post Event</Link></div>}
                </div>
                </div>
            </Popup>
        </Marker>
    )
}

export default MapMarker;