<template>
	<div class="container">
		<Grid
			:properties="properties"
			chosen="side-menu"
			:content="content"
			@changed="changed"
		>
			<template v-slot="{ item }">
				<TeamDetailComponent :team="item" />
			</template>
		</Grid>
		<InputWithButton
			class="input"
			ref="txtAddTeam"
			:text="'Add'"
			:placeholder="'+ Add'"
			@buttonClick="addTeam"
			@keyUp="txtKeyUp"
		/>
	</div>
</template>

<script>
import Grid from '../../layout/Grid/Grid';
import InputWithButton from '../../layout/InputWithButton';
import TeamServices from '../../../services/TeamServices';
import UserServices from '../../../services/UserServices';
import TeamDetailComponent from './TeamDetailComponent';

export default {
	name: 'TeamsViewComponent',
	components: { Grid, InputWithButton, TeamDetailComponent },
	data() {
		return {
			content: [],
			properties: [
				{ name: 'name', control: 'textbox', main: true },
				{ name: 'leader.firstName' },
			],
		};
	},
	methods: {
		changed: async function(team) {
			let res = await TeamServices.updateTeam(team);
			if (res == 'OK') {
				this.refresh();
				this.$toasted.global.success({
					message: '😎 Team Updated!',
				});
			} else alert(res);
		},
		refresh: async function() {
			this.content = await this.getData();
		},
		getData: async function() {
			let data = await TeamServices.getAllTeams();
			console.log(data);
			for (let team of data) {
				if (team.leader != undefined)
					team.leader = await UserServices.getById(team.leader);
			}
			return data;
		},
		txtKeyUp: function($event) {
			if ($event.keyCode == 13) {
				this.submitTeam(this.$refs.txtAddTeam.getValue());
				this.$refs.txtAddTeam.empty();
			}
		},
		addTeam: function() {
			let txtAddTeam = this.$refs.txtAddTeam;
			this.submitTeam(txtAddTeam.getValue());
			txtAddTeam.empty();
		},
		submitTeam: async function(team) {
			if (team != '') {
				let res = await TeamServices.addTeam(team);
				if (res == 'OK') {
					this.content = await this.getData();
					this.$toasted.global.success({
						message: '😎 Team Added!',
					});
				} else alert(res);
			}
		},
	},
	created() {
		this.refresh();
	},
};
</script>

<style lang="scss" scoped>
@import '@/global';

.container {
	max-height: 100%;
	width: 100%;
	padding: 4vh;
}
.input {
	width: 100%;
	padding: 0 4vh;
	border-bottom: 1px solid $second-background-color;
}
</style>
