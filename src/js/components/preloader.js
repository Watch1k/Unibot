import { TimelineMax } from 'gsap';
import { css } from '../modules/dev/helpers';

class Preloader {
	constructor() {
		this.container = document.querySelector('.preloader');
		this.init();
	}
	
	init() {
		this.animPreloader();
	}
	
	wait() {
		return this.resolve;
	}
	
	animPreloader() {
		this.resolve = new Promise(resolve => {
			window.addEventListener('load', () => {
				const tl = new TimelineMax();
				tl
					.add(() => {
						this.container.classList.add(css.start);
					}, 0)
					.add(() => {
						this.container.classList.add(css.end);
						resolve;
					}, 1);
			});
		});
	}
}

export const preloader = new Preloader();
