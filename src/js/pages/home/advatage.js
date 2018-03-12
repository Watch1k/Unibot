import { Resp } from '../../modules/dev/helpers';
import { tns } from '../../../../node_modules/tiny-slider/src/tiny-slider.module';

export default class HomeAdvantage {
	constructor() {
		this.container = document.querySelector('.advantage');
		this.list = this.container.querySelector('.advantage__list');
		this.listItem = [...this.list.querySelectorAll('.advantage__list-item')];
		this.sliderCounterCurrent = this.container.querySelector('.advantage__list-counter-current');
		this.sliderCounterTotal = this.container.querySelector('.advantage__list-counter-total');
		
		this.init();
	}
	
	init() {
		if (!Resp.isMobile) return;
		
		this.prepareSlider();
		this.initSlider();
	}
	
	prepareSlider() {
		let div;
		
		this.listItem.forEach((item, index) => {
			if (index % 2 === 0) {
				div = document.createElement('div');
				this.list.insertBefore(div, this.listItem[index]);
				div.classList.add('advantage__list-item-slider');
			}
			div.appendChild(this.listItem[index]);
		});
	}
	
	initSlider() {
		this.slider = tns({
			container: '.advantage__list',
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
			this.refreshCounter();
		});
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
