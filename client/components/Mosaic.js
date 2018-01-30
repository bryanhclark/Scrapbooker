import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Mosaic = (props) => {
  const {content} = props
  console.log(props)
  return (
    <div className='mosaicContainer'>
      <h3>This is the mosaic component</h3>
      <NavLink to='/'>Home</NavLink>
      <div className="grid" data-packery='{ "itemSelector": ".grid-item", "gutter": 0 }'>
        <div className="grid-sizer"></div>
        {
          content.map(item => {
          switch (item.type) {
            case 'image':
              return (<img key={item.id} src={item.downloadURL} className="grid-item type_image" />)
            case 'text':
              return (<div key={item.id} className="grid-item type_text"><span className="quote_start">&ldquo;</span>{item.downloadURL}<span className="quote_end">&rdquo;</span></div>)
          }})
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
      content: state.content
  }
}


const MosaicContainter = connect(mapStateToProps)(Mosaic)
export default MosaicContainter;
