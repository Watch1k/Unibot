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
/** Import page controllers */
import { currentPage } from './modules/dev/helpers';
import Article from './pages/article';
import { BlogAPI } from './pages/blog';
import { ContactsAPI } from './pages/contacts';
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
	
	case 'contacts':
		ContactsAPI.init();
		break;
	
	case 'blog':
		BlogAPI.init();
		break;
	
	case 'article':
		new Article;
		break;
	
	/** No page found */
	default:
		console.warn('Undefined page');
}
