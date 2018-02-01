import React from 'react';
import PropTypes from 'prop-types';


class DashboardModal extends React.Component {
    render() {
        // Render nothing if the "show" prop is false
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="dashboard-Modal-Backdrop">
                <div className="dashboard-Modal">
                    {this.props.children}
                    <div className="footer">
                        <button onClick={this.props.onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}


DashboardModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default DashboardModal; 