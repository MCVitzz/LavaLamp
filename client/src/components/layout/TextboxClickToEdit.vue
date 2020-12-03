<template>
	<div class="d-flex">
		<Textbox
			ref="txt"
			:model="value"
			:value="value"
			v-if="edit"
			@keyUp="keyUp"
			@blur="blur"
		/>
		<p v-else v-on:click="click">
			{{ value }}
		</p>
	</div>
</template>
<script>
import Textbox from './Textbox';
export default {
	name: 'TextboxClickToEdit',
	components: { Textbox },
	props: ['value'],
	data() {
		return {
			edit: false,
		};
	},
	methods: {
		keyUp: function(e) {
			if (e.keyCode == 13) {
				this.edit = false;
				this.confirm(e.target.value);
			}
		},
		focus: function() {
			this.click();
		},
		blur: function(e) {
			this.edit = false;
			this.confirm(e.target.value);
		},
		click: function() {
			this.edit = true;
			this.$nextTick(() => {
				this.$refs.txt.focus();
			});
		},
		confirm: function(val) {
			this.$emit('changed', val);
		},
	},
};
</script>
<style lang="scss" scoped>
@import '@/global';

p {
	cursor: pointer;
	padding: 1vh;
	margin: 1vh;
	height: 100%;
	width: 100%;
	text-align: left;
	&:hover {
		background: rgba($color: transparent, $alpha: 0.1);
		transition: ease-in-out 0.1s;
	}
}

input {
	background: rgba($color: transparent, $alpha: 0.1) !important;
	padding: 1vh !important;
	margin: 1vh !important;
	text-align: left;
	outline: 1px solid orangered;
	width: 100%;
	&:hover {
		outline: 1px solid orangered;
	}
	&:focus {
		outline: 1px solid orangered;
	}
}
</style>
