<template>
	<div class="detail-container">
		<AddressFinder
			class="address-finder"
			@changed="changeAddress"
			:address="task.address"
		/>
		<IconTextButton
			class="button"
			icon="trash-alt"
			text="Delete"
			@click="deleteTask(item)"
		/>
		<Button
			v-for="(value, index) in getValue()"
			:key="index"
			class="button"
			:value="value"
			@clicked="stateChange(value)"
		/>
	</div>
</template>

<script>
import AddressFinder from '../../layout/AddressFinder';
import IconTextButton from '../../layout/IconTextButton';
import Button from '../../layout/Button';

export default {
	name: 'TaskDetailComponent',
	components: { AddressFinder, IconTextButton, Button },
	props: ['task', 'stateButton'],
	methods: {
		deleteTask: function() {
			this.$emit('deleted', this.task);
		},
		getValue: function() {
			return this.stateButton(this.task);
		},
		stateChange: function(newState) {
			this.$emit('stateChange', this.task, newState);
		},
		changeAddress: function(address) {
			this.task.address = address;
			this.$emit('changed', this.task);
		},
	},
};
</script>

<style lang="scss" scoped>
.button {
	margin-left: 2vh;
}

.address-finder {
	width: 100%;
	max-width: 100%;
	height: 30vh;
	margin-bottom: 2vh;
}
</style>
