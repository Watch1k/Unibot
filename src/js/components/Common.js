import { TweenMax } from 'gsap';
import objectFitImages from 'object-fit-images';
import { Resp } from '../modules/dev/helpers';
import ChangeText from './changeText';
import './header';
import './noTouch';
import './preloader';

export class Common {
	constructor() {
		this.init();
		this.changeText();
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
}

export default new Common();
