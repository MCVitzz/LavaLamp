<template>
	<div class="card">
		<div>{{ member.name }}</div>
		<div>{{ member.role }}</div>
		<div>{{ member.email }}</div>
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
	grid-template-columns: repeat(3, 1fr);
	width: 100%;
	font-size: 2vh;
}
</style>
