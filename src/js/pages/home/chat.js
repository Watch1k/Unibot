import { TweenMax, TimelineMax } from 'gsap';
import 'gsap/ScrollToPlugin';

class Chat {
	constructor() {
		this.container = document.querySelector('.chat');
		this.initBtn = document.querySelectorAll('.js-chat-init');
		this.chatHeight = 480;
		
		if (this.container) this.init();
	}
	
	init() {
		this.bindEvents();
	}
	
	bindEvents() {
		this.initBtn.forEach(item => {
			item.addEventListener('click', (e) => {
				e.preventDefault();
				this.scrollToChat();
				this.initChat();
			})
		});
	}
	
	initChat() {
		TweenMax.to(this.container, 1, { height: this.chatHeight });
	}
	
	scrollToChat() {
		TweenMax.to(window, 1, { scrollTo: '#chat' });
	}
}

export default new Chat();
