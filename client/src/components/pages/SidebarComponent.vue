<template>
	<div class="sidebar">
		<div class="items">
			<div class="item">
				<FontAwesome class="icon" icon="chart-line" />Dashboard
			</div>
			<div class="item"><FontAwesome class="icon" icon="users" />Team</div>
			<div class="item"><FontAwesome class="icon" icon="tasks" />Tasks</div>
			<div class="item"><FontAwesome class="icon" icon="code" />Code</div>
			<div class="last item">
				<FontAwesome class="icon" icon="cog" />Settings
			</div>
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
	margin-top: 6vh;
	border-radius: 0 1.5vh 1.5vh 0;
	left: 0;
	background: $background;
	color: $text-color;
	display: flex;
	text-align: left;
	max-height: 60%;
}
.items {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.item {
	padding: 4vh 6vh 4vh 4vh;
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

	&:hover:first-child {
		border-top-right-radius: 1.5vh;
	}

	&:hover:last-child {
		border-bottom-right-radius: 1.5vh;
	}
}

.last {
	bottom: 0;
}
.icon {
	margin-right: 2vh;
	color: orangered;
}
</style>
