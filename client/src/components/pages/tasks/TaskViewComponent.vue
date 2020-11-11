<template>
	<div class="frame">
		<div class="tasks-container">
			<div class="headers">
				<div class="header">Title</div>
				<div class="header">Due</div>
				<div class="header">Priority</div>
			</div>
			<div class="items">
				<TaskComponent
					ref="tasks"
					v-for="(item, index) in items"
					v-bind:item="item"
					v-bind:key="item._id"
					v-bind:index="index"
					v-bind:task="item"
					v-bind:requestEdit="requestEdit"
					v-bind:editTask="editTask"
				/>
				<InputWithButton
					class="unoficial-item"
					v-bind:text="'Add'"
					v-bind:placeholder="'+ Add'"
					v-bind:onClick="addTask"
					v-bind:value="addValue"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import TaskServices from '../../../services/TaskServices';
import TaskComponent from './TaskComponent';
import InputWithButton from '../../layout/InputWithButton';
export default {
	name: 'TaskViewComponent',
	data() {
		return {
			addValue: '',
			items: [],
			error: '',
			text: '',
		};
	},
	methods: {
		addTask: async function(task) {
			let res = await TaskServices.addTask(task);
			if (res == 'OK') this.items = await TaskServices.getAllTasks();
			else alert(res);
			//this.items.push({ title: task, due: '08/11/2020', priority: 'High' });
		},
		requestEdit: function(reqIdx) {
			this.$nextTick(function() {
				let tasks = this.$refs.tasks;
				for (let idx in tasks) {
					if (reqIdx != idx) tasks[idx].removeClick();
				}
			});
		},
		editTask: async function(task) {
			let res = await TaskServices.updateTask(task);
			if (res == 'OK') this.items = await TaskServices.getAllTasks();
			else alert(res);
		},
	},
	components: {
		TaskComponent,
		InputWithButton,
	},
	async created() {
		try {
			this.items = await TaskServices.getAllTasks();
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

#addTask {
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

.tasks-container {
	color: white;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: max-content;
}

.headers,
/deep/ .item {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
}

.headers {
	max-height: 10%;
}

.headers,
.items {
	grid-column: 1 / 4;
}

.header {
	color: grey;
	font-size: 1.2em;
}

.header,
/deep/ .field {
	padding: 1vh;
	margin: 1vh;
	text-align: left;
}

/deep/ .item,
/deep/ .unoficial-item {
	border-bottom: 1px solid #1c1c1c;
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
