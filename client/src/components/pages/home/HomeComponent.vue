<template>
	<div class="gantt-chart">
		<GanttChart v-if="showGantt" :tasks="ganttData" />
	</div>
</template>

<script>
import GanttChart from '../../layout/GanttChart';
import TaskServices from '../../../services/TaskServices';

export default {
	name: 'HomeComponent',
	components: { GanttChart },
	data() {
		return {
			ganttData: { data: [], links: [] },
			showGantt: false, //Lazy loading prevents starting gantt with no values
		};
	},
	methods: {
		getGanttData: async function() {
			return await TaskServices.getAllTasks();
		},
		parseGanttData: function(data) {
			let tasks = [];
			for (let item of data) {
				let startDate = new Date();
				let endDate = new Date(item.dueDate);
				startDate.setDate(endDate.getDate() - 7);

				tasks.push({
					id: item.id,
					text: item.title,
					start_date: formatDate(startDate),
					duration: 7,
					progress: 1,
				});
			}
			console.table(tasks);
			return tasks;
		},
	},
	async created() {
		this.ganttData.data = this.parseGanttData(await this.getGanttData());
		this.showGantt = true;
	},
};

function formatDate(date) {
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
</script>

<style lang="scss" scoped>
@import '@/global';

.gantt-chart {
	padding: 10vh;
	height: 100%;
}
</style>
