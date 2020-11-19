<template>
	<div class="detail-container">
		<IconTextButton icon="trash-alt" text="Delete" @click="deleteClick" />
	</div>
</template>
<script>
import IconTextButton from '../../layout/IconTextButton';

export default {
	name: 'UserDetailComponent',
	components: {
		IconTextButton,
	},
	methods: {
		deleteClick: function($event) {
			this.$emit('deleteUser', $event);
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../../../global';

.detail-container {
	background: $second-background-color;
	text-align: left;
	padding: 2vh;
	margin: 0vh 1vh 0.5vh;
}
</style>
