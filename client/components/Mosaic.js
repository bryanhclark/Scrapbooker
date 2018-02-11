import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchContent } from '../store/content'
import { render } from 'react-dom'
import { fetchSingleEvent } from '../store/singleEvent'
import StackGrid from 'react-stack-grid'
import sizeMe from 'react-sizeme'
import NavModal from './NavModal'
import SingleContent from './SingleContent'
import currentEvents from '../store/currentEvents';

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
    let currentImage = this.props.content.filter(content => {
      if (content.src === e.target.src) return content
    })
    this.setState({ currentImage: currentImage[0] })
    this.toggleModal()
  }

  toggleModal = () => {
    this.setState({ isImageModalOpen: !this.state.isImageModalOpen })
  }

  render() {
    console.log('this.props.singleParticipant', this.props.singleParticipant)
    const { width } = this.props.size;
    return (
      <div className='mosaicContainer'>
        <div className="mobile_toggle">
          <NavLink to={`/events/${this.props.singleEvent.secret}/upload/${this.props.singleParticipant.userHash}`} className="mobile_toggle_active">Upload</NavLink>
          <div className="mobile_toggle_disabled">Mosaic</div>
        </div>
        <div>
          <StackGrid
            columnWidth={width <= 768 ? '50%' : '20%'}
          >
            {this.reformatImagesForGallery(this.props.content).map(image => (
              <div key={image.src}  > <img src={image.src} className="gallery_item" photoid={image.id} onClick={(e) => this.onImageClick(e)} /></div>
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

const sizeMeConfig = { monitorWidth: true }
const sizeMeHOC = sizeMe(sizeMeConfig)

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

const MosaicContainter = connect(mapState, mapDispatch)(sizeMeHOC(Mosaic))
export default MosaicContainter;
