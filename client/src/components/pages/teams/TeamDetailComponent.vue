<template>
	<div class="detail-container">
		<TeamUsersViewComponent class="users-view" :team="team.id" />
		<IconTextButton @click="deleteTeam" icon="trash-alt" text="Delete" />
	</div>
</template>

<script>
import IconTextButton from '../../layout/IconTextButton';
import TeamUsersViewComponent from '../teams/TeamUsersViewComponent';
import TeamServices from '../../../services/TeamServices';
import TeamUserServices from '../../../services/TeamUsersServices';

export default {
	name: 'TeamDetailComponent',
	components: { IconTextButton, TeamUsersViewComponent },
	props: ['team'],
	methods: {
		deleteTeam: async function() {
			let resTeamUser = await TeamUserServices.deleteByTeam(this.team.id);
			if (resTeamUser == 'OK') {
				let res = await TeamServices.deleteTeam(this.team);
				if (res == 'OK') {
					this.$toasted.global.success({
						message: '😎 Team Deleted successfully!',
					});
					this.$emit('deleted');
				} else alert(res);
			} else alert(resTeamUser);
		},
	},
};
</script>

<style lang="scss" scoped>
@import '@/global';

.detail-container {
	background: $second-background-color;
	text-align: left;
	padding: 2vh 4vh;
	height: 100%;
}

.users-view {
	background: $background-color;
	margin-bottom: 1vh;
	padding: 2vh;
}
</style>
