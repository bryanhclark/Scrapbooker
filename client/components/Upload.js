import React, { Component } from 'react'
import { withRouter, Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import { config } from '../../secrets'
import { uploadImageSocket } from '../socket'
import EXIF from 'exif-js'
import { postContent } from '../store/content'
import { fetchSingleEvent } from '../store/singleEvent'
import { fetchCurrentContact } from '../store/singleContact'
import 'babel-polyfill'
import crypto from 'crypto'


class Upload extends Component {
	constructor(props) {
		super(props)
		this.state = {
			img: ''
		}
	}

	componentDidMount() {
		this.props.loadSingleEvent(this.props.match.params.eventId)
		if (this.props.match.params.contactHash) this.props.setContact(this.props.match.params.contactHash)
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
					<input type='file' accept='image/*;capture=camera' name='newImage' id='imageToUpload' onChange={
						(e) => {
							e.preventDefault()
							this.fileInput = e.target.files[0];
							this.setState({ img: e.target.files[0] })
						}} />
					<p>{this.state.img.name}</p>
					<button className="btn" onClick={() => this.props.handleImgUpload(this.fileInput, this.props.match.params.eventId, this.props.singleContact.id)}>Upload Image</button>
				</div>
			</div>
		)
	}
}

const mapState = (state) => {
	return {
		singleEvent: state.singleEvent,
		singleContact: state.singleContact
	}
}


const mapDispatch = (dispatch) => {
	return {
		handleImgUpload(image, eventId, contactId) {
			resizeImage({
				file: image,
				maxSize: 900
			})
				.then(resizedImg => {
					resizedImg.name = eventId + "--" + image.name
					return firebaseUpload(resizedImg)
				})
				.then(firebaseURL => {
					imageEXIFPacker(image, firebaseURL, eventId, contactId, (error, imageObj) => {
						if (error) console.error(error)
						else {
							dispatch(postContent(imageObj))
							uploadImageSocket(imageObj)
						}
					})
				})
		},
		loadSingleEvent(eventId) {
			dispatch(fetchSingleEvent(eventId))
		},
		setContact(contactHash) {
			dispatch(fetchCurrentContact(contactHash))
		}
	}
}

function imageEXIFPacker(image, url, eventId, contactId, cb) {
	const imgObj = {}
	EXIF.getData(image, function () {
		imgObj.src = url
		imgObj.width = Number(EXIF.getTag(this, "PixelXDimension"))
		imgObj.height = Number(EXIF.getTag(this, "PixelYDimension"))
		imgObj.orientation = Number(EXIF.getTag(this, "Orientation"))
		imgObj.long = EXIF.getTag(this, "GPSLongitude")
		imgObj.timeCreated = image.lastModified.toString()
		imgObj.eventId = eventId
		imgObj.contactId = contactId
		cb(null, imgObj)
	})
}

const firebaseUpload = (image) => {
	let imageName = crypto.randomBytes(16).toString('base64')
	const downloadURL = firebase.storage().ref(`images`).child(imageName).put(image)
		.then((response) => {
			return response.downloadURL
		})
	return downloadURL
}

const resizeImage = function (settings) {
	const file = settings.file
	const maxSize = settings.maxSize
	const reader = new FileReader()
	const image = new Image()
	const canvas = document.createElement('canvas')

	const dataURItoBlob = function (dataURI) {
		const bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
			atob(dataURI.split(',')[1]) :
			unescape(dataURI.split(',')[1]);
		const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
		const max = bytes.length
		const ia = new Uint8Array(max)
		for (var i = 0; i < max; i++)
			ia[i] = bytes.charCodeAt(i)
		return new Blob([ia], { type: mime })
	};

	const resize = function () {
		let width = image.width;
		let height = image.height;
		if (width > height) {
			if (width > maxSize) {
				height *= maxSize / width;
				width = maxSize;
			}
		} else {
			if (height > maxSize) {
				width *= maxSize / height;
				height = maxSize;
			}
		}
		canvas.width = width;
		canvas.height = height;
		canvas.getContext('2d').drawImage(image, 0, 0, width, height);
		var dataUrl = canvas.toDataURL('image/jpeg');
		return dataURItoBlob(dataUrl);
	};

	return new Promise(function (ok, no) {
		if (!file.type.match(/image.*/)) {
			no(new Error("Not an image"));
			return;
		}
		reader.onload = function (readerEvent) {
			image.onload = function () { return ok(resize()); };
			image.src = readerEvent.target.result;
		};
		reader.readAsDataURL(file);
	});
};


const uploadContainer = connect(mapState, mapDispatch)(Upload)
export default uploadContainer
