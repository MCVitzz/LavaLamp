<template>
	<div class="container">
		<Grid :properties="properties" :content="content" @changed="changed">
			<template v-slot="{ item }">
				<div class="detail-container">
					<IconTextButton
						icon="trash-alt"
						text="Delete"
						@click="deleteClick(item)"
					/>
				</div>
			</template>
		</Grid>
		<InputWithButton
			ref="txtAddUser"
			class="input"
			:text="'Add'"
			:placeholder="'+ Email'"
			:value="addValue"
			@buttonClick="addUser"
			@keyUp="txtKeyUp"
		/>
	</div>
</template>

<script>
import Grid from '../../layout/Grid/Grid';
import UserServices from '../../../services/UserServices';
import IconTextButton from '../../layout/IconTextButton';
import InputWithButton from '../../layout/InputWithButton';

export default {
	name: 'UsersViewComponent',
	components: { Grid, IconTextButton, InputWithButton },
	props: ['team'],
	data() {
		return {
			addValue: '',
			content: [],
			properties: [
				{ name: 'firstName', control: 'textbox' },
				{ name: 'lastName', control: 'textbox' },
				{ name: 'email', control: 'textbox', main: true },
			],
		};
	},
	methods: {
		getData: async function() {
			let data = await UserServices.getByTeam(this.team);
			return data;
		},
		changed: async function(user) {
			let res = await UserServices.updateUser(user);
			if (res == 'OK') {
				this.content = await this.getData();
				this.$toasted.global.success({
					message: '😎 User Updated!',
				});
			} else alert(res);
		},
		deleteClick: async function(user) {
			let res = await UserServices.deleteUser(user);
			if (res == 'OK') {
				this.content = await this.getData();
				this.$toasted.global.success({
					message: '😎 User Deleted!',
				});
			} else alert(res);
		},
		txtKeyUp: function($event) {
			if ($event.keyCode == 13) {
				this.submitUser(this.$refs.txtAddUser.getValue());
				this.$refs.txtAddUser.empty();
			}
		},
		addUser: function() {
			let txtAddUser = this.$refs.txtAddUser;
			this.submitUser({ email: txtAddUser.getValue(), team: this.team });
			txtAddUser.empty();
		},
		submitUser: async function(user) {
			if (user != '') {
				let res = await UserServices.addUser(user);
				if (res == 'OK') {
					this.content = await this.getData();
					this.$toasted.global.success({
						message: '😎 User Added!',
					});
				} else alert(res);
			}
		},
	},
	async created() {
		this.content = await this.getData();
	},
};
</script>

<style lang="scss" scoped>
@import '@/global';

.container {
	max-height: 100%;
	width: 100%;
}

.detail-container {
	background: $second-background-color;
	text-align: left;
	padding: 2vh;
	margin: 0vh 1vh 0.5vh;
}

.input-container {
	padding: 0 4vh;
}

.input {
	width: 100%;
	padding: 0 4vh;
	border-bottom: 1px solid $second-background-color;
}
</style>
