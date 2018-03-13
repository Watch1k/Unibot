'use strict';

/**
 * App entry point.
 *
 * @module App
 */

/** Import initialized-by-default modules/libs */
import 'babel-polyfill';
import './components/Common';
import './components/PublicAPI';

import { currentPage } from './modules/dev/helpers';
/** Import page controllers */
import Home from './pages/Home';

/**
 * Run appropriate scripts for each page.
 **/
switch (currentPage) {
	case 'home':
		new Home;
		break;
	
	case '404':
		break;
	
	/** No page found */
	default:
		console.warn('Undefined page');
}
