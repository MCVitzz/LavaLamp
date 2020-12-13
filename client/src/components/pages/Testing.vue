<template>
	<div>
		<AddressFinder @changed="changed" />
	</div>
</template>

<script>
import AddressFinder from '../layout/AddressFinder';

export default {
	name: 'Testing',
	components: { AddressFinder },
	methods: {
		changed: function(val) {
			console.log(val);
		},
	},
};
</script>

<style lang="scss" scoped>
@import '@/global';

div {
	color: white;
	width: 100%;
	height: 100%;
	padding: 4vh;
}
</style>
