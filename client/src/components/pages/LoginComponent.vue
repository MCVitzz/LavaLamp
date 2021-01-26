<template>
	<div class="container">
		<img class="logo" src="@/assets/logo.png" alt="Lava Lamp" />
		<Textbox class="input email" v-model="email" placeholder="Email" />
		<Textbox
			class="input password"
			v-model="password"
			placeholder="Password"
			password="true"
			@keyUp="keyUp"
		/>
		<Button class="input login" value="Login" @clicked="login" />
		<a href="/register">Don't have an account? Register here!</a>
	</div>
</template>

<script>
import AuthenticationServices from '../../services/AuthenticationServices';
import Textbox from '../layout/Textbox';
import Button from '../layout/Button';

export default {
	name: 'LoginComponent',
	components: { Textbox, Button },
	data() {
		return {
			email: '',
			password: '',
		};
	},
	methods: {
		login: async function() {
			if (this.email != '' && this.password != '') {
				let token = await AuthenticationServices.login(
					this.email,
					this.password
				);
				if (token) {
					this.$emit('redraw');
					this.$toasted.global.success({
						message: '😎 Logged in. Welcome back!',
					});
					this.$router.push({ path: '/dashboard' });
				} else {
					this.$toasted.global.error({
						message: 'Email or password is wrong.',
					});
				}
			}
		},
		keyUp: function($event) {
			if ($event.keyCode == 13) this.login();
		},
	},
};
</script>

<style lang="scss" scoped>
@import '@/global';

.container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}

.logo {
	margin: 10vh auto;
	height: 40vh;
	object-fit: contain;
}

.input {
	margin: 2vh auto;
	width: 40vh;
}

.login {
	height: 5vh;
}

a {
	color: white;
	text-decoration: none;
	margin-top: 4vh;
}
</style>
