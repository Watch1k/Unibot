import Jelateria from '../components/jella/jelaModule';
import ScrollAnim from '../modules/dev/animation/scrollAnim';

export default class Home {
	constructor() {
		this.init();
	}
	
	init() {
		this.initScreen();
		this.initHow();
	}
	
	initScreen() {
		const container = document.querySelector('.screen');
		const paymentPartsFirst = new Jelateria({
			container: document.querySelector('.screen__canvas'),
			ratioState: true,
			paths: [{
				radius: 70,
				path: '#path-screen-1',
				bottom: true,
				offsetX: -75,
				offsetY: -165,
				points: 15,
				scale: 32,
				motion: true,
				backlash: 10,
				speedMotion: 0.015
			}, {
				radius: 100,
				path: '#path-screen-2',
				offsetX: -290,
				offsetY: -45,
				points: 25,
				scale: 32,
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
				scale: 32,
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
				scale: 32,
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
				offsetY: -380,
				points: 20,
				scale: 32,
				right: true,
				motion: true,
				backlash: 10,
				reverseMotion: true,
				speedMotion: 0.0075
			}],
			gradients: [{
				name: 'screen-gradient-1'
			}, {
				name: 'screen-gradient-2',
				offsetX: 11,
				offsetY: 7
			}, {
				name: 'screen-gradient-3'
			}, {
				name: 'screen-gradient-4'
			}, {
				name: 'screen-gradient-5',
				offsetX: 11,
				offsetY: 19
			}]
		});
		
		new ScrollAnim({
			el: container,
			inView: true,
			reverse: true,
			onEnter() {
				paymentPartsFirst.start();
			},
			onLeave() {
				paymentPartsFirst.stop();
			}
		});
	}
	
	initHow() {
		const container = document.querySelector('.how');
	}
}
