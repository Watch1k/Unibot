import { TweenMax } from 'gsap';
import { tns } from '../../../../node_modules/tiny-slider/src/tiny-slider.module';
import { css } from '../../modules/dev/helpers';

export default class HomeExample {
	constructor() {
		this.container = document.querySelector('.example');
		this.sliderSelector = '.example__slider';
		this.slider = this.container.querySelector(this.sliderSelector);
		this.btn = this.container.querySelector('.example__slider-btn');
		this.sliderCounterCurrent = this.container.querySelector('.example__slider-counter-current');
		this.sliderCounterTotal = this.container.querySelector('.example__slider-counter-total');
		this.chatText = this.container.querySelector('.example__slider-chat-text');
		this.chatIcon = [...this.container.querySelectorAll('.example__slider-chat-icon')];
		
		this.init();
		this.fixButtonPosition(true);
		this.chat();
	}
	
	init() {
		this.slider = tns({
			container: '.example__slider',
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
		const right = info.slideItems[info.index].querySelector('.example__slider-right');
		const height = right.clientHeight - +window.getComputedStyle(right, null).getPropertyValue('padding-bottom').slice(0, -2);
		
		if (state) TweenMax.set(this.btn, { y: height });
		TweenMax.to(this.btn, 0.4, { y: height });
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
	
	chat() {
		this.chatIcon.forEach(icon => {
			icon.addEventListener('mouseenter', () => {
				this.chatText.classList.add(css.active);
			});
		});
		this.chatIcon.forEach(icon => {
			icon.addEventListener('mouseleave', () => {
				this.chatText.classList.remove(css.active);
			});
		});
	}
}