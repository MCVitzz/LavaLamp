<template>
	<div id="grid">
		<div class="headers">
			<p></p>
			<p v-for="(item, index) in properties" :key="index">{{ item }}</p>
		</div>
		<div class="body">
			<div v-for="(item, index) in sortItems(data)" :key="index">
				{{ index }}
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Table',
	props: ['data', 'properties'],
	data() {
		return {
			sort: '$$',
			sortDirection: 'asc',
		};
	},
	methods: {
		sortItems(data) {
			if (this.sort == '$$' || !data || data.length == 0) return data;
			else {
				let dataType = typeof data[this.sort];
				let sort = this.sort;
					if(dataType == 'string')
						return data.sort((a, b) => {
							if (this.sort == 'asc') {
								if (a[sort] < b[sort]) return -1;
								if (a[sort] > b[sort]) return 1;
							} else {
								if (a[sort] > b[sort]) return -1;
								if (a[sort] < b[sort]) return 1;
							}
							return 0;
						});
					if(dataType == 'number')
						return data.sort((a, b) => {
							if (this.sort == 'asc') return a[sort] - b[sort];
							else return b[sort] - a[sort];
						});
					if(data[0] instanceof 'Date') {

					}
				}
			}
		},
	},
};
</script>
<style lang="scss" scoped>
.headers,
.body {
	display: grid;
	grid-template-columns: 1fr 6fr 6fr 6fr;
}
</style>
