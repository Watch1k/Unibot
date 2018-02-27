import HomeHow from './home/how';
import HomeScreen from './home/screen';

export default class Home {
	constructor() {
		this.init();
	}
	
	init() {
		new HomeScreen();
		new HomeHow();
	}
}
