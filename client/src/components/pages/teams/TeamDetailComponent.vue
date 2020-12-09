<template>
	<div class="detail-container">
		<UsersViewComponent class="users-view" :team="team.id" />
		<IconTextButton icon="trash-alt" text="Delete" />
	</div>
</template>

<script>
import IconTextButton from '../../layout/IconTextButton';
import UsersViewComponent from '../users/UsersViewComponent';

export default {
	name: 'TeamDetailComponent',
	components: { IconTextButton, UsersViewComponent },
	props: ['team'],
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
