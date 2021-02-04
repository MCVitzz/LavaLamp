<template>
	<div class="container">
		<p>To change Address change Destination</p>
		<BaseMap class="base-map" :center="address" ref="map" />
		<Button class="button" value="OK" @clicked="submit" />
		<Button class="button" value="Get Route" @clicked="getRoute" />
	</div>
</template>
<script>
import BaseMap from './BaseMap';
import Button from './Button';
import AddressServices from '../../services/AddressServices';

export default {
	name: 'BaseAddress',
	components: { BaseMap, Button },
	props: ['address'],
	data() {
		return {
			adrs: {},
		};
	},
	methods: {
		submit: async function() {
			let adrs = this.$refs.map.directions.getDestination().geometry
				.coordinates;
			let address = {};
			if (this.address) address = { id: this.address };
			if (adrs) {
				address.longitude = adrs[0];
				address.latitude = adrs[1];
				console.log(adrs);
				if (address.id) {
					await AddressServices.updateAddress(address);
				} else {
					address.id = await AddressServices.addAddress(address);
				}
				this.$emit('changed', address.id);
			}
		},
		getRoute: function() {
			let directions = this.$refs.map.directions;
			if (!('geolocation' in navigator))
				throw new Error('Geolocation is not available in the current browser.');
			let address = this.address;
			navigator.geolocation.getCurrentPosition(function(pos) {
				directions.setOrigin([pos.coords.longitude, pos.coords.latitude]);
				directions.setDestination(address);
			});
		},
	},
	async mounted() {
		this.adrs = await AddressServices.getAddress(this.address);
		console.log(this.adrs);
		this.$refs.map.setCenter([this.adrs.longitude, this.adrs.latitude]);
		this.$refs.map.directions.setDestination([
			this.adrs.longitude,
			this.adrs.latitude,
		]);
	},
};
</script>
<style lang="scss" scoped>
@import '@/global';
.base-map {
	width: 100%;
	height: 100%;
}

.button {
	margin-left: 2vh;
}
</style>
