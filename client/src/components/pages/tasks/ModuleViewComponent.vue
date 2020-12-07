<template>
	<div class="container">
		<div class="add-button">
			<IconTextButton icon="plus" text="Add Module" @click="addModule" />
		</div>
		<div class="module-container" v-for="(item, index) in modules" :key="index">
			<Collapsible
				:value="!item.collapsed"
				@changed="changedCollapse(item, $event)"
			>
				<template class="module-header" v-slot:summary>
					<TextboxClickToEdit
						class="module-title"
						ref="module"
						:value="item.title"
						@changed="changed(item, $event)"
					/>
					<IconButton
						class="delete-button"
						icon="trash-alt"
						@click="deleteModule(item)"
					/>
				</template>
				<template v-slot:details
					><TaskViewComponent class="tasks-container" :module="item._id"
				/></template>
			</Collapsible>
		</div>
	</div>
</template>

<script>
import Collapsible from '../../layout/Collapsible';
import TextboxClickToEdit from '../../layout/TextboxClickToEdit';
import IconButton from '../../layout/IconButton';
import IconTextButton from '../../layout/IconTextButton';
import ModuleServices from '../../../services/ModuleServices';
import TaskViewComponent from './TaskViewComponent';

export default {
	name: 'ModuleViewComponent',
	components: {
		TaskViewComponent,
		Collapsible,
		TextboxClickToEdit,
		IconTextButton,
		IconButton,
	},
	data() {
		return {
			modules: [],
		};
	},
	methods: {
		getModules: async function() {
			let data = await ModuleServices.getAllModules();
			return data;
		},
		changed: function(item, $event) {
			item.title = $event;
			ModuleServices.updateModule(item);
		},
		changedCollapse: function(item, $event) {
			item.collapsed = !$event;
			ModuleServices.updateModule(item);
		},
		addModule: async function() {
			let res = await ModuleServices.addModule('');
			if (res == 'OK') {
				this.modules = await this.getModules();
				this.$nextTick(function() {
					this.$refs['module'][this.modules.length - 1].focus();
				});
			} else console.log(res);
		},
		deleteModule: async function(module) {
			console.log(module);
			let res = await ModuleServices.deleteModule(module);
			if (res == 'OK') {
				this.modules = await this.getModules();
			} else alert(res);
		},
	},
	async created() {
		this.modules = await this.getModules();
	},
};
</script>

<style lang="scss" scoped>
@import '@/global';

.add-button {
	padding: 0 2vh;
	text-align: left;
	width: 100%;
	margin-bottom: 2vh;
}

.module-header {
	display: flex;
}

.module-title {
	color: white;
	text-align: left;
	font-size: 1.2em;
	height: fit-content;
}

.delete-button {
	border: 1px solid orangered;
	border-radius: 1vh;
	color: orangered;
}

.tasks-container {
	padding: 2vh 4vh 1vh 4vh;
	border-left: 1px solid $second-background-color;
}

.container {
	padding: 4vh;
	width: 100%;
}
</style>