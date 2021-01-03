<template>
	<input
		ref="input"
		:value="value"
		:placeholder="placeholder"
		@focus="onFocus"
		@blur="onBlur"
		@keyup="onKeyUp"
		@change="onChange"
		@input="onInput"
		:type="password ? 'password' : 'text'"
	/>
</template>
<script>
export default {
	name: 'Textbox',
	props: ['value', 'placeholder', 'password'],
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
		getValue: function() {
			return this.$refs.input.value;
		},
		onChange: function($event) {
			this.$emit('changed', $event);
		},
		onInput: function($event) {
			this.$emit('input', $event.target.value);
		},
		empty: function() {
			this.$refs.input.value = '';
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
	font-size: 1em;
	border: 0;
	&:placeholder {
		color: white;
	}
	&:focus {
		outline: 0;
	}
}
</style>
