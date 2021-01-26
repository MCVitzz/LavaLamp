<template>
	<div class="container">
		<Grid :properties="properties" :content="content" @changed="changed">
			<template v-slot:custom="{ changedFunction, value }"
				><SelectUserComponent
					:editable="false"
					:changed="changedFunction"
					:value="value"
			/></template>
			<template v-slot="{ item }">
				<TeamUsersDetailComponent @deleted="setContent" :teamUser="item" />
			</template>
		</Grid>
		<SelectUserComponent ref="sltUser" :changed="addUser" />
	</div>
</template>

<script>
import TeamUsersServices from '../../../services/TeamUsersServices';
import Grid from '../../layout/Grid/Grid';
import SelectUserComponent from '../users/SelectUserComponent';
import TeamUsersDetailComponent from './TeamUsersDetailComponent';

export default {
	name: 'TeamUsersViewComponent',
	components: { Grid, SelectUserComponent, TeamUsersDetailComponent },
	props: ['team'],
	data() {
		return {
			properties: [
				{ name: 'user', control: 'custom' },
				{
					name: 'role',
					control: 'combobox',
					options: ['Developer', 'Tester', 'Designer', 'Manager'],
				},
			],
			content: [],
		};
	},
	methods: {
		getData: async function() {
			return await TeamUsersServices.getByTeam(this.team);
		},
		setContent: async function() {
			this.content = await this.getData();
		},
		changed: async function(teamUser) {
			let res = await TeamUsersServices.updateTeamUser(teamUser);
			if (res == 'OK') {
				this.setContent();
				this.$toasted.global.success({
					message: '😎 User Updated!',
				});
			} else alert(res);
		},
		addUser: function(user) {
			if (this.content.find((e) => e.user == user)) {
				this.$toasted.global.error({
					message: 'The user is already part of the team!',
				});
			} else {
				TeamUsersServices.addTeamUser(user, this.team);
				this.$toasted.global.success({
					message: '😎 User added to the team!',
				});
				this.setContent();
			}
			this.$refs.sltUser.empty();
		},
	},
	async created() {
		await this.setContent();
	},
};
</script>

<style lang="scss" scoped></style>
