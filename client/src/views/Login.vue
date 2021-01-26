<template>
	<LoginComponent @redraw="$emit('redraw')" />
</template>

<script>
// @ is an alias to /src
import LoginComponent from '@/components/pages/LoginComponent';

export default {
	components: {
		LoginComponent,
	},
};
</script>
