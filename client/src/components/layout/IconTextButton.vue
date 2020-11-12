<template>
	<button v-on:click="click">
		<FontAwesome :icon="icon" />
		<span>{{ text }}</span>
	</button>
</template>
<script>
export default {
	name: 'IconTextButton',
	props: ['icon', 'text'],
	methods: {
		click: function($event) {
			this.$emit('click', $event);
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../../global';

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
