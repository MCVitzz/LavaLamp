<template>
	<div class="card">
		<div class="text">{{ member.name }}</div>
		<div class="text">{{ member.role }}</div>
		<div class="text">{{ member.email }}</div>
	</div>
</template>
<script>
export default {
	name: 'MemberCardComponent',
	props: ['member'],
};
</script>
<style scoped>
.card {
	margin: auto;
	padding: 4vh;
	display: grid;
	align-items: center;
	grid-template-columns: 33% 33% 33%;
	text-align: left;
	width: 100%;
}
.text {
	text-align: left;
}
</style>
