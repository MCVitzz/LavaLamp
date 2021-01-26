<template>
	<div class="container">
		<Grid
			:properties="properties"
			chosen="side-menu"
			:content="content"
			@changed="changed"
		>
			<template v-slot:custom="{ changedFunction, value }"
				><SelectUserComponent :changed="changedFunction" :value="value"
			/></template>
			<template v-slot="{ item }">
				<TeamDetailComponent :team="item" @deleted="refresh" />
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
import TeamDetailComponent from './TeamDetailComponent';
import SelectUserComponent from '../users/SelectUserComponent';

export default {
	name: 'TeamsViewComponent',
	components: {
		Grid,
		InputWithButton,
		TeamDetailComponent,
		SelectUserComponent,
	},
	data() {
		return {
			content: [],
			properties: [
				{ name: 'name', control: 'textbox', main: true },
				{ name: 'leader', control: 'custom' },
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
			let data = await TeamServices.getByCurrentProject();
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
	display: flex;
	flex-direction: column;
	margin: 0;
}
.input {
	width: 100%;
	padding: 0 4vh;
	border-bottom: 1px solid $second-background-color;
}
</style>
