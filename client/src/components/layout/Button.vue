<template>
	<button @click="clicked">{{ value }}</button>
</template>

<script>
export default {
	name: 'Button',
	props: ['value'],
	methods: {
		clicked: function() {
			console.log('oi');
			this.$emit('clicked');
		},
	},
};
</script>

<style lang="scss" scoped>
button {
	background: transparent;
	border: 1px solid orangered;
	border-radius: 0.75vh;
	padding: 1vh;
	color: orangered;
	transition: ease-in-out 0.3s;
	span {
		margin-left: 1vh;
	}
	&:focus {
		outline: 0;
	}
	&:active {
		transform: scale(0.95);
	}
}
</style>
