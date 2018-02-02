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
		console.log(this.props.singleEvent)
		return (
			<div className='uploadContainer'>
				<div className="mobile_toggle">
						<div className="mobile_toggle_disabled">Upload</div>
						<NavLink to={`/events/${this.props.singleEvent.id}/mosaic`}className="mobile_toggle_active">Mosaic</NavLink>
				</div>
				<div className="wrapper">
					<h3>Upload Photo</h3>
					<label className="btn" for="imageToUpload">Choose photo</label>
					<input type='file' accept='image/*;capture=camera' id='imageToUpload' onChange={
						(e) => {this.fileInput = e.target.files[0];
							console.log("this.fileInput", this.fileInput)
						 this.setState({img: e.target.files[0]})}} />
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


const mapDispatch = (dispatch, ownProps) => {
	return {
		handleImgUpload(image, eventId) {
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






const uploadContainer = connect(mapState, mapDispatch)(Upload)
export default uploadContainer


const  firebaseUpload = (image)=>  {
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