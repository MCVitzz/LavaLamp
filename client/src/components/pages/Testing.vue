<template>
	<div>
		<BaseAddress ref="map" address="Guimarães, Portugal" @changed="changed" />
		<input type="button" @click="center" />
	</div>
</template>

<script>
import BaseAddress from '../layout/BaseAddress.vue';

export default {
	name: 'Testing',
	components: { BaseAddress },
	methods: {
		changed: function(val) {
			console.log(val);
		},
		center: function() {
			console.log(this.$refs.map.map.getCenter());
		},
	},
};
</script>

<style lang="scss" scoped>
@import '@/global';

div {
	color: white;
	width: 80%;
	height: 80%;
	padding: 4vh;
}
</style>
