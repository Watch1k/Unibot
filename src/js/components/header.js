import { TimelineMax, TweenMax } from 'gsap';
import 'gsap/ScrollToPlugin';
import { css, Resp } from '../modules/dev/helpers';

class Header {
	constructor() {
		this.container = document.querySelector('.header');
		this.nav = this.container.querySelector('.header__nav');
		this.menuBtn = this.container.querySelector('.header__menu-btn');
		
		this.init();
	}
	
	init() {
		this.initScroll();
		this.initNav();
	}
	
	initScroll() {
		[...this.nav.querySelectorAll('a')].forEach(item => {
			item.addEventListener('click', (e) => {
				if (item.href.indexOf('#') !== -1) {
					e.preventDefault();
					const href = item.href;
					const hashName = href.slice(href.indexOf('#'), href.length);
					
					TweenMax.to(window, 1.5, { scrollTo: hashName });
				}
			});
		});
	}
	
	initNav() {
		const navTl = new TimelineMax({ paused: true });
		
		this.menuBtn.addEventListener('click', () => {
			this.menuBtn.classList.toggle(css.active);
			if (this.menuBtn.classList.contains(css.active)) {
				navTl.timeScale(1).play();
			} else {
				navTl.timeScale(2).reverse();
			}
		});
		
		if (!Resp.isDesk) {
			this.nav.querySelectorAll('a').forEach(item => {
				item.addEventListener('click', () => {
					this.menuBtn.click();
				});
			});
		}
		
		navTl
			.to(this.nav, 0.3, {
				autoAlpha: 1
			})
			.staggerFromTo(this.nav.querySelectorAll('li'), 0.3, {
				alpha: 0,
				y: 20
			}, {
				alpha: 1,
				y: 0
			}, 0.04);
	}
}

export const HeaderAPI = new Header();
