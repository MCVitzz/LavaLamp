<template>
	<button v-on:click="click">
		<FontAwesome class="icon" :icon="icon" />
	</button>
</template>
<script>
export default {
	name: 'IconButton',
	props: ['icon'],
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
	margin: 1vh;
	padding: 1vh 2vh;
	background: transparent;
	transition: ease-in-out 0.3s;
	border: 0;
	cursor: pointer;
	.icon {
		transition: ease-in-out 0.3s;
	}
	&:active {
		outline: 0;
		transform: scale(0.95);
		.icon {
			color: orangered;
		}
	}
	&:focus {
		outline: 0;
	}
	&:hover {
		background: rgba($color: transparent, $alpha: 0.1);
	}
}

.icon {
	color: $text-color;
}
</style>
