import Jelateria from '../components/jella/jelaModule';

export default class Home {
	constructor() {
		this.init();
	}
	
	init() {
		const paymentPartsFirst = new Jelateria({
			container: document.querySelector('.screen__canvas'),
			paths: [{
				radius: 70,
				path: '#path-screen-1',
				offsetX: -75,
				offsetY: 575,
				points: 15,
				scale: 32
			}, {
				radius: 100,
				path: '#path-screen-2',
				offsetX: 365,
				offsetY: -45,
				points: 25,
				scale: 37
			}],
			gradients: [{
				name: 'screen-gradient-1-1'
			}, {
				name: 'screen-gradient-2-1'
			}]
		});
		
		paymentPartsFirst.play();
	}
}
