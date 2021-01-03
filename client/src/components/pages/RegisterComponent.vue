<template>
	<div class="container">
		<img class="logo" src="@/assets/logo.png" alt="Lava Lamp" />
		<Textbox class="textbox" v-model="email" placeholder="Email" />
		<Textbox class="textbox" v-model="firstName" placeholder="First Name" />
		<Textbox class="textbox" v-model="lastName" placeholder="Last Name" />
		<Textbox
			class="textbox"
			v-model="password"
			placeholder="Password"
			password="true"
		/>
		<Textbox
			class="textbox"
			v-model="confirmPassword"
			placeholder="Confirm Password"
			password="true"
		/>
		<Button class="register" value="Register" @clicked="register" />
	</div>
</template>

<script>
import AuthenticationServices from '../../services/AuthenticationServices';
import Button from '../layout/Button';
import Textbox from '../layout/Textbox';

export default {
	name: 'RegisterComponent',
	components: { Textbox, Button },
	methods: {
		register: async function() {
			let user = {
				email: this.email,
				firstName: this.firstName,
				lastName: this.lastName,
				password: this.password,
			};
			let res = await AuthenticationServices.register(user);
			if (res == 'OK') {
				this.$toasted.global.success({
					message: '😎 Registered successfully! Please login.',
				});
				this.$router.push({ path: '/login' });
			} else {
				this.$toasted.global.error({
					message: res.data ? res.data : res,
				});
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import '@/global';

.container {
	display: flex;
	flex-direction: column;
	margin: auto;
	color: white;
}

.textbox {
	margin: 1vh 0;
}

.logo {
	margin-bottom: 5vh;
	height: 20vh;
	object-fit: contain;
}

.register {
	height: 5vh;
	margin-top: 2vh;
}
</style>
