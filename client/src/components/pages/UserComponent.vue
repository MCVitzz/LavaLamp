<template>
	<div class="container">
		<div class="dialog-container" @click="showUserSettings">
			<div class="user-container">
				<img src="@/assets/avatar.png" class="avatar" />
				<p class="user-name">
					{{ `${user.firstName} ${user.lastName}` }}
				</p>
			</div>
			<div class="dialog-anchor">
				<div
					class="dialog"
					v-if="showSettings"
					v-click-outside="hideUserSettings"
				>
					<p class="dialog-item" @click="showProfile">Your Profile</p>
					<p class="dialog-item" @click="logOut">Log Out</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import AuthenticationServices from '../../services/AuthenticationServices';
import UserServices from '../../services/UserServices';
export default {
	name: 'UserComponent',
	data() {
		return {
			user: {},
			showSettings: false,
		};
	},
	methods: {
		getUser: async function() {
			let currentUser = await UserServices.getSelf();
			return currentUser;
		},
		showUserSettings: function(e) {
			this.showSettings = true;
			e.stopPropagation(); //So the "Click outside" won't trigger"
		},
		hideUserSettings: function() {
			this.showSettings = false;
		},
		logOut: async function(e) {
			e.stopPropagation();
			this.hideUserSettings();
			await AuthenticationServices.logout();
			this.$router.push({ path: '/' });
			this.$toasted.global.success({
				message: 'Logged Out successfully.',
			});
		},
		showProfile: function(e) {
			e.stopPropagation();
			this.hideUserSettings();
			this.$router.push({ path: '/profile' });
		},
	},
	async created() {
		this.user = await this.getUser();
	},
};
</script>

<style lang="scss" scoped>
@import '@/global';

.container {
	right: 0px;
	text-align: right;
	align-items: flex-end;
	width: 100%;
	padding: 2vh 10vh 0;
}

.user-container {
	display: flex;
	cursor: pointer;
	width: fit-content;
	color: white;
	&:hover {
		color: orangered;
	}
}

.dialog-container {
	display: flex;
	flex-direction: column;
}

.dialog-anchor {
	position: relative;
}

.dialog {
	position: absolute;
	top: 1vh;
	right: 0;
	z-index: 999;
	width: fit-content;
	height: fit-content;
	padding: 2vh;
	background: $second-background-color;
	&:after {
		content: '';
		position: absolute;
		top: -10px;
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 0;
		height: 0;
		border-bottom: solid 10px $second-background-color;
		border-left: solid 10px transparent;
		border-right: solid 10px transparent;
	}
}

.dialog-item {
	color: white;
	font-size: 0.8em;
	text-align: left;
	cursor: pointer;
	&:hover {
		color: orangered;
	}
}

.avatar {
	object-fit: cover;
	width: 3vh;
}

.user-name {
	margin: auto 0;
	margin-left: 2vh;
}
</style>
