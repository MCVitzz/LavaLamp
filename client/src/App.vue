<template>
	<div id="app">
		<Sidebar v-if="shouldShowSidebar" />
		<div class="container">
			<UserComponent class="user" v-if="shouldShowSidebar" />
			<router-view />
		</div>
	</div>
</template>
<script>
import Sidebar from './components/pages/SidebarComponent.vue';
import UserComponent from './components/pages/UserComponent.vue';
export default {
	name: 'App',
	components: {
		Sidebar,
		UserComponent,
	},
	computed: {
		shouldShowSidebar() {
			return this.$route.meta.sidebar !== false;
		},
	},
};
</script>
<style lang="scss">
@import './global';

html {
	background: $background-color;
}

.container {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 100%;
}

.user {
	width: 100%;
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
