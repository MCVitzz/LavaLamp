<template>
	<div class="tasks-container">
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
			ref="txtAddTask"
			class="input"
			:text="'Add'"
			:placeholder="'+ Add'"
			:value="addValue"
			@buttonClick="addTask"
			@keyUp="txtKeyUp"
		/>
	</div>
</template>

<script>
import Grid from '../../layout/Grid/Grid';
import TaskServices from '../../../services/TaskServices';
import IconTextButton from '../../layout/IconTextButton';
import InputWithButton from '../../layout/InputWithButton';

export default {
	name: 'TasksViewComponent',
	components: { Grid, IconTextButton, InputWithButton },
	props: ['module'],
	data() {
		return {
			addValue: '',
			content: [],
			properties: [
				{ name: 'title', control: 'textbox', main: true },
				{ name: 'dueDate', control: 'datepicker' },
				{
					name: 'priority',
					control: 'combobox',
					options: ['High', 'Medium', 'Low'],
				},
			],
		};
	},
	methods: {
		getData: async function() {
			let data = await TaskServices.getTasksByModule(this.module);
			return data;
		},
		changed: async function(task) {
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
	},
	async created() {
		this.content = await this.getData();
	},
};
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
