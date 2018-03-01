import { TweenMax, TimelineMax } from 'gsap';
import 'gsap/ScrollToPlugin';

class Header {
	constructor() {
		this.container = document.querySelector('.header');
		this.nav = document.querySelector('.header__nav');
		
		this.init();
	}
	
	init() {
		this.initScroll();
	}
	
	initScroll() {
		[...this.nav.querySelectorAll('a')].forEach(item => {
			console.log(item);
			item.addEventListener('click', (e) => {
				if (item.href.indexOf('#') !== -1) {
					e.preventDefault();
					const href = item.href;
					const hashName = href.slice(href.indexOf('#'), href.length);
					
					TweenMax.to(window, 1.5, { scrollTo: hashName })
				}
			});
		})
	}
}

export const HeaderAPI = new Header();
