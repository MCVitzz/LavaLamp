<template>
	<div class="container">
		<LMap
			ref="map"
			@update:center="centerUpdate"
			:zoom.sync="zoom"
			:center="center"
			:options="mapOptions"
		>
			<LTileLayer :url="url" :attribution="attribution" />
			<LMarker :lat-lng="center"> </LMarker>
		</LMap>
	</div>
</template>

<script>
import { latLng, Icon } from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';

export default {
	name: 'Map',
	components: { LMap, LTileLayer, LMarker },
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
		centerUpdate: function(center) {
			this.currentCenter = center;
		},
		searchAddress: async function(address) {
			return await this.provider.search({
				query: address,
			});
		},
		setCenter: function(x, y) {
			this.center = latLng(y, x);
			this.zoom = 18;
		},
	},
	async created() {
		delete Icon.Default.prototype._getIconUrl;
		Icon.Default.mergeOptions({
			iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
			iconUrl: require('leaflet/dist/images/marker-icon.png'),
			shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
		});
		this.provider = new OpenStreetMapProvider();
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
