import '../../modules/dep/clamp';

export default class HomeTop {
	constructor() {
		this.container = document.querySelector('.top');
		this.cards = [...this.container.querySelectorAll('.card')];
		this.cardTitleName = '.card__title';
		this.cardTextName = '.card__text';
		
		this.init();
	}
	
	init() {
		this.initClamp();
	}
	
	initClamp() {
		this.cards.forEach(card => {
			const heightMax = 220;
			const title = card.querySelector(this.cardTitleName);
			const text = card.querySelector(this.cardTextName);
			
			$clamp(text, { clamp: heightMax - title.clientHeight + 'px' });
		});
	}
}
