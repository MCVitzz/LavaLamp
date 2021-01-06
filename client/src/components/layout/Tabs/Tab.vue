<template>
	<div class="container" v-if="isActive">
		<slot />
	</div>
</template>

<script>
export default {
	name: 'Tab',
	props: ['title'],
	data() {
		return {
			isActive: false,
		};
	},
};
</script>

<style></style>
