<template>
	<div class="gantt-chart">
		<GanttChart v-if="showGantt" :data="ganttData" />
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
			ganttData: [],
			showGantt: false, //Lazy loading prevents starting gantt with no values
		};
	},
	methods: {
		getGanttData: async function() {
			return await TaskServices.getTasksForCurrentProject();
		},
	},
	async created() {
		this.ganttData = await this.getGanttData();
		this.showGantt = true;
	},
};
</script>

<style lang="scss" scoped>
@import '@/global';

.gantt-chart {
	padding: 10vh;
	height: 100%;
}
</style>
