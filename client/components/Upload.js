import React, { Component } from 'react'
import { withRouter, Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import { config } from '../../secrets'
import {uploadImageSocket} from '../socket'
import EXIF from 'exif-js'

class Upload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            img: ''
        }
    }

    render() {
        return (
            <div className='uploadContainer'>
                <h3>Upload Photo</h3>
                <input type='file' accept='image/*' onChange={this.props.handleUpload} />
                <div className='uploadImgContainer'>
                    <img id='uploadImgPreview' src={this.props.pictures[0]} alt='picture' height='400px' width='200px' />
                </div>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        pictures: state.pictures || ''
    }
}


const mapDispatch = (dispatch) => {
    return {
        handleUpload(event) {
            let image = event.target.files[0]
            firebaseUpload(image)
            .then(response => {
               return imageEXIFPacker(image, response)
            })
            .then(imgObj => {
              console.log(imgObj)
            })
        }
    }
}

function imageEXIFPacker(image, url) {
  let imgObj = {};
  EXIF.getData(image, function() {
      imgObj.timeCreated = image.lastModifiedDate.toString()
      imgObj.orientation = EXIF.getTag(this, "Orientation")
      imgObj.width = EXIF.getTag(this, "PixelXDimension")
      imgObj.height = EXIF.getTag(this, "PixelYDimension")
      imgObj.src = url
  })
  return imgObj
}

export default connect(mapState, mapDispatch)(Upload)

function firebaseUpload(image) {
  const downloadURL = firebase.storage().ref(`images`).child(image.name).put(image)
  .then((response) => {
      return response.downloadURL
  })
  return downloadURL
}
