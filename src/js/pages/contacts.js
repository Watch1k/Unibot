import { TimelineMax } from 'gsap';
import { Resp } from '../modules/dev/helpers';

class Contacts {
	constructor() {
		this.container = document.querySelector('.contacts');
		if (!this.container) return;
		this.mapContainer = this.container.querySelector('.contacts__map');
		this.mapCenter = this.mapContainer.getAttribute('data-map-center').split(',').map(parseFloat);
		this.mapSettings = {
			center: new google.maps.LatLng(this.mapCenter[0], this.mapCenter[1]),
			zoom: Resp.isMobile ? 16.9 : 17,
			zoomControlOptions: {
				position: google.maps.ControlPosition.RIGHT_CENTER
			}
		};
		this.markerSettings = {
			position: this.mapSettings.center,
			icon: {
				url: this.mapContainer.getAttribute('data-marker-path'),
				scaledSize: new google.maps.Size(32 * 1.3, 42 * 1.3)
			}
		};
		
	}
	
	init() {
		this.markerSettings.map = new google.maps.Map(this.mapContainer, this.mapSettings);
		new google.maps.Marker(this.markerSettings);
	}
	
	initTy() {
		const callback = document.querySelector('.footer__callback');
		const content = callback.querySelector('.footer__callback-content');
		const contentShow = callback.querySelector('.footer__callback-content-show');
		
		new TimelineMax({
			onComplete() {
				new TimelineMax()
					.add(() => {
						content.querySelector('.form').reset();
					})
					.to(contentShow, 0.5, { autoAlpha: 0 }, 2.5)
					.to(content, 0.5, { autoAlpha: 1 });
			}
		})
			.to(content, 0.5, { autoAlpha: 0 })
			.to(contentShow, 0.5, { autoAlpha: 1 });
	}
}

export const ContactsAPI = new Contacts();
