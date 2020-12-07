<template>
	<div @click="expand" class="field dialog-container">
		<div class="dialog" v-if="expanded" v-click-outside="collapse">
			<p
				v-for="(option, index) in options"
				:key="index"
				class="dialog-item"
				@click="changed(option)"
			>
				{{ option }}
			</p>
		</div>
		<p class="selected-item">{{ val && val != '' ? val : '&nbsp;' }}</p>
	</div>
</template>

<script>
export default {
	name: 'Combobox',
	props: ['value', 'options'],
	data() {
		return {
			val: this.value,
			expanded: false,
		};
	},
	methods: {
		expand: function() {
			this.expanded = true;
		},
		collapse: function() {
			this.expanded = false;
		},
		changed: function(value) {
			this.val = value;
			this.collapse();
			this.$emit('changed', value);
		},
	},
};
</script>

<style lang="scss" scoped>
@import '@/global.scss';

.field {
	cursor: pointer;
	padding: 1vh;
	margin: 1vh;
	text-align: left;
	&:hover {
		background: rgba($color: transparent, $alpha: 0.1);
		transition: ease-in-out 0.1s;
	}
}

.dialog {
	// height: 100px;
	// background: blue;
	position: absolute;
	z-index: 999;
	background-color: $second-background-color;
	padding: 1vh;
	width: 50%;
	//outline: 1px solid $background-color;
	top: 50px;
	left: -1vh;
}

.dialog-container {
	overflow: visible;
	position: relative;
}

.dialog-item {
	margin: 0.75vh;
	padding: 1vh;
	&:hover {
		background: rgba(0, 0, 0, 0.5);
		color: $text-color;
	}
}

.selected-item {
	font-size: 1.1em;
}
</style>
