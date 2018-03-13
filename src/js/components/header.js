import { TimelineMax, TweenMax } from 'gsap';
import 'gsap/ScrollToPlugin';
import { css, currentPage, Resp, throttle } from '../modules/dev/helpers';

class Header {
	constructor() {
		this.container = document.querySelector('.header');
		this.nav = this.container.querySelector('.header__nav');
		this.menuBtn = this.container.querySelector('.header__menu-btn');
		this.mobileChatBtn = this.container.querySelector('.header__mobile-chat-btn');
		this.lang = this.container.querySelector('.header__lang');
		
		this.init();
	}
	
	init() {
		this.initScroll();
		this.initLang();
		if (!Resp.isDesk) {
			this.prepareMobile();
			this.initNav();
			this.initMobileHeader();
		}
	}
	
	initLang() {
		[...this.lang.querySelectorAll('a')][0].addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			this.lang.classList.add(css.active);
		});
		
		document.addEventListener('click', () => {
			if (this.lang.classList.contains(css.active)) {
				this.lang.classList.remove(css.active);
			}
		});
	}
	
	initScroll() {
		const offsetTop = Resp.isMobile ? 50 : Resp.isTablet ? 25 : 0;
		
		[...this.nav.querySelectorAll('a')].forEach(item => {
			item.addEventListener('click', (e) => {
				if (item.href.indexOf('#') !== -1) {
					e.preventDefault();
					const href = item.href;
					const hashName = href.slice(href.indexOf('#') + 1, href.length);
					
					TweenMax.to(window, 1.5, {
						scrollTo: {
							y: document.getElementById(hashName).getBoundingClientRect().top + window.pageYOffset - offsetTop,
							autoKill: false
						}
					});
				}
			});
		});
	}
	
	initNav() {
		const _this = this;
		const navTl = new TimelineMax({
			paused: true,
			onReverseComplete() {
				_this.triggerInd = false;
				_this.checkWithThrottle();
			}
		});
		
		this.menuBtn.addEventListener('click', () => {
			this.menuBtn.classList.toggle(css.active);
			if (this.menuBtn.classList.contains(css.active)) {
				this.container.classList.add(css.fixed);
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
			}, 0.04, '-=0.15')
			.set(this.nav.children[0], {
				css: {
					overflow: 'auto'
				}
			});
	}
	
	prepareMobile() {
		if (currentPage !== 'home') return;
		const li = document.createElement('li');
		
		[...this.nav.children][0].prepend(li);
		li.appendChild(this.mobileChatBtn.children[0]);
		li.children[0].classList.add('js-chat-init');
	}
	
	initMobileHeader() {
		const _this = this;
		const delta = window.innerHeight;
		this.triggerInd = false;
		
		this.checkWithThrottle = throttle(() => {
			if (this.menuBtn.classList.contains(css.active)) return;
			
			const scrollTop = window.pageYOffset;
			
			if (scrollTop < delta) {
				if (this.triggerInd) return;
				this.triggerInd = true;
				
				TweenMax.to(this.container, scrollTop === 0 ? 0 : 0.25, {
					y: '-100%',
					onComplete() {
						TweenMax.set(_this.container, { y: '0%', clearProps: 'transform' });
						_this.container.classList.remove(css.fixed);
					}
				});
			} else {
				if (this.container.classList.contains(css.fixed)) return;
				this.triggerInd = false;
				
				TweenMax.set(this.container, { y: '-100%' });
				this.container.classList.add(css.fixed);
				TweenMax.to(this.container, 0.5, { y: '0%' });
			}
		}, 50, this);
		
		this.checkWithThrottle();
		window.addEventListener('scroll', this.checkWithThrottle);
		
		return this;
	}
}

export const HeaderAPI = new Header();
