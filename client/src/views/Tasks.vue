<template>
	<TaskViewComponent />
</template>

<script>
// @ is an alias to /src
import TaskViewComponent from '@/components/pages/tasks/TaskViewComponent';

export default {
	components: {
		TaskViewComponent,
	},
	created() {
		console.log('Tasks');
	},
};
</script>
