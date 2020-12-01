<template>
	<div :style="grid" class="row">
		<GridCell
			:property="{ control: 'iconbutton' }"
			:icon="getIcon()"
			@clicked="expand"
		/>
		<GridCell
			v-for="(property, index) in properties"
			:key="index"
			@changed="changed($event, item, property.name)"
			:value="item[property.name]"
			:property="property"
			:class="property.main ? 'main' : ''"
		/>
		<div class="detail">
			<slot v-if="expanded"></slot>
		</div>
	</div>
</template>

<script>
import GridCell from './GridCell';

export default {
	name: 'GridRow',
	props: ['properties', 'item', 'grid'],
	components: {
		GridCell,
	},
	data() {
		return {
			expanded: false,
		};
	},
	methods: {
		changed: function($event, item, property) {
			this.$emit('changed', item, property);
		},
		expand: function() {
			this.expanded = !this.expanded;
			console.log(this.expanded);
		},
		getIcon: function() {
			return this.expanded ? 'chevron-down' : 'chevron-right';
		},
	},
};
</script>

<style lang="scss" scoped>
@import '@/global.scss';

.detail {
	grid-column: 1 / -1;
}
.row {
	border-bottom: 1px solid $second-background-color;
}
</style>
