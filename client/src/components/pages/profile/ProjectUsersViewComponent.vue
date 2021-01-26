<template>
	<div class="container">
		<Grid :properties="properties" :content="data">
			<template v-slot:custom="{ item, value }">
				<p>{{ value }}<span v-if="item.isOwner" class="a-color"> *</span></p>
			</template>
			<template name="detail" v-slot="{ item }">
				<ProjectDetailComponent :project="item" @deleted="deleted" />
			</template>
		</Grid>
	</div>
</template>

<script>
import Grid from '../../layout/Grid/Grid';
import ProjectUserServices from '../../../services/ProjectUserServices';
import ProjectServices from '../../../services/ProjectServices';
import ProjectDetailComponent from './ProjectUsersDetailComponent';

export default {
	name: 'ProjectUsersViewComponent',
	components: { Grid, ProjectDetailComponent },
	props: ['user'],
	data() {
		return {
			properties: [
				{
					name: 'project.name',
					main: true,
					control: 'custom',
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
		deleted: async function(project) {
			let res = await ProjectServices.deleteProject(project);
			if (res == 'OK') {
				this.data = await this.getData(this.user.id);
				this.$toasted.global.success({
					message: '😎 Project Deleted!',
				});
			} else if (res == '403') {
				this.$toasted.global.error({
					message: "You don't have permission to delete this project",
				});
			}
		},
	},
	async created() {
		let user = await this.user;
		this.data = await this.getData(user.id);
		if (typeof this.data == 'string') this.data = [];
		for (let project of this.data) {
			project.isOwner = project.project.owner == user.id;
		}
	},
};
</script>

<style lang="scss" scoped>
@import '@/global';

.container {
	padding: 4vh;
	height: max-content;
}

.detail-container {
	background: $second-background-color;
	text-align: left;
	padding: 2vh;
	margin: 0vh 1vh 0.5vh;
}
</style>
