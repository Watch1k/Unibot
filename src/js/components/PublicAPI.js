import { ModalAPI } from './modal';

export class PublicAPI {
	static get Modal() {
		return {
			success: (id) => ModalAPI.initTy(id)
		};
	}
}

/** Expose Public API */
export default window.PublicAPI = PublicAPI;
