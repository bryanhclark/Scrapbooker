import React, { Component } from 'react'
import { withRouter, Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import { config } from '../../secrets'
import { uploadImageSocket } from '../socket'
import { postContent } from '../store/content'
import { fetchSingleEvent } from '../store/singleEvent'
import { fetchCurrentParticipant } from '../store/singleParticipant'
import crypto from 'crypto'
import { imageEXIFPacker, resizeImage, fetchExifData } from '../../utils/imgUtils'


class Upload extends Component {
	constructor(props) {
		super(props)
		this.state = {
			img: ''
		}
	}

	componentDidMount() {
		this.props.loadSingleEvent(this.props.match.params.eventSecret)
		if (this.props.match.params.userHash) {
			this.props.setParticipant(this.props.match.params.userHash)
		}
		else {
			this.props.setParticipant(this.props.user.userHash)
		}
	}

	render() {
		return (
			<div className='uploadContainer'>
				<div className="mobile_toggle">
					<div className="mobile_toggle_disabled">Upload</div>
					<NavLink to={`/events/${this.props.singleEvent.secret}/mosaic/${this.props.singleParticipant.userHash}`} className="mobile_toggle_active">Mosaic</NavLink>
				</div>
				<div className="wrapper">
					<h3>Upload Photo</h3>
					<label className="btn" for="imageToUpload">Choose photo</label>
					<input type='file' accept='image/*;capture=camera' name='newImage' id='imageToUpload' onChange={
						(e) => {
							e.preventDefault()
							this.fileInput = e.target.files[0];
							this.setState({ img: e.target.files[0] })
						}} />
					<p>{this.state.img.name}</p>
					<button className="btn" onClick={() => this.props.handleImgUpload(this.fileInput, this.props.singleEvent.id, this.props.singleParticipant.id)}>Upload Image</button>
				</div>
			</div>
		)
	}
}

const firebaseUpload = (image) => {
	let imageName = crypto.randomBytes(16).toString('base64')
	const downloadURL = firebase.storage().ref(`images`).child(imageName).put(image)
		.then((response) => {
			return response.downloadURL
		})
	return downloadURL
}

const mapState = (state) => {
	return {
		user: state.user,
		singleEvent: state.singleEvent,
		singleParticipant: state.singleParticipant
	}
}

const mapDispatch =  (dispatch) => {
	return {
		async handleImgUpload(image, eventId, userId) {
			let imageOrientation = await fetchExifData(image)
			console.log('imgaeOrientation', imageOrientation)
			resizeImage({
				file: image,
				maxSize: 900
			}, imageOrientation)
				.then(resizedImg => {
					return firebaseUpload(resizedImg)
				})
				.then(firebaseURL => {
					imageEXIFPacker(image, firebaseURL, eventId, userId, (error, imageObj) => {
						if (error) console.error(error)
						else {
							dispatch(postContent(imageObj))
							//use a .then between these two
							uploadImageSocket(imageObj)
						}
					})
				})
		},
		loadSingleEvent(eventSecret) {
			dispatch(fetchSingleEvent(eventSecret))
		},
		setParticipant(contactHash) {
			dispatch(fetchCurrentParticipant(contactHash))
		}
	}
}

const uploadContainer = connect(mapState, mapDispatch)(Upload)
export default uploadContainer
