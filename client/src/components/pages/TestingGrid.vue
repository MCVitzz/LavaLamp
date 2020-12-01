<template>
	<Grid :properties="properties" :data="data" @changed="changed">
		<div style="text-align: center;">Cucu</div>
	</Grid>
</template>

<script>
import Grid from '@/components/layout/Grid/Grid';

export default {
	name: 'TestingGrid',
	components: { Grid },
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
