import { TimelineMax, TweenMax } from 'gsap';
import { css, currentPage, detectIE, Resp } from '../modules/dev/helpers';

class Preloader {
	constructor() {
		this.container = document.querySelector('.preloader');
		this.init();
	}
	
	async init() {
		this.animPreloader();
		await this.wait();
		if (Resp.isDesk) this.contentAnim();
	}
	
	wait() {
		return this.resolve;
	}
	
	animPreloader() {
		this.resolve = new Promise(resolve => {
			if (currentPage === 'home') {
				window.addEventListener('load', () => {
					const tl = new TimelineMax();
					
					if (Resp.isDesk) {
						tl
							.add(() => {
								this.container.classList.add(css.start);
							}, 0)
							.add(() => {
								this.container.classList.add(css.end);
								if (detectIE()) {
									this.container.classList.add('hide-ie');
								}
								resolve();
							}, 1)
							.add(() => {
								this.container.classList.add(css.hidden);
							}, 2);
					} else {
						tl
							.add(() => {
								resolve();
							})
							.to(this.container, 0.5, {
								autoAlpha: 0,
								delay: 0.35
							}, '+=0.1');
					}
				});
			} else {
				resolve();
				TweenMax.to(this.container, 0.25, {
					autoAlpha: 0,
					delay: 0.1
				});
			}
		});
	}
	
	contentAnim() {
		const header = document.querySelector('.header');
		const screen = document.querySelector('.screen__content');
		const tl = new TimelineMax();
		
		tl
			.add(() => {
				if (header) {
					TweenMax.set(header, { alpha: 0 });
					if (currentPage === 'home') {
						TweenMax.to(header, 1, { alpha: 1, delay: Resp.isDesk ? 0.6 : 0.15 });
					} else {
						TweenMax.to(header, 0.5, { alpha: 1 });
					}
				}
			})
			.add(() => {
				if (screen) {
					TweenMax.set(screen, { alpha: 0 });
					TweenMax.to(screen, 1, { alpha: 1, delay: Resp.isDesk ? 0.7 : 0.25 });
				}
			});
	}
}

export const preloader = new Preloader();
