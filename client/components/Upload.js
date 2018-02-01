import React, { Component } from 'react'
import { withRouter, Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import { config } from '../../secrets'
import { uploadImageSocket } from '../socket'
import EXIF from 'exif-js'
import { postContent } from '../store/content'


class Upload extends Component {
	constructor(props) {
		super(props)
		this.state = {
			img: ''
		}
		this.fileInput = {}
	}


	render() {

		return (
			<div className='uploadContainer'>
				<h3>Upload Photo</h3>
				<input type='file' accept='image/*;capture=camera' id='imageToUpload' onChange={(e) => this.fileInput = e.target.files[0]} />
				<button onClick={() => this.props.handleImgUpload(this.fileInput, this.props.match.params.eventId)}>Upload Image</button>
				<div className='uploadImgContainer'>
				</div>
			</div>
		)

		image.addEventListener('change', console.log('image uploaded'))
	}
}

const mapState = (state) => {
	return {
		singleEvent: state.singleEvent
	}
}


const mapDispatch = (dispatch, ownProps) => {
	return {
		handleImgUpload(image, eventId) {
			console.log('in handleIMageUpload')
			console.log(image)
			firebaseUpload(image)
				.then(response => {
					return imageEXIFPacker(image, response, ownProps.match.params.eventId, (error, imageObj) => {
						if (error) console.error(error)
						else {
							dispatch(postContent(imageObj))
							uploadImageSocket(imageObj)
						}
					})
				})
		}
	}
}






export default connect(mapState, mapDispatch)(Upload)

function firebaseUpload(image) {
	const downloadURL = firebase.storage().ref(`images`).child(image.name).put(image)
		.then((response) => {
			return response.downloadURL
		})
	return downloadURL
}

const imageEXIFPacker = (image, url, eventId, cb) => {
	let imgObj = {}
	EXIF.getData(image, function () {
		imgObj.src = url
		// imgObj.width = EXIF.getTag(this, "PixelXDimension")
		imgObj.width = '100px'
		// imgObj.height = EXIF.getTag(this, "PixelYDimension")
		imgObj.height = '100px'
		imgObj.orientation = EXIF.getTag(this, "Orientation")
		imgObj.eventId = eventId
		cb(null, imgObj)
	})
}