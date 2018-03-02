import objectFitImages from 'object-fit-images';
import './noTouch';
import './preloader';
import './header';
import './section';

export class Common {
	constructor() {
		this.init();
	}
	
	init() {
		objectFitImages();
	}
}

export default new Common();
