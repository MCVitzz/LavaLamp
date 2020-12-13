<template>
	<div>
		<Map />
	</div>
</template>

<script>
import Map from '../layout/Map';
import 'leaflet/dist/leaflet.css';

export default {
	name: 'Testing',
	components: { Map },
};
</script>

<style lang="scss" scoped>
@import '@/global';

div {
	color: white;
	margin: auto;
	font-size: 2em;
	width: 100%;
	height: 100%;
	padding: 4vh;
}
</style>
