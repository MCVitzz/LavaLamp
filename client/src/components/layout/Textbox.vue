<template>
	<input
		ref="input"
		type="text"
		:v-model="value"
		:value="value"
		:placeholder="placeholder"
		v-on:focus="onFocus"
		v-on:blur="onBlur"
		v-on:keyup="onKeyUp"
	/>
</template>
<script>
export default {
	name: 'Textbox',
	props: ['value', 'placeholder'],
	methods: {
		focus: function() {
			this.$nextTick(function() {
				this.$refs.input.focus();
			});
		},
		onFocus: function($event) {
			this.$emit('focus', $event);
		},
		onBlur: function($event) {
			this.$emit('blur', $event);
		},
		onKeyUp: function($event) {
			this.$emit('keyUp', $event);
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../../global';

input {
	background: transparent;
	padding: 2vh 1vh 2vh 2vh;
	color: white;
	font-size: 1.1em;
	border: 0;
	&:placeholder {
		color: white;
	}
	&:focus {
		outline: 0;
	}
}
</style>
