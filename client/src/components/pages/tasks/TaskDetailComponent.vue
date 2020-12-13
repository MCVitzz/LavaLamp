<template>
	<div class="detail-container">
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
import IconTextButton from '../../layout/IconTextButton';
import Button from '../../layout/Button';

export default {
	name: 'TaskDetailComponent',
	components: { IconTextButton, Button },
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
	},
};
</script>

<style lang="scss" scoped>
.button {
	margin-left: 2vh;
}
</style>
