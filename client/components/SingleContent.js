import React, { Component } from 'react'
import CommentList from './CommentList'
import {mapToken} from '../../secrets'
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";

const Map = ReactMapboxGl({accessToken: mapToken});

const SingleContent = (props) => {
  return (
    <div className='single-Content-Container'>
      <div className='single-Content-Header'>
        <h3>Single Content View</h3>
      </div>
      <div className='single-Content-Body'>
        <img src={props.image.src} alt={props.image.id} height='80%' width='60%' />
      </div>
      <div>
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
        height: "30vh",
        width: "30vw"
      }}>
      <Marker
        coordinates={[-0.2416815, 51.5285582]}
        anchor="bottom">
        <img src={"http://www.clker.com/cliparts/I/l/L/S/W/9/map-marker-hi.png"}/>
      </Marker>
        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "marker-15" }}>
        <Feature coordinates={[-0.241747846041145, 51.3233379650232]}/>
        </Layer>
      </Map>
      </div>
      <CommentList image={props.image} />
    </div>
  )
}


export default SingleContent
