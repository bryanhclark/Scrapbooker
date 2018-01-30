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

						// Find dimensions
						let reader = new FileReader();
						reader.readAsDataURL(img);
						reader.onload = function (e) {
							let image = new Image();
							image.src = e.target.result;
							image.onload = function () {
								let height = this.height;
								console.log("height is", height)
								let width = this.width;
								console.log("width is", width)
							};

					}

						// console.log("img.width is", img.width)
						// const MAX_WIDTH = 1200;
						// const MAX_HEIGHT = 1200;
						// let width = img.width;
						// let height = img.height;
						// let canvas
						
						// if (width > height) {
						// 	if (width > MAX_WIDTH) {
						// 		height *= MAX_WIDTH / width;
						// 		width = MAX_WIDTH;
						// 	}
						// } else {
						// 	if (height > MAX_HEIGHT) {
						// 		width *= MAX_HEIGHT / height;
						// 		height = MAX_HEIGHT;
						// 	}
						// }
						// canvas.width = width;
						// canvas.height = height;
						// var ctx = canvas.getContext("2d");
						// ctx.drawImage(img, 0, 0, width, height);

            //dispatch(uploadImageToFireBaseThunk(img));
				}
    }
}

export default connect(mapState, mapDispatch)(Upload)
