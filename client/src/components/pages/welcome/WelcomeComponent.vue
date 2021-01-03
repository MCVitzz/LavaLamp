<template>
	<div class="container">
		<p class="welcome">Welcome to Lava Lamp!</p>
		<img class="logo" src="@/assets/logo.png" alt="Lava Lamp" />
		<Button class="btn-login" value="Login" @clicked="login" />
	</div>
</template>

<script>
import AuthenticationServices from '../../../services/AuthenticationServices';
import Button from '../../layout/Button';

export default {
	name: 'WelcomeComponent',
	components: { Button },
	methods: {
		login: function() {
			if (!AuthenticationServices.isLoggedIn())
				this.$router.push({ path: '/login' });
			else this.$router.push({ path: '/dashboard' });
		},
	},
};
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	margin: 10vh auto;
	text-align: center;
}

.welcome {
	margin-bottom: 3vh;
	color: white;
	font-size: 3em;
}
.logo {
	margin: 10vh auto;
	height: 40vh;
	object-fit: contain;
}

.btn-login {
	margin: auto;
	width: 10vh;
}
</style>
