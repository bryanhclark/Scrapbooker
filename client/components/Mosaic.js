import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link, NavLink } from 'react-router-dom'

class Mosaic extends Component {
	constructor(props) {
			super(props)
	}

	render() {
		const testGroup = [
			{type: "image", src: "https://www.fillmurray.com/200/300" },
			{type: "image", src: "https://www.fillmurray.com/500/350"},
			{type: "image", src: "https://www.fillmurray.com/400/300"},
			{type: "image", src: "https://www.fillmurray.com/322/401"},
			{type: "image", src: "https://www.fillmurray.com/234/344"},
			{type: "image", src: "https://www.fillmurray.com/307/344"},
			{type: "text", value: "This text element is brought to you by Fullstack Academy"},	
			{type: "image", src: "https://www.fillmurray.com/231/188"},
			{type: "image", src: "https://www.fillmurray.com/276/223"},
			{type: "image", src: "https://www.fillmurray.com/564/223"},
			{type: "image", src: "https://www.fillmurray.com/635/344"},
			{type: "image", src: "https://www.fillmurray.com/315/344"},
			{type: "image", src: "https://www.fillmurray.com/396/258"},
			{type: "text", value: "This is how we do it!"},			
			{type: "image", src: "https://www.fillmurray.com/419/472"},
			{type: "image", src: "https://www.fillmurray.com/786/557"},
			{type: "image", src: "https://www.fillmurray.com/656/654"},
			{type: "image", src: "https://www.fillmurray.com/848/672"},
			{type: "image", src: "https://www.fillmurray.com/774/345"}
		]
		
		return (
			<div className='mosaicContainer'>
				<h3>This is the mosaic component</h3>
				<NavLink to='/'>Home</NavLink>
				<div className="grid" data-packery='{ "itemSelector": ".grid-item", "gutter": 0 }'>
					<div className="grid-sizer"></div>
					{testGroup.map(item => {
						switch (item.type) {
							case 'image':
								return (<img key={item.src} src={item.src} className="grid-item type_image" />)
							case 'text':
								return (<div key={item.value} className="grid-item type_text"><span className="quote_start">&ldquo;</span>{item.value}<span className="quote_end">&rdquo;</span></div>)
						}
					})}
				</div>
			</div>
		)
	}
}

export default Mosaic