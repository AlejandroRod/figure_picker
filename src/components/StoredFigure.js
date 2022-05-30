import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

class StoredFigure extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='figure-container px-4 py-2'>
                <div className='figure-actions d-flex justify-content-between align-items-center'>
                    <button type='button' className='moveFigureLeft-btn btn btn-sm btn-primary' onClick={() => this.props.showModal(this.props.storedFigure.id, 'before')}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button type='button' className='removeFigure-btn btn btn-sm btn-danger' onClick={() => this.props.deleteFigure(this.props.storedFigure.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button type='button' className='moveFigureRight-btn btn btn-sm btn-primary' onClick={() => this.props.showModal(this.props.storedFigure.id, 'after')}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
                <img src={this.props.storedFigure.src} className='figure' alt={this.props.storedFigure.name} />
                <p className='m-0'>{this.props.storedFigure.name}</p>
            </div>
        );
    }
}

export { StoredFigure }