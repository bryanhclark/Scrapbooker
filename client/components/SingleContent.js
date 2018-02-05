import React, { Component } from 'react'
import CommentList from './CommentList'
import {mapToken} from '../../secrets'
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import {dmsConversion} from '../../utils/geoLatLong'


const Map = ReactMapboxGl({accessToken: mapToken});

const SingleContent = (props) => {
  let coords = dmsConversion(props.image.long, props.image.lat)
  console.log(coords)
  return (
    <div className='single-Content-Container'>
      <div className='single-Content-Header'>
        <h3>Single Content View</h3>
      </div>
      <div className='single-Content-Body'>
        <div id='single-Content-Image-Container'>
          <img src={props.image.src} alt={props.image.id} height='80%' width='60%' />
        </div>
        <div id='single-Content-Map-Container'>
          <Map
            center={coords}
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
            //These can be changed in accordance to the size of the container div
            height: "40vh",
            width: "40vw"
          }}>
          <Marker
            coordinates={coords}
            anchor="bottom"
            containerStyle={{
              width: '12px',
              height: '12px'
            }}
            >
            <img src={"http://www.clker.com/cliparts/I/l/L/S/W/9/map-marker-hi.png"}/>
          </Marker>
          </Map>
        </div>
      </div>
      <CommentList image={props.image} />
    </div>
  )
}


export default SingleContent
