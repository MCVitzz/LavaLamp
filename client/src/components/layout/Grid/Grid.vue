<template>
	<div class="grid-container">
		<div :style="grid" class="headers">
			<p class="header"></p>
			<p class="header" v-for="(property, index) in properties" :key="index">
				{{ toRegular(property.name) }}
			</p>
		</div>
		<div class="body">
			<GridRow
				:grid="grid"
				:properties="properties"
				v-for="(item, idx) in content"
				:key="idx"
				:item="item"
				:chosen="chosen"
				@changed="changed"
			>
				<template v-slot:custom="{ changedFunction, value }"
					><slot
						:value="value"
						:changedFunction="changedFunction"
						name="custom"
					></slot
				></template>
				<template v-slot="{ item }">
					<slot :item="item"></slot>
				</template>
			</GridRow>
		</div>
	</div>
</template>
<script>
import GridRow from './GridRow';

export default {
	name: 'Grid',
	props: ['properties', 'content', 'gridDisplay', 'chosen'],
	components: {
		GridRow,
	},
	data() {
		return {
			grid: {
				display: 'grid',
				gridTemplateColumns: '1fr 6fr 6fr 6fr',
			},
		};
	},
	methods: {
		toRegular: function(text) {
			text = text.split('.')[0];
			let result = text.replace(/([A-Z])/g, ' $1');
			let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
			return finalResult;
		},
		changed: function(val, item, property) {
			item[property] = val;
			this.$emit('changed', item);
		},
	},
	async created() {
		if (this.gridDisplay) this.grid.gridTemplateColumns = this.gridDisplay;
		else
			this.grid.gridTemplateColumns =
				'1fr ' + '6fr '.repeat(this.properties.length);
	},
};
</script>
<style lang="scss" scoped>
@import '@/global.scss';

.headers {
	color: grey;
	font-size: 1.2em;
}

.headers,
.body {
	width: 100%;
}

.body {
	color: white;
	overflow-y: scroll;
	max-height: 450px;
}

.header {
	padding: 1vh;
	margin: 1vh;
	text-align: left;
}

.main {
	font-weight: bold;
}

.grid-container {
	margin: auto;
	width: 100%;
}
</style>
