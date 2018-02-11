import React, { Component } from 'react'
import CommentList from './CommentList'
import { mapToken } from '../../secrets'

const SingleContent = (props) => {
  return (
    <div className='single-Content-Container'>
      <div className='single-Content-Header'>
        <h3>Single Content View</h3>
      </div>
      <div className='single-Content-Body'>
        <div id='single-Content-Image-Container'>
          <img src={props.image.src} alt={props.image.id} height='80%' width='60%' />
        </div>
      </div>
      <CommentList image={props.image} />
    </div>
  )
}


export default SingleContent
