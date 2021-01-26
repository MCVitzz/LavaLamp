<template>
	<div class="header" v-if="shouldShowSidebar">
		<h1 class="logo">
			<Logo :horizontal="true" />
			<span
				class="project-name"
				@mouseover="hoveringProjectTitle = true"
				@mouseleave="hoveringProjectTitle = false"
			>
				{{ projectName }}
				<IconButton
					v-if="hoveringProjectTitle || showProject"
					icon="exchange-alt"
					class="edit-button"
					@click="showProjectList"
				/>
				<div class="dialog-anchor">
					<div
						class="dialog-container"
						v-if="showProject"
						v-click-outside="hideProjectList"
					>
						<p>Your Projects</p>
						<br />
						<p
							class="dialog-item"
							v-for="project in projects"
							:key="project.project.id"
							@click="changeProject(project.project.id)"
						>
							{{ project.project.name }}
						</p>
						<p class="bold dialog-item" @click="newProject">New Project...</p>
					</div>
				</div>
			</span>
		</h1>
		<UserComponent class="user" />
	</div>
</template>

<script>
import UserComponent from './UserComponent.vue';
import Logo from '../../layout/Logo.vue';
import IconButton from '../../layout/IconButton.vue';
import ProjectServices from '../../../services/ProjectServices';
import ProjectUserServices from '../../../services/ProjectUserServices';

export default {
	name: 'Topbar',
	props: ['shouldShowSidebar'],
	components: {
		UserComponent,
		Logo,
		IconButton,
	},
	data() {
		return {
			projectName: '',
			hoveringProjectTitle: false,
			showProject: false,
			projects: [],
		};
	},
	methods: {
		getCurrentProjectName: async function() {
			let project = await ProjectServices.getCurrent();
			return project.name;
		},
		getSelfProjects: async function() {
			let projects = await ProjectUserServices.getByCurrentUser();
			return projects;
		},
		showProjectList: function(e) {
			this.showProject = true;
			e.stopPropagation(); //So the "Click outside" won't trigger"
		},
		hideProjectList: function() {
			this.showProject = false;
		},
		changeProject: async function(newProject) {
			let res = await ProjectUserServices.setCurrentProject(newProject);
			if (res == 'OK') {
				this.$toasted.global.success({
					message: '😎 Changed project!',
				});
				this.$emit('redraw');
			} else {
				this.$toasted.global.error({
					message: '😭 Something went wrong! Please try again later.',
				});
			}
		},
		newProject: function() {
			this.$router.push('/newProject');
		},
	},
	async created() {
		this.projectName = await this.getCurrentProjectName();
		this.projects = await this.getSelfProjects();
	},
};
</script>

<style lang="scss" scoped>
@import '@/global';

.header {
	display: flex;
	padding: 2vh 8vh;
	vertical-align: middle;
	justify-content: space-between;
}
.project-name {
	vertical-align: middle;
	margin: auto 0 auto 4vh;
	color: white;
	display: flex;
}

.logo {
	display: flex;
}

.user {
	height: fit-content;
	margin: auto 0;
}

.edit-button {
	color: orangered;
	margin: 0 1vh !important;
	padding: 1vh !important;
	font-size: 0.5em;
	&:hover {
		background: transparent !important;
	}
}

.dialog-anchor {
	z-index: 999;
	position: relative;
}

.dialog-container {
	position: absolute;
	background: $second-background-color;
	width: max-content;
	overflow: auto;
	padding: 2vh;
	font-size: 0.5em;
	max-height: 400px;
	&:before {
		content: '';
		position: absolute;
		top: 5%;
		left: -100%;
		right: 0;
		margin: 0 auto;
		width: 0;
		height: 0;
		border-right: solid 5px $second-background-color;
		border-bottom: solid 5px transparent;
		border-top: solid 5px transparent;
	}

	.dialog-item {
		cursor: pointer;
		margin-bottom: 1vh;
		font-weight: normal;
		&:last-child {
			margin-bottom: 0;
		}
		&:hover {
			color: orangered;
		}
	}
}
</style>
