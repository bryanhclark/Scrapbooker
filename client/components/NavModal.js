import React from 'react';
import PropTypes from 'prop-types';

class NavModal extends React.Component {
    render() {
        // Render nothing if the "show" prop is false
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="navModalBackdrop">
                <div className="navModal">
                    {this.props.children}
                    <div className="footer">
                        <button className="btn_close" onClick={this.props.onClose}>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}


NavModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default NavModal;