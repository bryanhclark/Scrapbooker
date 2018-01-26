import React, { Component } from 'react'
import firebase from 'firebase'
import { withRouter, Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { uploadImageToFireBaseThunk } from '../store/firebase'


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
                    <img id='uploadImgPreview' src={this.state.img} height='400px' width='200px' />
                </div>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        pictures: state.pictures
    }
}


const mapDispatch = (dispatch) => {
    return {
        handleUpload(e) {
            let img = e.target.files[0]
            dispatch(uploadImageToFireBaseThunk(img));
        }
    }
}

export default connect(mapState, mapDispatch)(Upload)