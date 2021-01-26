<template>
	<img v-if="!horizontal" class="logo" src="@/assets/logo.svg" />
	<img v-else class="logo horizontal" src="@/assets/logoh.svg" />
</template>

<script>
export default {
	name: 'Logo',
	props: ['horizontal'],
};
</script>
<style lang="scss" scoped>
@import '@/global';

.logo {
	object-fit: contain;
	width: 4vh;
}

.horizontal {
	width: 8vh;
}
</style>
