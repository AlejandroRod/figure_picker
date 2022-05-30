import React from 'react';
import * as bootstrap from 'bootstrap';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import square from './images/figurePicker-square.svg';
import circle from './images/figurePicker-circle.svg';
import triangle from './images/figurePicker-triangle.svg';
import { Modal } from './components/Modal';
import { StoredFigure } from './components/StoredFigure';

function FigurePickerContent(props) {
	const figures = props.figures;
	const figuresList = figures.map((figure) => (
		<div key={figure.id} className='figure-container selector' id={figure.name} onClick={() => props.onClick(figure.id)}>
			<img src={figure.src} className='figure' alt={figure.name} />
			<p className='m-0'>{figure.name}</p>
		</div>
	));
	return (figuresList);
}

function StoredFiguresList(props) {
	const storedFigures = props.figures;
	if (storedFigures.length > 0) {
		const storedFiguresList = storedFigures.map((storedFigure) =>
			<StoredFigure key={storedFigure.id} storedFigure={storedFigure} showModal={props.showModal} deleteFigure={props.deleteFigure} />
		);
		return (
			<div className='selectedFigures d-flex overflow-scroll'>
				{storedFiguresList}
			</div>
		);
	} else {
		return (
			<button type='button' className='btn btn-sm btn-primary' onClick={() => props.showModal()}>Agregar figura</button>
		);
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			figures: [
				{
					id: 1,
					name: 'Cuadro',
					src: square,
				},
				{
					id: 2,
					name: 'Círculo',
					src: circle,
				},
				{
					id: 3,
					name: 'Triángulo',
					src: triangle,
				},
			],
			selectedFigure: null,
			storedFigures: [],
			fromFigurePosition: null,
			currentMaxId: 0,
		};
	}

	showNewFigureModal = (fromFigure, position) => {
		const newFigureModal = new bootstrap.Modal('#newFigure-modal');
		newFigureModal.show();
		if (fromFigure) {
			let figureIndex = this.state.storedFigures.findIndex(figure => figure.id === fromFigure);
			if (position === 'after') {
				figureIndex = figureIndex + 1;
			} else {
				figureIndex = figureIndex;
			}
			this.setState({
				fromFigurePosition: figureIndex
			});
		}
	}

	deleteFigure = (figureId) => {
		const storedFigures = this.state.storedFigures.filter(figure => figure.id !== figureId);
		this.setState({
			storedFigures: storedFigures,
		});
	}

	selectFigure = (figureId) => {
		const figure = this.state.figures.find(f => f.id === figureId);
		let newFigure = { ...figure }
		newFigure.id = this.state.currentMaxId + 1;
		this.setState({
			selectedFigure: newFigure,
		});
		let figureSelectors = document.querySelectorAll('.figure-container.selector');
		figureSelectors.forEach(selector => selector.classList.remove('selected'));

		document.getElementById(figure.name).classList.add('selected');
		document.getElementById('modalConfirm').classList.remove('disabled');
	}

	storeFigure() {
		if (this.state.fromFigurePosition != null) {
			let newStoredFigures = [...this.state.storedFigures]
			newStoredFigures.splice(this.state.fromFigurePosition, 0, this.state.selectedFigure)
			this.setState({
				storedFigures: newStoredFigures,
				selectedFigure: null,
				currentMaxId: this.state.currentMaxId + 1
			})
		} else {
			this.setState((prevState) => ({
				storedFigures: [...prevState.storedFigures, prevState.selectedFigure],
				selectedFigure: null,
				currentMaxId: this.state.currentMaxId + 1
			}));
		}

		let figureSelectors = document.querySelectorAll('.figure-container.selector');
		figureSelectors.forEach(selector => selector.classList.remove('selected'));
	}

	render() {
		return (
			<div className="App">
				<div className='container h-100 d-flex align-items-center justify-content-center'>
					<div className='card w-75 border-0 shadow-sm'>
						<div className='card-header text-bg-primary'>
							<h5 className='m-0'>Administrador de figuras</h5>
						</div>
						<div className='card-body'>
							{
								this.state.storedFigures.length > 0 && <p className='small text-muted'>Haz hover sobre alguna figura para añadir otras o eliminarla.</p>
							}
							<StoredFiguresList figures={this.state.storedFigures} showModal={this.showNewFigureModal} deleteFigure={this.deleteFigure} />
						</div>
					</div>
					<Modal modalId='newFigure-modal' modalLabel='newFigure-label' title='Selecciona una figura' confirmText='Añadir figura' modalContent={<FigurePickerContent figures={this.state.figures} onClick={this.selectFigure} />} onClick={() => this.storeFigure()} />
				</div>
			</div>
		);
	}
}

export default App;
