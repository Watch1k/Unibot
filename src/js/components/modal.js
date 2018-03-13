import MODALit from '../../../node_modules/modalit/dist/MODALit';
import { Resp } from '../modules/dev/helpers';

class Modal {
	constructor() {
		this.btn = [...document.querySelectorAll('.js-modal')];
		
		this.init();
	}
	
	init() {
		if (Resp.isMobile) {
			[...document.querySelectorAll('.modal')].forEach(item => item.setAttribute('data-modal-width', 'full'));
		}
		
		this.btn.forEach(btn => {
			btn.addEventListener('click', (e) => {
				e.preventDefault();
			});
			
			new MODALit({
				el: btn,
				transition: Resp.isMobile ? 'slideUp' : 'slideDown'
			});
		});
	}
}

export default new Modal();
