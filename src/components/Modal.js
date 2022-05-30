import React from 'react';

class Modal extends React.Component {

	componentDidMount() {
		const newFigureModal = document.getElementById('newFigure-modal');
		newFigureModal.addEventListener('hidden.bs.modal', event => {
			let figureSelectors = document.querySelectorAll('.figure-container.selector');
			figureSelectors.forEach(selector => selector.classList.remove('selected'));
			document.getElementById('modalConfirm').classList.add('disabled');
		})
	}

	render() {
		return (
			<div className='modal fade' id={this.props.modalId} tabIndex={-1} aria-labelledby={this.props.modalLabel} aria-hidden='true'>
				<div className='modal-dialog modal-dialog-centered'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id={this.props.modalLabel}>{this.props.title}</h5>
							<button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
						</div>
						<div className='modal-body d-flex justify-content-around'>
							{this.props.modalContent}
						</div>
						<div className='modal-footer'>
							<button type='button' className='btn btn-sm btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
							<button type='button' className='btn btn-sm btn-primary disabled' id='modalConfirm' onClick={this.props.onClick} data-bs-dismiss='modal'>{this.props.confirmText}</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export { Modal } 