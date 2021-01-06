<template>
	<div class="container">
		<div class="header">
			<ul class="tab-list">
				<li v-for="(tab, index) in screens" :key="index" class="tab">
					<a
						@click="selectTab(index)"
						:class="index == activeTab ? 'active' : ''"
						class="tab-title"
						>{{ tab.title }}</a
					>
				</li>
			</ul>
		</div>
		<div class="panel">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	name: 'Tabs',
	data() {
		return {
			screens: [],
			activeTab: 0,
		};
	},
	created() {
		this.screens = this.$children;
	},
	mounted() {
		this.selectTab(this.activeTab);
	},
	methods: {
		selectTab: function(index) {
			this.screens[this.activeTab].isActive = false;
			this.screens[index].isActive = true;
			this.activeTab = index;
		},
	},
};
</script>

<style lang="scss" scoped>
@import '@/global';

.tab-list {
	display: flex;
}

.header {
	border-bottom: 1px solid orangered;
}

.active {
	color: white;
	font-weight: bold;
	&:hover {
		cursor: pointer;
	}
}

.tab {
	color: lightgray;
	font-size: 14px;
	list-style: none;
	cursor: pointer;
	&:hover {
		color: gray;
	}
}

.tab-title {
	align-items: center;
	display: flex;
	padding: 1vh;
	text-decoration: none;
}

.panel {
	padding: 2vh 1vh;
}
</style>
