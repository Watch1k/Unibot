import { BlogAPI } from '../pages/blog';
import { ContactsAPI } from '../pages/contacts';
import { ModalAPI } from './modal';

export class PublicAPI {
	static get Modal() {
		return {
			success: (id) => ModalAPI.initTy(id)
		};
	}
	
	static ContactsSuccess() {
		ContactsAPI.initTy();
	}
	
	static refreshBlog() {
		BlogAPI.initClamp();
	}
}

/** Expose Public API */
export default window.PublicAPI = PublicAPI;
