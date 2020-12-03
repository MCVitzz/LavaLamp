<template>
	<div>
		<div class="summary">
			<IconButton
				class="button"
				color="white"
				:icon="getIcon()"
				@click="toggle"
			/>
			<div class="summary-item"><slot name="summary"></slot></div>
		</div>
		<slot name="details" v-if="expanded"></slot>
	</div>
</template>

<script>
import IconButton from './IconButton';

export default {
	name: 'Collapsible',
	components: { IconButton },
	props: ['value'],
	data() {
		return {
			expanded: false,
		};
	},
	methods: {
		toggle: function() {
			this.expanded = !this.expanded;
			this.$emit('changed', this.expanded);
		},
		getIcon: function() {
			return this.expanded ? 'chevron-down' : 'chevron-right';
		},
	},
	created() {
		if (this.value) this.expanded = this.value;
	},
};
</script>

<style lang="scss" scoped>
.button {
	margin: auto 0;
	height: fit-content;
}

.summary {
	display: flex;
}

.summary-item {
	padding: 1vh;
	margin: 1vh;
	display: flex;
}
</style>
