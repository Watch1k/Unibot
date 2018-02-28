import HomeAdvantage from './home/advatage';
import HomeExample from './home/example';
import HomeHow from './home/how';
import HomeLoc from './home/loc';
import HomeScreen from './home/screen';

export default class Home {
	constructor() {
		this.init();
	}
	
	init() {
		new HomeScreen();
		new HomeHow();
		new HomeLoc();
		new HomeAdvantage();
		new HomeExample();
	}
}
