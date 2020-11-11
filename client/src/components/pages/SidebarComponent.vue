<template>
	<div class="sidebar">
		<!-- <div class="item first"><img src="../../assets/logo.png" /></div> -->
		<div class="items">
			<div class="item"><FontAwesome class="icon" icon="chart-line" /></div>
			<div class="item"><FontAwesome class="icon" icon="users" /></div>
			<div class="item"><FontAwesome class="icon" icon="tasks" /></div>
			<div class="item"><FontAwesome class="icon" icon="code" /></div>
			<div class="last item"><FontAwesome class="icon" icon="cog" /></div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Sidebar',
};
</script>
<style lang="scss" scoped>
@import '../../global.scss';

.sidebar {
	left: 0;
	background: $second-background-color;
	color: $text-color;
	text-align: left;
	height: 100%;
	display: flex;
}
.items {
	height: 45%;
	margin: auto;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.item {
	padding: 4vh;
	border: 1vh #000;
	font-size: 2.5vh;
	transition: ease-in 0.3s;

	&:hover {
		cursor: pointer;
		background: #191919;
		.icon {
			color: #ff9840;
		}
	}
}

.last {
	bottom: 0;
}
.icon {
	color: orangered;
}

.first {
	top: 0;
}
</style>
