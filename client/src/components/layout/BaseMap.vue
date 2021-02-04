<template>
	<div>
		<div id="mapContainer" class="basemap"></div>
	</div>
</template>
<script>
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export default {
	name: 'BaseMap',
	props: ['center'],
	data() {
		return {
			map: {},
			accessToken:
				'pk.eyJ1IjoibWN2aXR6eiIsImEiOiJja2tpdDcwZHUxcXR4Mm5tbnpoY3JwcXZ1In0.AVRKDMASEL6fSFbPRFXw7w',
			saccessToken:
				'sk.eyJ1IjoibWN2aXR6eiIsImEiOiJja2tyMWw0cnowMDgwMm9waTBpdHR4cHE1In0.9X5ECopp6l-CqAYpyjmEsQ',
			centr: [0, 0],
			directions: {},
		};
	},
	methods: {
		setCenter: function(center) {
			console.log(center);
			this.map.setCenter(center);
			new mapboxgl.Marker().setLngLat(center).addTo(this.map);
		},
	},
	mounted() {
		mapboxgl.accessToken = this.accessToken;
		this.map = new mapboxgl.Map({
			container: 'mapContainer', // container id
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [-74.5, 40], // starting position
			zoom: 9, // starting zoom
		});
		this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');
		this.directions = new MapboxDirections({
			accessToken: this.accessToken,
			unit: 'metric',
			profile: 'mapbox/driving',
		});
		this.map.addControl(this.directions, 'top-left');
		this.map.addControl(
			new MapboxGeocoder({
				accessToken: mapboxgl.accessToken,
				mapboxgl: mapboxgl,
			}),
			'bottom-right'
		);
	},
	created() {
		this.centr = this.center;
	},
};
</script>

<style lang="scss" scoped>
@import '@/global';
.basemap {
	width: 100%;
	height: 100%;
}
</style>
