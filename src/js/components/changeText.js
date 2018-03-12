import { Resp } from '../modules/dev/helpers';

export default class ChangeText {
	constructor(el) {
		this.el = el;
		
		if (this.el) this.init();
	}
	
	init() {
		if (Resp.isDesk) return;
		
		if (Resp.isMobile && this.el.hasAttribute('data-text-mobile')) {
			this.el.innerHTML = this.el.getAttribute('data-text-mobile');
		} else if (this.el.hasAttribute('data-text-tablet')) {
			this.el.innerHTML = this.el.getAttribute('data-text-tablet');
		}
	}
}
