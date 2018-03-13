import { TweenMax } from 'gsap';
import objectFitImages from 'object-fit-images';
import { css, Resp } from '../modules/dev/helpers';
import ChangeText from './changeText';
import './header';
import './modal';
import './noTouch';
import './preloader';

export class Common {
	constructor() {
		this.init();
		this.changeText();
		this.formValidation();
	}
	
	init() {
		objectFitImages();
		this.toTop();
	}
	
	changeText() {
		if (Resp.isMobile) {
			document.querySelectorAll('[data-text-mobile]').forEach(item => {
				new ChangeText(item);
			});
		} else if (Resp.isTablet) {
			document.querySelectorAll('[data-text-mobile]').forEach(item => {
				new ChangeText(item);
			});
		}
	}
	
	toTop() {
		const btn = [...document.querySelectorAll('.js-to-top')];
		
		btn.forEach(item => {
			item.addEventListener('click', () => {
				TweenMax.to(window, 1.5, {
					scrollTo: { y: 0, autoKill: false }
				});
			});
		});
	}
	
	formValidation() {
		[...document.querySelectorAll('input')].forEach(item => {
			item.addEventListener('click', () => {
				item.parentElement.classList.remove(css.error);
			})
		})
	}
}

export default new Common();
