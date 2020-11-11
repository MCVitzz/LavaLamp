<template>
	<VueJSDatepicker
		@selected="selected"
		:v-model="model"
		:value="value"
		:calendar-class="'datepicker'"
		:input-class="'datepicker-input'"
	/>
</template>
<script>
import VueJSDatepicker from 'vuejs-datepicker';
export default {
	name: 'Datepicker',
	components: {
		VueJSDatepicker,
	},
	props: ['value', 'model'],
	methods: {
		selected: function($event) {
			this.$emit('selected', $event);
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../../global';

/deep/ .datepicker {
	transition: ease-in-out 1s;
	color: $text-color;
	background: $second-background-color;
	border: 0;
	padding: 0.5vh;
	margin-top: 1vh;

	header {
		.prev,
		.next,
		.day__month_btn {
			color: $text-color;
			&:hover {
				color: orangered;
				background: $second-background-color !important;
			}
		}

		.prev {
			&:after {
				border-right-color: $text-color;
			}
			&:hover {
				&:after {
					border-right-color: orangered;
				}
			}
		}

		.next {
			&:after {
				border-left-color: $text-color;
			}
			&:hover {
				&:after {
					border-left-color: orangered;
				}
			}
		}

		&:hover {
			color: orangered;
			background: $second-background-color !important;
		}
	}

	.day {
		&:hover {
			transition: ease-in-out 0.2s;
			border: 1px solid orangered !important;
		}
	}

	.selected {
		transition: ease-in-out 0.2s;
		background: orangered !important;
	}
}

/deep/ .datepicker-input {
	padding: 0 !important;
	width: 100%;
	background: transparent;
	color: white;
	font-size: 1.1em;
	border: 0;
	&:placeholder {
		color: white;
	}
	&:focus {
		outline: 0;
	}
}
</style>
