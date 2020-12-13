<template>
	<div class="container">
		<LMap
			ref="map"
			@update:center="centerUpdate"
			@update:zoom="zoomUpdate"
			:zoom="zoom"
			:center="center"
			:options="mapOptions"
		>
			<LTileLayer :url="url" :attribution="attribution" />
		</LMap>
	</div>
</template>

<script>
import { latLng } from 'leaflet';
import { LMap, LTileLayer } from 'vue2-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';

export default {
	name: 'Map',
	components: { LMap, LTileLayer },
	data() {
		return {
			zoom: 13,
			center: latLng(47.41322, -1.219482),
			mapOptions: {
				zoomSnap: 0.5,
			},
			url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			attribution:
				'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
			provider: '',
		};
	},
	methods: {
		zoomUpdate(zoom) {
			this.currentZoom = zoom;
		},
		centerUpdate(center) {
			this.currentCenter = center;
		},
	},
	async created() {
		this.provider = new OpenStreetMapProvider();
		let results = await this.provider.search({
			query: 'Rua Aquilino Ribeiro Carnaxide',
		});
		console.log(results);
		this.center = latLng(results[0].y, results[0].x);
		this.zoom = 18;
	},
};
</script>

<style lang="scss" scoped>
@import '@/global';

.container {
	color: white;
	margin: auto;
	font-size: 2em;
	width: 100%;
	height: 100%;
}
</style>
