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
				offsetX: -300,
				offsetY: -45,
				points: 25,
				scale: 37,
				right: true
			}, {
				radius: 70,
				path: '#path-screen-3',
				offsetX: -660,
				offsetY: 570,
				points: 15,
				scale: 32,
				blur: 4
			}, {
				radius: 70,
				path: '#path-screen-4',
				offsetX: 160,
				offsetY: 425,
				points: 15,
				scale: 32,
				blur: 7
			}, {
				radius: 100,
				path: '#path-screen-5',
				offsetX: 290,
				offsetY: 450,
				points: 25,
				scale: 32
			}],
			gradients: [{
				name: 'screen-gradient-1-1'
			}, {
				name: 'screen-gradient-2-1'
			}, {
				name: 'screen-gradient-3-1'
			}, {
				name: 'screen-gradient-4-1'
			}, {
				name: 'screen-gradient-5-1'
			}]
		});
		
		paymentPartsFirst.play();
	}
}
