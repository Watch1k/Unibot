import { css, debounce, Resp } from '../modules/dev/helpers';

class NoTouch {
	constructor() {
		NoTouch.init();
	}
	
	static init() {
		const body = document.querySelector('body');
		const toggleNoTouch = () => {
			if (Resp.isDesk) {
				body.classList.add(css.noTouch);
			} else {
				body.classList.remove(css.noTouch);
			}
		};
		
		toggleNoTouch();
		window.addEventListener('resize', debounce(toggleNoTouch, this, 250));
	}
}

export default new NoTouch();
