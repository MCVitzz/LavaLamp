<template>
	<div class="container">
		<Map ref="map" />
		<div class="controls-container">
			<Autocomplete
				ref="autocomplete"
				class="autcomplete"
				@changed="changed"
				:provider="provider"
			/>
			<Button class="button" value="OK" @clicked="submit" />
		</div>
	</div>
</template>

<script>
import Autocomplete from './Autocomplete';
import Map from './Map';
import Button from './Button';
import AddressServices from '../../services/AddressServices';

export default {
	name: 'AddressFinder',
	components: { Autocomplete, Map, Button },
	props: ['address'],
	methods: {
		provider: async function(value) {
			let result = await this.search(value);
			let parsedResult = this.parseResults(result);
			return parsedResult;
		},
		search: async function(value) {
			return await this.$refs.map.searchAddress(value);
		},
		changed: function(val) {
			this.$refs.map.setCenter(val.x, val.y);
		},
		submit: async function() {
			let center = this.$refs.map.center;
			let address = {};
			if (this.address) address = { id: this.address };
			if (center) {
				console.log(center);
				address.latitude = center.lat;
				address.longitude = center.lng;
				address.street = this.$refs.autocomplete.value;
				if (address.id) {
					await AddressServices.updateAddress(address);
				} else {
					address.id = await AddressServices.addAddress(address);
				}
				this.$emit('changed', address.id);
			}
		},
		parseResults: function(results) {
			let parsed = [];
			for (let item of results) {
				let details = item.label.split(',');
				parsed.push({
					text: `${details[0]}, ${details[1]}, ${details[2]}, ${
						details[details.length - 1]
					}`,
					value: { x: item.x, y: item.y },
				});
			}
			return parsed;
		},
	},
	async created() {
		if (this.address) {
			let address = await AddressServices.getAddress(this.address);
			this.$refs.autocomplete.setValue(address.street);
			this.$refs.map.setCenter(address.longitude, address.latitude);
		}
	},
};
</script>

<style lang="scss" scoped>
@import '@/global';

.container {
	display: flex;
}

.button {
	margin-left: 2vh;
}

.controls-container {
	display: block;
}

.autocomplete {
	height: fit-content;
}
</style>
