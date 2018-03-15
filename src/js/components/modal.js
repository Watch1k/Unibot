import MODALit from '../modules/dep/MODALit.min';
import { css, Resp } from '../modules/dev/helpers';

class Modal {
	constructor() {
		this.btn = [...document.querySelectorAll('.js-modal')];
		this.scrollTop = 0;
		
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
				transition: 'zoom',
				fixed: true,
				events: {
					show() {
						if (!Resp.isMobile) return;
						this.scrollTop = window.pageYOffset;
						setTimeout(() => {
							document.querySelector('body').classList.add(css.fixed);
						}, 500);
					},
					hide() {
						if (!Resp.isMobile) return;
						document.querySelector('body').classList.remove(css.fixed);
						window.scrollTo(0, this.scrollTop);
					}
				}
			});
		});
	}
}

export default new Modal();
