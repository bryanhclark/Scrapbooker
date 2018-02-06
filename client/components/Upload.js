import React, { Component } from 'react'
import { withRouter, Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import { config } from '../../secrets'
import { uploadImageSocket } from '../socket'
import { postContent } from '../store/content'
import { fetchSingleEvent } from '../store/singleEvent'
import { fetchCurrentContact } from '../store/singleContact'
import crypto from 'crypto'
import { imageEXIFPacker, resizeImage } from '../../utils/imgUtils'

class Upload extends Component {
	constructor(props) {
		super(props)
		this.state = {
			img: ''
		}
	}

	componentDidMount() {
		this.props.loadSingleEvent(this.props.match.params.eventSecret)
		if (this.props.match.params.contactHash) this.props.setContact(this.props.match.params.contactHash)
	}

	render() {
		return (
			<div className='uploadContainer'>
				<div className="mobile_toggle">
					<div className="mobile_toggle_disabled">Upload</div>
					<NavLink to={`/events/${this.props.singleEvent.secret}/mosaic`} className="mobile_toggle_active">Mosaic</NavLink>
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
					<button className="btn" onClick={() => this.props.handleImgUpload(this.fileInput, this.props.match.params.eventSecret, this.props.singleContact.id)}>Upload Image</button>
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
		singleEvent: state.singleEvent,
		singleContact: state.singleContact
	}
}

const mapDispatch = (dispatch) => {
	return {
		handleImgUpload(image, eventSecret, contactId) {
			resizeImage({
				file: image,
				maxSize: 900
			})
				.then(resizedImg => {
					return firebaseUpload(resizedImg)
				})
				.then(firebaseURL => {
					imageEXIFPacker(image, firebaseURL, eventSecret, contactId, (error, imageObj) => {
						if (error) console.error(error)
						else {
							dispatch(postContent(imageObj))
							uploadImageSocket(imageObj)
						}
					})
				})
		},
		loadSingleEvent(eventSecret) {
			dispatch(fetchSingleEvent(eventSecret))
		},
		setContact(contactHash) {
			dispatch(fetchCurrentContact(contactHash))
		}
	}
}

const uploadContainer = connect(mapState, mapDispatch)(Upload)
export default uploadContainer
