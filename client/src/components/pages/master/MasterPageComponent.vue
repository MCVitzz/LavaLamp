<template>
	<div class="container">
		<Sidebar class="sidebar" v-if="shouldShowSidebar" />
		<div class="main">
			<Topbar :shouldShowSidebar="shouldShowSidebar" @redraw="redraw" />
			<h1 class="title">{{ $route.meta.title }}</h1>
			<slot />
		</div>
	</div>
</template>

<script>
import Sidebar from './SidebarComponent.vue';
import Topbar from './TopbarComponent.vue';

export default {
	name: 'MasterPageComponent',
	components: {
		Sidebar,
		Topbar,
	},
	methods: {
		redraw: function() {
			this.$emit('redraw');
		},
	},
	computed: {
		shouldShowSidebar() {
			return this.$route.meta.sidebar !== false;
		},
	},
};
</script>

<style lang="scss" scoped>
@import '@/global';

.container {
	display: flex;
	width: 100%;
	max-width: 100%;
	height: 100%;
	max-height: 100%;
}

.main {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 100%;
}

.title {
	color: white;
	font-size: 3em;
	text-align: left;
	padding-left: 6vh;
}
</style>
