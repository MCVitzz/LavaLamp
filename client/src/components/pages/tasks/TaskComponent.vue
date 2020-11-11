<template>
	<div>
		<div class="item">
			<Textbox
				class="main"
				ref="txtTitle"
				:model="task.title"
				:value="task.title"
				v-if="edit"
				@keyUp="keyUpTxtTitle"
				@blur="confirm"
			/>
			<div v-else class="field main" v-on:click="titleClick">
				{{ task.title }}
			</div>
			<Datepicker
				class="field"
				@selected="confirm"
				ref="dpDue"
				:value="task.dueDate"
				:model="task.dueDate"
			/>
			<div v-on:click="showPriority" class="field dialog-container">
				<div class="dialog" v-if="editPriority" v-click-outside="hidePriority">
					<div class="dialog-item first-item">High</div>
					<div class="dialog-item">Medium</div>
					<div class="dialog-item last-item">Low</div>
				</div>
				<div>High</div>
			</div>
		</div>
	</div>
</template>
<script>
import Datepicker from '../../layout/Datepicker';
import Textbox from '../../layout/Textbox';

export default {
	name: 'TaskComponent',
	components: {
		Datepicker,
		Textbox,
	},
	props: ['task', 'index', 'requestEdit', 'editTask'],
	data() {
		return {
			edit: false,
			editPriority: false,
		};
	},
	methods: {
		titleClick: function() {
			this.editClick();
			this.$nextTick(() => {
				this.$refs['txtTitle'].focus();
			});
		},
		dueClick: function() {
			this.editClick();
		},
		editClick: function() {
			this.edit = true;
			this.requestEdit(this.index);
		},
		removeClick: function() {
			this.edit = false;
			this.editPriority = false;
		},
		keyUpTxtTitle: function(e) {
			if (e.keyCode == 13) {
				this.confirm();
			}
		},
		confirm: function() {
			this.removeClick();
			this.editTask(this.task);
		},
		showPriority: function() {
			this.requestEdit(this.index);
			this.editPriority = true;
		},
		hidePriority: function() {
			if (this.editPriority) this.editPriority = false;
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
						console.log(el.parentNode);
						console.log('clicked outside!');
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

.field {
	cursor: pointer;
	&:hover {
		background: rgba($color: transparent, $alpha: 0.1);
		transition: ease-in-out 0.1s;
	}
}

input {
	background: rgba($color: transparent, $alpha: 0.1) !important;
	padding: 1vh !important;
	margin: 1vh !important;
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
</style>
