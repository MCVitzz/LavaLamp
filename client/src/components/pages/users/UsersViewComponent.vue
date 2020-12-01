<template>
	<Grid :properties="properties" :content="content">
		<template v-slot:default="slotProps">
			<div class="detail-container">
				{{ slotProps }}
				<IconTextButton
					icon="trash-alt"
					text="Delete"
					@click="deleteClick(slotProps)"
				/>
			</div>
		</template>
	</Grid>
</template>

<script>
import Grid from '../../layout/Grid/Grid';
import UserServices from '../../../services/UserServices';
import IconTextButton from '../../layout/IconTextButton';

export default {
	name: 'UsersViewComponent',
	components: { Grid, IconTextButton },
	data() {
		return {
			content: [],
			properties: [
				{ name: 'firstName', control: 'textbox' },
				{ name: 'lastName', control: 'textbox' },
				{ name: 'email', control: 'textbox', main: true },
			],
		};
	},
	methods: {
		getData: async function() {
			let data = await UserServices.getAllUsers();
			return data;
		},
		deleteClick: function(item) {
			console.log(item);
		},
	},
	async created() {
		this.content = await this.getData();
	},
};
</script>

<style lang="scss" scoped>
@import '@/global';

.detail-container {
	background: $second-background-color;
	text-align: left;
	padding: 2vh;
	margin: 0vh 1vh 0.5vh;
}
</style>
