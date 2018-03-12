import { Resp } from '../modules/dev/helpers';

export default class ChangeText {
	constructor(el) {
		this.el = el;
		
		if (this.el) this.init();
	}
	
	init() {
		if (Resp.isDesk) return;
		
		this.el.innerHTML = do {
			if (Resp.isMobile) {
				this.el.getAttribute('data-text-mobile');
			} else {
				this.el.getAttribute('data-text-tablet');
			}
		};
	}
}
