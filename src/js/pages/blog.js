import { tns } from 'tiny-slider/src/tiny-slider.module';
import { Resp } from '../modules/dev/helpers';

export default class Blog {
	constructor() {
		this.container = document.querySelector('.blog');
		if (!this.container) return;
		this.cards = [...this.container.querySelectorAll('.card')];
		this.cardTitleName = '.card__title';
		this.cardTextName = '.card__text';
		this.sliderCounterCurrent = this.container.querySelector('.top__list-counter-current');
		this.sliderCounterTotal = this.container.querySelector('.top__list-counter-total');
		
		this.init();
	}
	
	init() {
		this.initClamp();
		//this.initSlider();
	}
	
	initClamp() {
		if (Resp.isMobile) return;
		
		this.cards.forEach(card => {
			const heightMax = 220;
			const title = card.querySelector(this.cardTitleName);
			const text = card.querySelector(this.cardTextName);
			
			$clamp(text, { clamp: heightMax - title.clientHeight + 'px' });
		});
	}
	
	//initSlider() {
	//	if (!Resp.isMobile) return;
	//
	//	this.slider = tns({
	//		container: '.top__list',
	//		mode: 'gallery',
	//		controlsText: ['', ''],
	//		speed: 400
	//	});
	//
	//	const prev = this.slider.getInfo().prevButton;
	//	const next = this.slider.getInfo().nextButton;
	//	const dot = document.createElement('DIV');
	//	const circle = document.createElement('SPAN');
	//	for (let i = 0; i < 7; i++) {
	//		prev.appendChild(dot.cloneNode());
	//		next.appendChild(dot.cloneNode());
	//	}
	//	prev.appendChild(circle.cloneNode());
	//	next.appendChild(circle.cloneNode());
	//
	//	this.sliderCounterCurrent.innerHTML = '01';
	//	this.sliderCounterTotal.innerHTML = do {
	//		if (this.slider.getInfo().slideCount < 10) {
	//			'0' + this.slider.getInfo().slideCount;
	//		} else {
	//			this.slider.getInfo().slideCount;
	//		}
	//	};
	//
	//	this.slider.events.on('indexChanged', () => {
	//		this.refreshCounter();
	//	});
	//}
	//
	//refreshCounter() {
	//	const info = this.slider.getInfo();
	//
	//	this.sliderCounterCurrent.innerHTML = do {
	//		if (info.navCurrentIndex + 1 < 10) {
	//			'0' + (info.navCurrentIndex + 1);
	//		} else {
	//			info.navCurrentIndex + 1;
	//		}
	//	};
	//}
}