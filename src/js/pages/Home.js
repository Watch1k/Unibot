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
				bottom: true,
				offsetX: -75,
				offsetY: -165,
				points: 15,
				scale: 29.6,
				motion: true,
				backlash: 10,
				speedMotion: 0.015
			}, {
				radius: 100,
				path: '#path-screen-2',
				offsetX: -290,
				offsetY: -45,
				points: 25,
				scale: 31.3,
				right: true,
				motion: true,
				backlash: 10,
				speedMotion: 0.01
			}, {
				radius: 70,
				path: '#path-screen-3',
				bottom: true,
				offsetX: -20,
				offsetY: -175,
				points: 15,
				scale: 30.9,
				blur: 4,
				left: true,
				motion: true,
				backlash: 10,
				speedMotion: 0.0075
			}, {
				radius: 70,
				path: '#path-screen-4',
				bottom: true,
				offsetX: 160,
				offsetY: -310,
				points: 15,
				scale: 30,
				blur: 7,
				motion: true,
				backlash: 20,
				speedMotion: 0.005,
				reverseMotion: true
			}, {
				radius: 100,
				path: '#path-screen-5',
				bottom: true,
				offsetX: -320,
				offsetY: -350,
				points: 20,
				scale: 28.37,
				right: true,
				motion: true,
				backlash: 10,
				reverseMotion: true,
				speedMotion: 0.0075
			}],
			gradients: [{
				name: 'screen-gradient-1'
			}, {
				name: 'screen-gradient-2'
			}, {
				name: 'screen-gradient-3'
			}, {
				name: 'screen-gradient-4'
			}, {
				name: 'screen-gradient-5'
			}]
		});
		
		paymentPartsFirst.play();
	}
}
