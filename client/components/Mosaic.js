import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchContent } from '../store/content'
import { render } from 'react-dom';
import { fetchSingleEvent } from '../store/singleEvent'
import StackGrid from "react-stack-grid";
import NavModal from './NavModal'
import SingleContent from './SingleContent'

class Mosaic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formattedPictureArray: [],
      isImageModalOpen: false,
      currentImage: {}
    }
    this.reformatImagesForGallery = this.reformatImagesForGallery.bind(this)
    this.onImageClick = this.onImageClick.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }

  componentDidMount() {
    this.props.loadContent(this.props.match.params.eventSecret)
    this.props.loadSingleEvent(this.props.match.params.eventSecret)
  }

  reformatImagesForGallery(imageArray) {
    const pictureObjArray = imageArray.map(image => {
      let imgObj = {
        src: image['src'],
        thumbnail: image['src'],
        thumbnailHeight: image.height,
        thumbnailWidth: image.width,
        isSelected: false,
        orientation: image['orientation']
      }
      return imgObj
    })
    return pictureObjArray
  }
  onImageClick(e) {
    this.setState({ currentImage: this.props.content[e] })
    this.toggleModal()
  }

  toggleModal = () => {
    this.setState({ isImageModalOpen: !this.state.isImageModalOpen })
  }

  render() {
    return (
      <div className='mosaicContainer'>
        <div className="mobile_toggle">
          <NavLink to={`/events/${this.props.singleEvent.secret}/upload/${this.props.singleParticipant.userHash}`} className="mobile_toggle_active">Upload</NavLink>
          <div className="mobile_toggle_disabled">Mosaic</div>
        </div>
        <div>
          <StackGrid columnWidth={'20%'}>
            {this.reformatImagesForGallery(this.props.content).map(image => (
              <div key={image.src}><img src={image.src} className="gallery_item" /></div>
            ))}
          </StackGrid>
          <NavModal show={this.state.isImageModalOpen}
            onClose={this.toggleModal}>
            <SingleContent image={this.state.currentImage} />
          </NavModal>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    content: state.content,
    singleEvent: state.singleEvent,
    singleParticipant: state.singleParticipant
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadContent(eventSecret) {
      dispatch(fetchContent(eventSecret));
    },
    loadSingleEvent(eventSecret) {
      dispatch(fetchSingleEvent(eventSecret))
    }
  }
}


const MosaicContainter = connect(mapState, mapDispatch)(Mosaic)
export default MosaicContainter;
