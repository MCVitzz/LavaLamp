<template>
	<CreateProjectComponent @redraw="$emit('redraw')" />
</template>

<script>
// @ is an alias to /src
import CreateProjectComponent from '@/components/pages/projects/CreateProjectComponent';

export default {
	components: {
		CreateProjectComponent,
	},
};
</script>
