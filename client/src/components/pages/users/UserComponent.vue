<template>
	<div class="container">
		<div class="item">
			<IconButton @click="toggleDetail" :icon="getIcon()" />
			<Textbox
				class="main"
				ref="txtFirstName"
				:model="user.firstName"
				:value="user.firstName"
				v-if="edit || detail"
				@keyUp="keyUpTxtFirstName"
				@blur="blurTxtFirstName"
			/>
			<div v-else class="field main" v-on:click="firstNameClick">
				{{ user.firstName }}
			</div>
			<Textbox
				class="main"
				ref="txtLastName"
				:model="user.lastName"
				:value="user.lastName"
				v-if="edit || detail"
				@keyUp="keyUpTxtLastName"
				@blur="blurTxtLastName"
			/>
			<div v-else class="field main" v-on:click="lastNameClick">
				{{ user.lastName }}
			</div>
			<Textbox
				class="main"
				ref="txtEmail"
				:model="user.email"
				:value="user.email"
				v-if="edit || detail"
				@keyUp="keyUpTxtEmail"
				@blur="confirm"
			/>
			<div v-else class="field main" v-on:click="emailClick">
				{{ user.email }}
			</div>
		</div>
		<UserDetailComponent v-if="detail" @deleteUser="deleteUser" />
	</div>
</template>
<script>
import Textbox from '../../layout/Textbox';
import IconButton from '../../layout/IconButton';
import UserDetailComponent from './UserDetailComponent';

export default {
	name: 'UserComponent',
	components: {
		Textbox,
		IconButton,
		UserDetailComponent,
	},
	props: ['user', 'index', 'requestEdit', 'editUser'],
	data() {
		return {
			edit: false,
			editPriority: false,
			detail: false,
		};
	},
	methods: {
		firstNameClick: function() {
			this.editClick();
			this.$nextTick(() => {
				this.$refs.txtFirstName.focus();
			});
		},
		lastNameClick: function() {
			this.editClick();
			this.$nextTick(() => {
				this.$refs.txtLastName.focus();
			});
		},
		emailClick: function() {
			this.editClick();
			this.$nextTick(() => {
				this.$refs.txtEmail.focus();
			});
		},
		editClick: function() {
			this.edit = true;
			this.requestEdit(this.index);
		},
		removeClick: function() {
			this.detail = false;
			this.edit = false;
			this.editPriority = false;
		},
		keyUpTxtFirstName: function(e) {
			if (e.keyCode == 13) {
				this.user.firstName = e.target.value;
				this.confirm();
			}
		},
		blurTxtFirstName: function(e) {
			this.user.firstName = e.target.value;
			this.confirm();
		},
		keyUpTxtLastName: function(e) {
			if (e.keyCode == 13) {
				this.user.lastName = e.target.value;
				this.confirm();
			}
		},
		blurTxtLastName: function(e) {
			this.user.lastName = e.target.value;
			this.confirm();
		},
		keyUpTxtEmail: function(e) {
			if (e.keyCode == 13) {
				this.confirm();
			}
		},
		confirm: function() {
			this.removeClick();
			this.$emit('edit', this.user);
		},
		toggleDetail: function() {
			if (this.detail) {
				this.detail = false;
				this.edit = false;
			} else {
				this.detail = true;
				this.edit = true;
				this.requestEdit(this.index);
			}
		},
		getIcon: function() {
			return this.detail ? 'chevron-down' : 'chevron-right';
		},
		deleteUser: function() {
			this.$emit('deleteUser', this.user);
		},
	},
	directives: {
		clickOutside: {
			bind(el, binding) {
				el.__ClickOutsideHandler__ = (event) => {
					if (
						!(
							el === event.target ||
							el.contains(event.target) ||
							event.target === el.parentNode ||
							event.target === el.nextSibling
						)
					) {
						binding.value(event);
					}
				};
				document.body.addEventListener('click', el.__ClickOutsideHandler__);
			},
			unbind(el) {
				document.body.removeEventListener('click', el.__ClickOutsideHandler__);
			},
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../../../global';

.container {
	border-bottom: 1px solid $second-background-color;
}

.field {
	cursor: pointer;
	padding: 1vh;
	margin: 1vh;
	text-align: left;
	&:hover {
		background: rgba($color: transparent, $alpha: 0.1);
		transition: ease-in-out 0.1s;
	}
}

input {
	background: rgba($color: transparent, $alpha: 0.1) !important;
	padding: 1vh !important;
	margin: 1vh !important;
	outline: 1px solid orangered;
	&:hover {
		outline: 1px solid orangered;
	}
	&:focus {
		outline: 1px solid orangered;
	}
}

.dialog {
	// height: 100px;
	// background: blue;
	position: absolute;
	z-index: 999;
	background-color: $second-background-color;
	padding: 1vh;
	width: 50%;
	//outline: 1px solid $background-color;
	top: 50px;
	left: -1vh;
}

.dialog-container {
	overflow: visible;
	position: relative;
}

.dialog-item {
	margin: 0.75vh;
	padding: 1vh;
	&:hover {
		background: rgba(0, 0, 0, 0.5);
		color: $text-color;
	}
}

.toggle-detail {
	margin: 1vh;
	padding: 1vh;
	cursor: pointer;
	text-align: center;
	&:hover {
		background: rgba($color: transparent, $alpha: 0.1);
		transition: ease-in-out 0.1s;
	}
}

.icon {
	color: $text-color;
	margin: auto;
}
</style>
