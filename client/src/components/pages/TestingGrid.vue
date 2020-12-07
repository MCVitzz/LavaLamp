<template>
	<SelectUserComponent />
</template>

<script>
import SelectUserComponent from './users/SelectUserComponent';

export default {
	name: 'TestingGrid',
	components: { SelectUserComponent },
	methods: {
		changed: function(changed) {
			this.$toasted.global.success({
				message: '😎 Task Added! - ' + changed.name,
			});
		},
	},
	data() {
		return {
			properties: [
				{ name: 'name', control: 'textbox', main: true },
				{ name: 'age', control: 'textbox' },
				{ name: 'role', control: 'combobox', options: ['A', 'B', 'C'] },
			],
			data: [
				{
					name: 'Vasco',
					age: 22,
					role: 'A',
				},
				{
					name: 'André',
					age: 19,
					role: 'B',
				},
				{
					name: 'Tomás',
					age: 16,
					role: 'C',
				},
			],
		};
	},
};
</script>
