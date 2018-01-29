import React, { Component } from 'react'
import { withRouter, Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { uploadImageToFireBaseThunk } from '../store/firebase'
import * as firebase from 'firebase'
import { config } from '../../secrets'


class Upload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            img: ''
        }
        this.handleUploadImageToFirebase = this.handleUploadImageToFirebase.bind(this)
    }
    handleUploadImageToFirebase(e) {
        let image = e.target.files[0]
        let eventId = eventId || 1
        const name = image.name
        const imageRef = firebase.storage().ref(`images/${eventId}`).child(name).put(image)
            .then((response) => {
                this.props.handleUpload(response.downloadURL)
            })
    }
    render() {
        return (
            <div className='uploadContainer'>
                <h3>Upload Photo</h3>
                <input type='file' accept='image/*' onChange={this.handleUploadImageToFirebase} />
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
        handleUpload(image) {
            dispatch(uploadImageToFireBaseThunk(image));
        }
    }
}

export default connect(mapState, mapDispatch)(Upload)
