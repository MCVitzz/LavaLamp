<template>
	<div class="sidebar">
		<div class="items">
			<router-link to="/" class="item"
				><FontAwesome class="icon" icon="chart-line"
			/></router-link>
			<router-link to="/teams" class="item"
				><FontAwesome class="icon" icon="users"
			/></router-link>
			<router-link to="/tasks" class="item"
				><FontAwesome class="icon" icon="tasks"
			/></router-link>
			<router-link to="/testinggrid" class="item"
				><FontAwesome class="icon" icon="code"
			/></router-link>
			<router-link to="" class="last item"
				><FontAwesome class="icon" icon="cog"
			/></router-link>
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
