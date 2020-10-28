<template>
	<div class="container">
		<h1 class="title">Team</h1>
		<p class="error" v-if="error">{{ error }}</p>
		<div class="members-container">
			<div class="header">
				<div class="headerColumn">Name</div>
				<div class="headerColumn">Role</div>
				<div class="headerColumn">E-mail</div>
			</div>
			<MemberCardComponent
				class="member"
				v-for="(member, index) in members"
				v-bind:item="member"
				v-bind:index="index"
				v-bind:key="member._id"
				v-bind:member="member"
			></MemberCardComponent>
		</div>
	</div>
</template>

<script>
import MemberService from '../services/MemberService';
import MemberCardComponent from './MemberCardComponent';

export default {
	name: 'MemberComponent',
	components: {
		MemberCardComponent,
	},
	data() {
		return {
			members: [],
			error: '',
			text: '',
		};
	},
	async created() {
		try {
			this.members = await MemberService.getMembers();
		} catch (err) {
			this.error = err.message;
		}
	},
};
</script>

<style scoped>
.header {
	margin: 0vh auto 0vh;
	width: 100%;
	color: #fdfdfd;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	padding: 0vh 4vh;
}

.headerColumn {
	text-align: left;
}

.title {
	text-align: left;
	color: #fdfdfd;
	margin: 1vh 0vh 4vh;
	padding-left: 3vh;
}

.container {
	margin: auto;
	background: #2e2e2e;
	padding: 4vh;
	border-radius: 1.5vh;
	width: 67%;
}

.members-container {
	margin: auto;
	padding: 1vh;
	border-spacing: 0;
	border-radius: 1.5vh;
	display: grid;
}

.member {
	margin: 1vh auto 2vh;
	background: #515151;
	border-radius: 1.5vh;
	text-align: left;
	color: #dfdfdf;
}
</style>
