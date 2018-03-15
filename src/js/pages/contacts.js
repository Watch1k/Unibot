export default class Contacts {
	constructor() {
		this.container = document.querySelector('.contacts');
		this.mapContainer = this.container.querySelector('.contacts__map');
		this.mapCenter = this.mapContainer.getAttribute('data-map-center').split(',').map(parseFloat);
		this.mapSettings = {
			center: new google.maps.LatLng(this.mapCenter[0], this.mapCenter[1]),
			zoom: 17
		};
		this.markerSettings = {
			position: this.mapSettings.center,
			icon: {
				url: this.mapContainer.getAttribute('data-marker-path'),
				scaledSize: new google.maps.Size(32, 42)
			}
		};
		
		if (this.container) this.init();
	}
	
	init() {
		this.markerSettings.map = new google.maps.Map(this.mapContainer, this.mapSettings);
		new google.maps.Marker(this.markerSettings);
	}
}
