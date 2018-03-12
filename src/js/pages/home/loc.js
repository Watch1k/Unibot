import { TweenMax } from 'gsap';
import { tns } from '../../../../node_modules/tiny-slider/src/tiny-slider.module';
import { Resp } from '../../modules/dev/helpers';

export default class HomeLoc {
	constructor() {
		this.container = document.querySelector('.loc');
		this.sliderSelector = '.loc__slider';
		this.slider = this.container.querySelector(this.sliderSelector);
		this.btn = this.container.querySelector('.loc__slider-btn');
		this.sliderCounterCurrent = this.container.querySelector('.loc__slider-counter-current');
		this.sliderCounterTotal = this.container.querySelector('.loc__slider-counter-total');
		
		this.init();
		this.fixButtonPosition(true);
	}
	
	init() {
		this.slider = tns({
			container: '.loc__slider',
			mode: 'gallery',
			controlsText: ['', ''],
			speed: 400
		});
		
		const prev = this.slider.getInfo().prevButton;
		const next = this.slider.getInfo().nextButton;
		const dot = document.createElement('DIV');
		const circle = document.createElement('SPAN');
		for (let i = 0; i < 7; i++) {
			prev.appendChild(dot.cloneNode());
			next.appendChild(dot.cloneNode());
		}
		prev.appendChild(circle.cloneNode());
		next.appendChild(circle.cloneNode());
		
		this.sliderCounterCurrent.innerHTML = '01';
		this.sliderCounterTotal.innerHTML = do {
			if (this.slider.getInfo().slideCount < 10) {
				'0' + this.slider.getInfo().slideCount;
			} else {
				this.slider.getInfo().slideCount;
			}
		};
		
		this.slider.events.on('indexChanged', () => {
			this.fixButtonPosition();
			this.refreshCounter();
		});
	}
	
	fixButtonPosition(state = false) {
		const info = this.slider.getInfo();
		const left = info.slideItems[info.index].querySelector('.loc__slider-left');
		const height = left.clientHeight - +window.getComputedStyle(left, null).getPropertyValue('padding-bottom').slice(0, -2);
		
		if (state)  TweenMax.set(this.btn, { y: height });
		TweenMax.to(this.btn, 0.4, { y: height });
		if (Resp.isMobile) {
			TweenMax.to(this.sliderCounterCurrent.parentNode, 0.4, { y: height });
			TweenMax.to(this.container.querySelectorAll('button[data-controls]'), 0.4, { y: height });
		}
	}
	
	refreshCounter() {
		const info = this.slider.getInfo();
		
		this.sliderCounterCurrent.innerHTML = do {
			if (info.navCurrentIndex + 1 < 10) {
				'0' + (info.navCurrentIndex + 1);
			} else {
				info.navCurrentIndex + 1;
			}
		};
	}
}