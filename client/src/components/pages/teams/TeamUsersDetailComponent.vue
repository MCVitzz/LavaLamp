<template>
	<div class="container">
		<IconTextButton @click="deleteTeamUser" icon="trash-alt" text="Delete" />
	</div>
</template>

<script>
import TeamUserServices from '../../../services/TeamUsersServices';
import IconTextButton from '../../layout/IconTextButton';

export default {
	name: 'TeamUsersDetailComponent',
	components: { IconTextButton },
	props: ['teamUser'],
	methods: {
		deleteTeamUser: async function() {
			let res = await TeamUserServices.deleteTeamUser(this.teamUser);
			this.$emit('deleted');
			if (res == 'OK') {
				this.$toasted.global.success({
					message: '😎 User Deleted successfully!',
				});
			} else alert(res);
		},
	},
};
</script>

<style lang="scss" scoped>
@import '@/global';

.container {
	background: $second-background-color;
	text-align: left;
	padding: 2vh 4vh;
	height: 100%;
}
</style>
