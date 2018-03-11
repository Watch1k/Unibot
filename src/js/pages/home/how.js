import { TimelineMax, TweenMax } from 'gsap';
import Jelateria from '../../components/jella/jelaModule';
import '../../modules/dep/DrawSVGPlugin';
import ScrollAnim from '../../modules/dev/animation/scrollAnim';
import { Resp } from '../../modules/dev/helpers';

export default class HomeHow {
	constructor() {
		this.container = document.querySelector('.how');
		this.elements = [...this.container.querySelectorAll('.how__history-el')];
		this.historyStart = this.container.querySelector('.how__history-start');
		this.historyLinePath = this.container.querySelector('.how__history-line path');
		this.animArray = [];
		this.init();
	}
	
	init() {
		const _this = this;
		this.lineAnim();
		if (Resp.isDesk) {
			this.initJelly();
			
			this.elements.forEach((element, index) => {
				new ScrollAnim({
					el: element,
					onStart() {
						if (index === 0) { _this.lineTl.play(); }
						_this.lineTl.add(_this.animArray[index].play());
					}
				});
			});
		}
	}
	
	lineAnim() {
		if (Resp.isDesk) {
			TweenMax.set(this.historyLinePath, { drawSVG: 0 });
			this.lineTl = new TimelineMax({ paused: true });
			
			this.elements.forEach((element, index) => {
				const tl = new TimelineMax({ paused: true });
				const pathSize = do {
					if (index === 0) { 8.5; }
					else if (index === 1) { 25; }
					else if (index === 2) { 40; }
					else if (index === 3) { 60; }
					else if (index === 4) { 76.5; }
					else { 95; }
				};
				const pathStep = do {
					if (index === 0) { 15.5; }
					else if (index === 1) { 31; }
					else if (index === 2) { 49; }
					else if (index === 3) { 66.5; }
					else if (index === 4) { 84; }
					else { 100; }
				};
				
				if (index === 0) {
					tl.to(this.historyStart, 0.5, { scaleX: 1, scaleY: 1 }, 0);
				}
				
				tl
					.to(this.historyLinePath, 1, { drawSVG: `${pathSize}%` })
					.set(this.historyLinePath, { drawSVG: `${pathStep}%` });
				
				this.animArray.push(tl);
			});
		}
	}
	
	initJelly() {
		const containers = [...document.querySelectorAll('.how__history-canvas')];
		
		containers.forEach((container, index) => {
			const jelly = new Jelateria({
				container: container,
				paths: [{
					radius: 110,
					path: `#path-how-${index + 1}`,
					offsetX: 50,
					offsetY: 50,
					points: 15,
					scale: 32,
					left: true
				}],
				gradients: [{
					name: `how-gradient-${index + 1}`
				}]
			});
			
			new ScrollAnim({
				el: container,
				inView: true,
				reverse: true,
				onEnter() {
					jelly.start();
				},
				onLeave() {
					jelly.stop();
				}
			});
		});
	}
}
