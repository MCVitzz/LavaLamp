<template>
	<div class="detail-container">
		<IconTextButton
			class="button"
			icon="trash-alt"
			text="Delete"
			@click="deleteProject(item)"
		/>
	</div>
</template>

<script>
import IconTextButton from '../../layout/IconTextButton';

export default {
	name: 'ProjectDetailComponent',
	components: {
		IconTextButton,
	},
	props: ['project'],
	methods: {
		deleteProject: function() {
			this.$emit('deleted', this.project.project.id);
		},
	},
};
</script>

<style lang="scss" scoped>
@import '@/global';

.button {
	margin-left: 2vh;
}
</style>
