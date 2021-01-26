<template>
	<img :src="require(`@/assets/${src}`)" />
</template>

<script>
export default {
	name: 'VImage',
	props: ['src'],
};
</script>
