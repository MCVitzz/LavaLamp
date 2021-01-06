<template>
	<div class="tasks-container">
		<div class="task-list">
			<Grid :properties="properties" :content="content" @changed="changed">
				<template v-slot:custom="{ changedFunction, value }"
					><SelectUserComponent :changed="changedFunction" :value="value"
				/></template>
				<template name="detail" v-slot="{ item }">
					<TaskDetailComponent
						class="detail-container"
						:stateButton="newStateButton"
						:task="item"
						@changed="changed"
						@deleted="deleteClick"
						@stateChange="changeState"
					/>
				</template>
			</Grid>
		</div>
		<InputWithButton
			ref="txtAddTask"
			class="input"
			:text="'Add'"
			:placeholder="'+ Add'"
			@buttonClick="addTask"
			@keyUp="txtKeyUp"
		/>
	</div>
</template>

<script>
import Grid from '../../layout/Grid/Grid';
import TaskServices from '../../../services/TaskServices';
import SelectUserComponent from '../users/SelectUserComponent';
import TaskDetailComponent from './TaskDetailComponent';
import InputWithButton from '../../layout/InputWithButton';

export default {
	name: 'TasksViewComponent',
	components: {
		Grid,
		InputWithButton,
		SelectUserComponent,
		TaskDetailComponent,
	},
	props: ['module'],
	data() {
		return {
			content: [],
			properties: [
				{ name: 'title', control: 'textbox', main: true },
				{ name: 'owner', control: 'custom' },
				{ name: 'dueDate', control: 'datepicker' },
				{
					name: 'priority',
					control: 'combobox',
					options: ['High', 'Medium', 'Low'],
				},
				{ name: 'state' },
			],
		};
	},
	methods: {
		getData: async function() {
			let data = await TaskServices.getTasksByModule(this.module);
			return data;
		},
		changed: async function(task) {
			if (task.owner != undefined && task.state == 'Unassigned') {
				task.state = 'To Do';
			}
			if (task.dueDate != undefined) task.dueDate = newDate(task.dueDate);
			let res = await TaskServices.updateTask(task);
			if (res == 'OK') {
				this.content = await this.getData();
				this.$toasted.global.success({
					message: '😎 Task Updated!',
				});
			} else alert(res);
		},
		deleteClick: async function(task) {
			let res = await TaskServices.deleteTask(task);
			if (res == 'OK') {
				this.content = await this.getData();
				this.$toasted.global.success({
					message: '😎 Task Deleted!',
				});
			} else alert(res);
		},
		txtKeyUp: function($event) {
			if ($event.keyCode == 13) {
				this.submitTask(this.$refs.txtAddTask.getValue());
				this.$refs.txtAddTask.empty();
			}
		},
		addTask: function() {
			let txtAddTask = this.$refs.txtAddTask;
			this.submitTask(txtAddTask.getValue());
			txtAddTask.empty();
		},
		submitTask: async function(task) {
			if (task != '') {
				let res = await TaskServices.addTask({
					title: task,
					module: this.module,
				});
				if (res == 'OK') {
					this.content = await this.getData();
					this.$toasted.global.success({
						message: '😎 Task Added!',
					});
				} else alert(res);
			}
		},
		changeState: function(task, newState) {
			if (task.state == 'To Do' && newState == 'Doing') {
				task.state = 'Doing';
			} else if (task.state == 'Doing' && newState == 'Review') {
				task.state = 'Review';
			} else if (task.state == 'Review' && newState == 'Fail') {
				task.state = 'To Do';
			} else if (task.state == 'Review' && newState == 'Approve') {
				task.state = 'Complete';
			}
			this.changed(task);
		},
		newStateButton: function(task) {
			if (task.state == 'To Do') {
				return ['Doing'];
			} else if (task.state == 'Doing') {
				return ['Review'];
			} else if (task.state == 'Review') {
				return ['Approve', 'Fail'];
			} else if (task.state == 'Review') {
				return ['Complete'];
			}
		},
		refresh: async function() {
			this.content = await this.getData();
		},
	},
	async created() {
		this.content = await this.getData();
	},
};

function newDate(date) {
	date = new Date(date);
	let day = date.getDate();
	let month = date.getMonth() + 1; //Months are zero based
	let year = date.getFullYear();
	let dateStr = `${year}-${month}-${day}`;
	return dateStr;
}
</script>

<style lang="scss" scoped>
@import '@/global';

.tasks-container {
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
