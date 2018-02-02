import React, { Component } from 'react'
import { withRouter, Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import { config } from '../../secrets'
import { uploadImageSocket } from '../socket'
import EXIF from 'exif-js'
import { postContent } from '../store/content'
import 'babel-polyfill'


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
				<div className="mobile_toggle">
					<div className="mobile_toggle_disabled">Upload</div>
					<NavLink to={`/events/${this.props.singleEvent.id}/mosaic`} className="mobile_toggle_active">Mosaic</NavLink>
				</div>
				<div className="wrapper">
					<h3>Upload Photo</h3>
					<label className="btn" for="imageToUpload">Choose photo</label>
					<input type='file' accept='image/*;capture=camera' id='imageToUpload' onChange={
						(e) => {
							this.fileInput = e.target.files[0];
							console.log("this.fileInput", this.fileInput)
							this.setState({ img: e.target.files[0] })
						}} />
					<p>{this.state.img.name}</p>
					<button className="btn" onClick={() => this.props.handleImgUpload(this.fileInput, this.props.match.params.eventId)}>Upload Image</button>

				</div>
			</div>
		)
	}
}

const mapState = (state) => {
	return {
		singleEvent: state.singleEvent
	}
}


const mapDispatch = (dispatch) => {
	return {
		handleImgUpload(image, eventId) {
			firebaseUpload(image)
				.then(response => {
					return imageEXIFPacker(image, response, (error, imageObj) => {
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

function imageEXIFPacker(image, url, cb) {
	let imgObj = {}
	EXIF.getData(image, function () {
		imgObj.src = url
		imgObj.width = EXIF.getTag(this, "PixelXDimension")
		imgObj.height = EXIF.getTag(this, "PixelYDimension")
		imgObj.orientation = EXIF.getTag(this, "Orientation")
		imgObj.timeCreated = image.lastModifiedDate.toString()
		cb(null, imgObj)
	})

}

const uploadContainer = connect(mapState, mapDispatch)(Upload)
export default uploadContainer


const firebaseUpload = (image) => {
	const downloadURL = firebase.storage().ref(`images`).child(image.name).put(image)
		.then((response) => {
			return response.downloadURL
		})
	return downloadURL
}
