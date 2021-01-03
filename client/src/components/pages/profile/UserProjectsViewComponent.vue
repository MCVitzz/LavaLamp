<template>
	<div class="container">
		<Grid :properties="properties" :content="data" />
	</div>
</template>

<script>
import Grid from '../../layout/Grid/Grid';
import ProjectUserServices from '../../../services/ProjectUserServices';

export default {
	name: 'UserProjectsViewComponent',
	components: { Grid },
	props: ['user'],
	data() {
		return {
			properties: [
				{
					name: 'project.name',
					main: true,
				},
				{
					name: 'role',
				},
			],
			data: [],
		};
	},
	methods: {
		getData: async function(id) {
			return await ProjectUserServices.getByUser(id, true);
		},
	},
	async created() {
		let user = await this.user;
		this.data = await this.getData(user.id);
		if (typeof this.data == 'string') this.data = [];
	},
};
</script>

<style lang="scss" scoped>
.container {
	padding: 4vh;
	height: max-content;
}
</style>
