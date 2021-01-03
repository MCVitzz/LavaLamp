<template>
	<HomeComponent class="main" />
</template>
<script>
import HomeComponent from '../components/pages/home/HomeComponent';

export default {
	name: 'Home',
	components: { HomeComponent },
};
</script>
<style lang="scss" scoped>
@import '@/global';

.main {
	width: 100%;
	height: 100%;
	max-width: 100%;
	max-height: 100%;
	overflow: hidden;
}
</style>
