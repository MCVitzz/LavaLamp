<template>
	<div class="container">
		<h1>
			<Logo class="logo" />
			Create new Project
		</h1>
		<p>
			Project Name
			<Textbox
				ref="txt"
				v-model="projectName"
				placeholder="Enter Project Name..."
				@keyUp="keyUp"
			/>
		</p>
		<Button class="button" value="Next" @clicked="btnLoginClick" />
	</div>
</template>

<script>
import Textbox from '../../layout/Textbox';
import Button from '../../layout/Button';
import Logo from '../../layout/Logo';
import ProjectServices from '../../../services/ProjectServices';

export default {
	name: 'CreateProjectComponent',
	components: { Button, Textbox, Logo },
	data() {
		return {
			projectName: '',
		};
	},
	methods: {
		keyUp: function(e) {
			if (e.keyCode == 13) {
				this.createProject(this.projectName);
			}
		},
		btnLoginClick: function() {
			this.createProject(this.projectName);
		},
		createProject: async function(projectName) {
			await ProjectServices.addProject({ name: projectName });
			this.$toasted.global.success({
				message: '😎 Created project!',
			});
			this.$emit('redraw');
			this.$router.push('/dashboard');
		},
	},
	mounted() {
		this.$refs.txt.focus();
	},
};
</script>

<style lang="scss" scoped>
@import '@/global';

.container {
	height: 40%;
	width: 40%;
	margin: auto;
	background: $second-background-color;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	text-align: center;
	color: white;
}

h1 {
	vertical-align: middle;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
}

.logo {
	width: 25%;
}

.button {
	width: 90%;
}
</style>
