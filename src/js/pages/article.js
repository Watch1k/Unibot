import { debounce } from '../modules/dev/helpers';

export default class Article {
	constructor() {
		this.articleHeader = document.querySelector('.article-header');
		this.articleHeaderBg = this.articleHeader.querySelector('.article-header__bg');
		this.init();
	}
	
	init() {
		this.bgPosition();
		
		window.addEventListener('resize', debounce(this.bgPosition, this, 400));
	}
	
	bgPosition() {
		this.articleHeaderBg.style.top = -this.articleHeader.getBoundingClientRect().top - window.scrollY + 'px';
	}
}
