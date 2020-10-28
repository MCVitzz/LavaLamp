<template>
	<div id="app">
		<Sidebar />
		<MemberComponent />
	</div>
</template>

<script>
import MemberComponent from './components/pages/MemberComponent.vue';
import Sidebar from './components/pages/SidebarComponent.vue';

export default {
	name: 'App',
	components: {
		MemberComponent,
		Sidebar,
	},
};
</script>

<style>
@font-face {
	font-family: 'Montserrat';
	src: local('Montserrat'),
		url(./assets/fonts/Montserrat/Montserrat-Regular.ttf) format('truetype');
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

html {
	background: #1c1c1c;
}

#app {
	font-family: Montserrat, Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	margin-top: 60px;
	display: flex;
}
</style>
