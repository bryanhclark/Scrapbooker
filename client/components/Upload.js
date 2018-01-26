import React, { Component } from 'react'
import { withRouter, Link, NavLink } from 'react-router-dom'


class Upload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            img: ''
        }
        this.handleUpload = this.handleUpload.bind(this);
    }


    handleUpload(e) {


        console.log()
        let img = e.target.value
        console.log(img);
        this.setState({ img });
    }


    render() {
        return (
            <div className='uploadContainer'>
                <h3>Upload Photo</h3>
                <input type='file' accept='image/*' onChange={this.handleUpload} />
                <div className='uploadImgContainer'>
                    <img id='uploadImgPreview' src={this.state.img} height='400px' width='200px'/>
                    </div>
            </div>  
        )
    }
}


export default Upload;