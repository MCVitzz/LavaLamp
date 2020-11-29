<template>
	<div class="cell">
		<p v-if="!property || !property.control">{{ value }}</p>
		<TextboxClickToEdit
			v-else-if="property.control == 'textbox'"
			:value="value"
			@changed="changed"
		/>
		<Combobox
			v-else-if="property.control == 'combobox'"
			:options="property.options"
			:value="value"
			@changed="changed"
		/>
		<IconButton
			v-else-if="property.control == 'iconbutton'"
			:icon="icon"
			@click="click"
		/>
	</div>
</template>
<script>
import TextboxClickToEdit from './TextboxClickToEdit';
import IconButton from './IconButton';
import Combobox from './Combobox';

export default {
	name: 'GridCell',
	props: ['property', 'value', 'icon'],
	components: { TextboxClickToEdit, Combobox, IconButton },
	methods: {
		changed: function(val) {
			this.$emit('changed', val);
		},
		click: function($event) {
			this.$emit('clicked', $event);
		},
	},
};
</script>
<style lang="scss" scoped>
@import '@/global';

.cell {
	background: $background-color;
	border-bottom: 1px solid $second-background-color;
	p {
		cursor: pointer;
		padding: 1vh;
		margin: 1vh;
		text-align: left;
		&:hover {
			background: rgba($color: transparent, $alpha: 0.1);
			transition: ease-in-out 0.1s;
		}
	}
}
</style>
