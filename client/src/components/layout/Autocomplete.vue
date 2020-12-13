<template>
	<div class="container">
		<Textbox
			ref="txt"
			@changed="search"
			:value="value"
			placeholder="Search..."
			class="textbox"
		/>
		<div class="dialog" v-if="expanded" v-click-outside="collapse">
			<p
				v-for="(option, index) in options"
				:key="index"
				class="dialog-item"
				@click="changed(option)"
			>
				{{ option.text ? option.text : option }}
			</p>
		</div>
	</div>
</template>

<script>
import Textbox from './Textbox';

export default {
	name: 'Autocomplete',
	components: { Textbox },
	data() {
		return {
			options: [],
			value: '',
			expanded: false,
		};
	},
	props: ['provider'],
	methods: {
		expand: function() {
			this.expanded = true;
		},
		collapse: function() {
			this.expanded = false;
		},
		changed: function(value) {
			this.value = value.text;
			this.collapse();
			this.$emit('changed', value.value);
		},
		setValue: function(value) {
			this.value = value;
		},
		search: async function($event) {
			let val = $event.target.value;
			if (val != '') {
				let txtVal = this.$refs.txt.value;
				let results = await this.provider(val);
				this.options = results;
				this.expand();
				this.value = txtVal;
			} else this.collapse();
		},
	},
};
</script>

<style lang="scss" scoped>
@import '@/global.scss';
.container {
	position: relative;
}

.dialog {
	position: absolute;
	z-index: 999;
	background-color: $second-background-color;
	padding: 1vh;
	min-width: fit-content;
	top: 50px;
	left: -1vh;
	max-height: 50vh;
	overflow-y: auto;
}

.dialog-item {
	margin: 0.75vh;
	padding: 1vh;
	font-size: 0.8em;
	&:hover {
		background: rgba(0, 0, 0, 0.5);
		color: $text-color;
		cursor: pointer;
	}
}

.textbox {
	height: fit-content;
}
</style>
