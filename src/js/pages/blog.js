import { Resp } from '../modules/dev/helpers';
import '../modules/dep/clamp';

class Blog {
	constructor() {
		this.container = document.querySelector('.blog');
		if (!this.container) return;
		this.cards = () => [...this.container.querySelectorAll('.card')];
		this.cardTitleName = '.card__title';
		this.cardTextName = '.card__text';
		this.sliderCounterCurrent = this.container.querySelector('.top__list-counter-current');
		this.sliderCounterTotal = this.container.querySelector('.top__list-counter-total');
		
		this.init();
	}
	
	init() {
		this.initClamp();
	}
	
	initClamp() {
		if (Resp.isMobile) return;
		
		this.cards().forEach(card => {
			const heightMax = card.classList.contains('card_large') ? Resp.isDesk ? 178 : 204 : 204;
			const title = card.querySelector(this.cardTitleName);
			const text = card.querySelector(this.cardTextName);
			
			if (card.classList.contains('card_large')) {
				text.style.maxHeight = heightMax - title.clientHeight + 'px';
			} else {
				text.style.height = heightMax - title.clientHeight + 'px';
			}
			$clamp(text.children[0], { clamp: heightMax - title.clientHeight + 'px' });
		});
	}
}

export const BlogAPI = new Blog();