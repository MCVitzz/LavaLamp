<template>
	<div :style="grid" class="row" :aria-key="item.id">
		<GridCell
			color="white"
			:property="{ control: 'iconbutton' }"
			:icon="getIcon()"
			@clicked="expand"
		/>
		<GridCell
			v-for="(property, index) in properties"
			:key="index"
			@changed="changed($event, item, property.name)"
			:value="getValue(item, property)"
			:property="property"
			:class="property.main ? 'main' : ''"
		>
			<template v-slot="{ changedFunction, value }">
				<slot
					name="custom"
					:value="value"
					:changedFunction="changedFunction"
				></slot>
			</template>
		</GridCell>
		<div v-if="expanded" class="detail w-100">
			<div v-if="chosen == 'side-menu'">
				<SideMenu @close="expand"> <slot :item="item"></slot></SideMenu>
			</div>
			<div v-else>
				<slot :item="item"></slot>
			</div>
		</div>
	</div>
</template>

<script>
import GridCell from './GridCell';
import SideMenu from '../SideMenu';

export default {
	name: 'GridRow',
	props: ['properties', 'item', 'grid', 'chosen'],
	components: {
		GridCell,
		SideMenu,
	},
	data() {
		return {
			expanded: false,
		};
	},
	methods: {
		changed: function(val, item, property) {
			let actualProperty = property;
			if (property.indexOf('.') != -1) {
				actualProperty = property.split('.')[0];
			}
			this.$emit('changed', val, item, actualProperty);
		},
		expand: function() {
			this.expanded = !this.expanded;
		},
		getIcon: function() {
			return this.expanded ? 'chevron-down' : 'chevron-right';
		},
		getItem: function(item) {
			return item;
		},
		getValue: function(item, property) {
			if (property.name.indexOf('.') == -1) return item[property.name];
			else {
				let propertyCascade = property.name.split('.');
				let value = item;
				for (item of propertyCascade) {
					if (value[item] == undefined) return '';
					value = value[item];
				}
				return value;
			}
		},
	},
	created() {},
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

.main {
	font-weight: bold;
}
</style>
