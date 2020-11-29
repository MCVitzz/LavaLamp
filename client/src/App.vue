<template>
	<div id="app">
		<Sidebar />
		<router-view />
	</div>
</template>
<script>
import Sidebar from './components/pages/SidebarComponent.vue';
export default {
	name: 'App',
	components: {
		Sidebar,
	},
};
</script>
<style lang="scss">
@import './global';

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
