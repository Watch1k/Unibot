import objectFitImages from 'object-fit-images';
import './noTouch';

export class Common {
	constructor() {
		this.init();
	}
	
	init() {
		objectFitImages();
	}
}

export default new Common();
