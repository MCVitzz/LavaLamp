<template>
	<div class="frame">
		<div class="users-container">
			<div class="headers">
				<div class="header"></div>
				<div class="header">First Name</div>
				<div class="header">Last Name</div>
				<div class="header">Email</div>
			</div>
			<div class="items">
				<UserComponent
					ref="users"
					v-for="(item, index) in items"
					v-bind:item="item"
					v-bind:key="item._id"
					v-bind:index="index"
					v-bind:user="item"
					v-bind:requestEdit="requestEdit"
					@edit="editUser"
					@deleteUser="deleteUser"
				/>
				<InputWithButton
					class="unoficial-item"
					ref="txtAddUser"
					:text="'Add'"
					:placeholder="'+ Add'"
					@buttonClick="addUser"
					@keyUp="txtKeyUp"
					:value="addValue"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import UserServices from '../../../services/UserServices';
import UserComponent from './UserComponent';
import InputWithButton from '../../layout/InputWithButton';

export default {
	name: 'UserViewComponent',
	data() {
		return {
			addValue: '',
			items: [],
			error: '',
			text: '',
		};
	},
	methods: {
		addUser: function() {
			this.submitUser(this.$refs.txtAddUser.getValue());
			this.$refs.txtAddUser.empty();
		},
		requestEdit: function(reqIdx) {
			this.$nextTick(function() {
				let users = this.$refs.users;
				for (let idx in users) {
					if (reqIdx != idx) users[idx].removeClick();
				}
			});
		},
		editUser: async function(user) {
			let res = await UserServices.updateUser(user);
			if (res == 'OK') {
				this.items = await UserServices.getAllUsers();
				this.$toasted.global.success({
					message: '😎 User Updated!',
				});
			} else alert(res);
		},
		deleteUser: async function(user) {
			let res = await UserServices.deleteUser(user);
			if (res == 'OK') {
				this.items = await UserServices.getAllUsers();
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
		submitUser: async function(user) {
			if (user != '') {
				let res = await UserServices.addUser(user);
				if (res == 'OK') {
					this.items = await UserServices.getAllUsers();
					this.$toasted.global.success({
						message: '😎 User Added!',
					});
				} else alert(res);
			}
		},
	},
	components: {
		UserComponent,
		InputWithButton,
	},
	async created() {
		try {
			this.items = await UserServices.getAllUsers();
		} catch (err) {
			this.error = err.message;
		}
	},
};
</script>

<style lang="scss" scoped>
@import '../../../global';

.frame {
	margin: auto;
	width: 100%;
	height: 100%;
	padding: 4vh;
}

#addUser {
	margin: 0;
	left: 0;
	padding: 1vh;
	border-radius: 0.75vh;
	border: 1px solid orangered;
	background: transparent;
	color: orangered;
	transition: ease-in 0.1s;
	&:hover {
		background: orangered;
		color: $background-color;
	}

	&:active {
		transform: scale(0.95);
	}
}

.icon {
	margin-right: 1vh;
}

.users-container {
	color: white;
	display: grid;
	grid-template-columns: 1fr 6fr 6fr 6fr;
	grid-template-rows: max-content;
}

.headers,
/deep/ .item {
	display: grid;
	grid-template-columns: 1fr 6fr 6fr 6fr;
}

.headers {
	max-height: 10%;
}

.headers,
.items {
	grid-column: 1 / 5;
}

.header {
	color: grey;
	font-size: 1.2em;
}

.header {
	padding: 1vh;
	margin: 1vh;
	text-align: left;
}

.unoficial-item {
	border-bottom: 1px solid $second-background-color;
}

/deep/ .main {
	font-weight: bold;
	font-size: 1.1em;
}

/deep/ .full-row {
	width: 100%;
	grid-column: 1 / 4;
}
</style>
