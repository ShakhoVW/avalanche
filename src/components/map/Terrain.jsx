// Dependencies
import React from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

// Styles
import './Terrain.scss';

class Terrain extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 49.44252,
      lng: -114.6933,
      zoom: 3,
      data: [
        {
          latlng: [
            49.44252,
            -114.6933
          ],
          datetime: "2017-03-29T22:58:00.000Z",
          title: "Supportive Sledding",
          user: "Megan Kelly",
        },
        {
          latlng: [
            49.38365792845799,
            -122.94119596481323
          ],
          datetime: "2017-03-29T18:00:00-07:00",
          title: "auto: Quick Report",
          user: "cahorte",
        }
      ],
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          url='http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
          attribution=''
        />
        {this.state.data.map((dot) => {
        return <Marker position={dot.latlng}>
          <Popup>
            <span>{dot.title} <br/>{dot.user} </span>
          </Popup>
        </Marker>
        })}
      </Map>
    );
  }
}

export default Terrain;