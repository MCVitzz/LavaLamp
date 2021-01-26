<template>
	<div class="profile-container">
		<div class="headline">
			<img class="avatar" src="@/assets/avatar.png" />
			<div class="line">&nbsp;</div>
			<div class="info">
				<p class="user name">{{ `${user.firstName} ${user.lastName}` }}</p>
				<a class="user email" :href="`mailto:${user.email}`">{{
					user.email
				}}</a>
			</div>
		</div>
		<h1>Projects</h1>
		<ProjectUsersViewComponent :user="user" v-if="ready" />
	</div>
</template>

<script>
import UserServices from '../../../services/UserServices';
import ProjectUsersViewComponent from './ProjectUsersViewComponent';

export default {
	name: 'ProfileComponent',
	components: { ProjectUsersViewComponent },
	data() {
		return {
			user: {},
			ready: false,
		};
	},
	methods: {
		getUser: async function() {
			return await UserServices.getSelf();
		},
	},
	async created() {
		this.user = await this.getUser();
		this.ready = true;
	},
};
</script>

<style lang="scss" scoped>
@import '@/global';

.profile-container {
	width: 100%;
	max-width: 100%;
	text-align: left;
	padding: 4vh;
}

.headline {
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	width: fit-content;
}

h1 {
	color: white;
	margin-left: 4vh;
	font-size: 2.1em;
}

.user {
	color: white;
}

.name {
	font-size: 2em;
	font-weight: bold;
}

.email {
	margin-top: 1vh;
	text-decoration: none;
	&:hover {
		color: orangered;
	}
}

.info {
	display: flex;
	flex-direction: column;
}

.line {
	height: auto;
	border-right: thin solid $second-background-color;
	margin: 0 2vh;
}

.avatar {
	object-fit: contain;
	width: 20vh;
	border-radius: 50%;
}
</style>
