import { TweenMax } from 'gsap';
import 'gsap/ScrollToPlugin';
import ScrollAnim from '../../modules/dev/animation/scrollAnim';
import { css, Resp } from '../../modules/dev/helpers';

class Section {
	constructor() {
		this.section = [...document.querySelectorAll('[data-scroll-section]')];
		this.navigation = document.querySelector('.navigation');
		this.navigationCurrent = this.navigation.querySelector('.navigation__current');
		this.navigationTotal = this.navigation.querySelector('.navigation__total');
		this.navigationBtn = document.querySelector('.navigation-btn');
		
		if (this.section) this.init();
	}
	
	init() {
		this.prepare();
		window.addEventListener('load', () => {
			if (Resp.isDesk) this.events();
			this.buttonEvents();
		});
	}
	
	prepare() {
		this.sectionLength = this.section.length;
		const dot = document.createElement('div');
		
		dot.classList.add('navigation__dot');
		
		for (let i = 0, len = this.sectionLength; i < len; i++) {
			this.navigation.append(dot.cloneNode());
		}
		
		this.navigationTotal.innerHTML = do {
			if (this.sectionLength < 10) {
				'0' + this.sectionLength;
			} else {
				this.sectionLength;
			}
		};
	}
	
	events() {
		const _this = this;
		
		this.section.forEach((item, index) => {
			item.dataset.index = '' + index;
			
			new ScrollAnim({
				el: item,
				reverse: true,
				inView: true,
				inViewSection: true,
				onEnter() {
					_this.section.forEach(section => section.classList.remove(css.active));
					item.classList.add(css.active);
					
					_this.navigationCurrent.innerHTML = do {
						if (+item.dataset.index + 1 < 10) {
							'0' + (+item.dataset.index + 1);
						} else {
							+item.dataset.index + 1;
						}
					};
					
					if (+item.dataset.index + 1 === _this.sectionLength) {
						_this.navigationBtn.classList.add(css.active);
					} else {
						_this.navigationBtn.classList.remove(css.active);
					}
				}
			});
		});
	}
	
	buttonEvents() {
		this.navigationBtn.addEventListener('click', () => {
			if (Resp.isDesk) {
				if (this.navigationBtn.classList.contains(css.active)) {
					TweenMax.to(window, 1.5, { scrollTo: { y: 0, autoKill: false } });
				} else {
					const targetSection = this.section.filter(item => item.classList.contains(css.active));
					const targetIndex = this.section.indexOf(targetSection[0]);
					TweenMax.to(window, 1.5, { scrollTo: { y: '#' + this.section[targetIndex + 1].id, autoKill: false } });
				}
			} else {
				TweenMax.to(window, 1.5, { scrollTo: { y: window.innerHeight, autoKill: false } });
			}
		});
	}
}

export default new Section();
