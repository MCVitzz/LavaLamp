<template>
	<div class="container">
		<h1>Members</h1>
		<hr />
		<p class="error" v-if="error">{{ error }}</p>
		<div class="members-container">
			<div
				class="member"
				v-for="(member, index) in members"
				v-bind:item="member"
				v-bind:index="index"
				v-bind:key="member._id"
			>
				<p class="text">
					{{ member.name }} | {{ member.role }} | {{ member.email }}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import MemberService from '../MemberService';

export default {
	name: 'MemberComponent',
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}

.members-container {
	margin: auto;
	background: #515151;
	border-radius: 1.5vh;
	padding: 1vh;
	width: 30%;
}

.member {
	padding-left: 2vh;
	text-align: center;
	color: #dfdfdf;
}
</style>
