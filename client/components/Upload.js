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
				<h3>Upload Photo</h3>
				<input type='file' accept='image/*' onChange={this.props.handleImgUpload} />
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
		handleImgUpload(event) {
			let image = event.target.files[0]
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

export default connect(mapState, mapDispatch)(Upload)

function firebaseUpload(image) {
	const downloadURL = firebase.storage().ref(`images`).child(image.name).put(image)
		.then((response) => {
			return response.downloadURL
		})
	return downloadURL
}
