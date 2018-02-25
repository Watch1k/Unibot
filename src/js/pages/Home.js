import Jelateria from '../components/jella/jelaModule';

export default class Home {
	constructor() {
		this.init();
	}
	
	init() {
		const paymentPartsFirst = new Jelateria({
			container: document.querySelector('.screen__canvas'),
			radius: 70,
			paths: [{
				path: '#path-screen-1',
				offsetX: -75,
				offsetY: 575,
				points: 15,
				scale: 32
			}],
			gradients: [{
				name: 'screen-gradient-1-1',
			}]
		});
		
		paymentPartsFirst.play();
	}
}
