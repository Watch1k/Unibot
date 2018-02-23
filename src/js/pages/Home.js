import Jelateria from '../components/jella/jelaModule';

export default class Home {
	constructor() {
		this.init();
	}
	
	init() {
		const paymentPartsFirst = new Jelateria({
			canvas: 'canvas',
			radius: 75,
			paths: [{
				path: '#a-big',
				offsetX: 160,
				offsetY: 10,
				points: 40,
				color: '#51E3C2',
				scale: 15
			}]
		});
		
		const button = document.getElementById('button');
		button.addEventListener('click', () => {
			paymentPartsFirst.blurToggle();
		});
		
		paymentPartsFirst.play();
	}
}
