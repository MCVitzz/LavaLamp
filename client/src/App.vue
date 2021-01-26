<template>
	<div id="app">
		<MasterPageComponent :key="key" @redraw="forceUpdate">
			<router-view :key="key" @redraw="forceUpdate" />
		</MasterPageComponent>
	</div>
</template>
<script>
import MasterPageComponent from './components/pages/master/MasterPageComponent';

export default {
	name: 'App',
	data() {
		return {
			key: 1, //When changed causes a force update
		};
	},
	methods: {
		forceUpdate: function() {
			console.log('Force update');
			this.key++;
		},
	},
	components: { MasterPageComponent },
};
</script>
<style lang="scss">
@import '@/global';

html {
	background: $background-color;
}

#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	display: flex;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
}
</style>
