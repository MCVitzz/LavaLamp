<template>
	<div @click="expand" class="field dialog-container">
		<div class="dialog" v-if="expanded" v-click-outside="collapse">
			<Textbox
				class="search-box"
				icon="search"
				placeholder="Search"
				@keyUp="search"
			/>
			<p
				v-for="(option, index) in options"
				:key="index"
				class="dialog-item"
				@click="changedVal(index)"
			>
				{{ option.firstName }} {{ option.lastName }}
			</p>
		</div>
		<p class="selected-item">{{ val && val != '' ? val : '&nbsp;' }}</p>
	</div>
</template>

<script>
import ProjectUserServices from '../../../services/ProjectUserServices';
import Textbox from '../../layout/Textbox';

export default {
	name: 'SelectUserComponent',
	components: { Textbox },
	props: {
		value: {},
		changed: Function,
		editable: { type: Boolean, default: true },
	},
	data() {
		return {
			val: '',
			expanded: false,
			options: [],
			fullContent: [],
		};
	},
	methods: {
		getData: async function() {
			return await ProjectUserServices.getByCurrentProjectDeep();
		},
		expand: function() {
			if (this.editable) this.expanded = true;
		},
		collapse: function() {
			if (this.editable) this.expanded = false;
		},
		changedVal: function(index) {
			let user = this.options[index];
			this.val = `${user.firstName} ${user.lastName}`;
			this.collapse();
			this.changed(user.id);
		},
		search: function($event) {
			let value = $event.target.value;
			if (value.trim() != '') {
				this.options = this.fullContent.filter(
					(el) => el.firstName.toLowerCase().indexOf(value.toLowerCase()) > -1
				);
				console.log(this.options);
			} else {
				this.options = [...this.fullContent];
			}
		},
		adjustValue: function() {
			if (this.value) {
				let user = this.fullContent.find((el) => el.id == this.value);
				this.val = `${user.firstName} ${user.lastName}`;
			}
		},
		empty: function() {
			this.val = '';
		},
		parseData: function(data) {
			let newData = [];
			for (let item of data) {
				newData.push(item.user);
			}
			return newData;
		},
	},
	async created() {
		this.fullContent = this.parseData(await this.getData());
		this.val = this.value;
		this.options = [...this.fullContent];
		this.adjustValue();
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

.search-box {
	border-bottom: 1px solid $second-background-color;
}
</style>
