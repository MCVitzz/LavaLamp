<template>
	<div>
		<div class="gstc-wrapper" ref="gstc"></div>
	</div>
</template>

<script>
import GSTC from 'gantt-schedule-timeline-calendar';
import { Plugin as TimelinePointer } from 'gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js';
import 'gantt-schedule-timeline-calendar/dist/style.css';
let gstc, state;
// helper functions
/**
 * @returns { import("gantt-schedule-timeline-calendar").Rows }
 */
function generateRows(data) {
	const rows = {};
	for (let item of data) {
		const id = GSTC.api.GSTCID(item.id.toString());
		rows[id] = {
			id,
			label: item.title,
		};
	}
	return rows;
}
/**
 * @returns { import("gantt-schedule-timeline-calendar").Items }
 */
function generateItems(data) {
	const items = {};
	for (let item of data) {
		if (!item.dueDate) item.dueDate = new Date();
		const id = GSTC.api.GSTCID(item.id.toString());
		const rowId = GSTC.api.GSTCID(item.id);
		let start = GSTC.api.date(item.dueDate).subtract(7, 'day');
		let end = GSTC.api.date(item.dueDate);
		items[id] = {
			id,
			label: item.title,
			rowId,
			time: {
				start: start,
				end: end,
			},
		};
	}
	return items;
}
// main component
export default {
	name: 'GSTC',
	props: ['data'],
	mounted() {
		/**
		 * @type { import("gantt-schedule-timeline-calendar").Config }
		 */
		const config = {
			licenseKey:
				'====BEGIN LICENSE KEY====\njHOV/5KiW/bvzUVGHqeieWa9CkbO0/zlWmGA4gvtcwLMHVg7mTmKnI+LMtBAWrYFBf1CNvi77D0dPq9g6emBuOuKz076Hq6Dr7QLZNKvRz65CUGYbV7ctpKR1+X3Acad8dl1tGGTK3J5COFzlLfMYZA62DxgTeX45j0mChlWa0NypewxHFfEVPkVciHbXUpzk1zQXFeGwaFNez0+zRC7Np72lWoiEBhJAgNbJ2gee12uyyHeIzfYX3jR7YTzkNjtIrtvAH5ETlhGr8ROqPQB3UA0by5CpB3Qm8wvsXLAskG74t8zDl+2cXzMVIN+Xh0eQIHLmcl4KVm06Z9Wdkxa7A==||U2FsdGVkX18sqkXSD/vmKlKBpGFMo1zlFHlzO3mh8KdixyWXCdXRklvHGFAuEiL4kRgUmsKDTN/HS1sAz3Ox1Y+dAluLfpGpIjZX/P+Gi+E=\nRUG7gNure2XCGHmmqMXL+49yOiVrzZfvw2+62GJq+9oSkiiLajyMoDqfpEaaGATbKIvuUwLN5cn8p3S31MN4EVBIy0OZv/QPVnOYBgJo4c5ATCZJCP60WyyuEstlKn0kiFWyqnAsrXFIzd8s0hdrffnQsY8wXEQtY7dZ5XhqxwyWt38xcN8/1Q5twNIIa7vw2CKra0f6OxvKQKJXqcBU6DiTeTijrHlykjhuPFr3CPRE8XDfqJTWUMG8zEJ+5AGhFKn7IktVYR0LOy6mFKs9eXhLYen4lvo/RO/CCnMi+nLu/2pVtwNnvrbElKpG8wzBZ9I2JrZwtK9dWHNVSvKoGg==\n====END LICENSE KEY====',
			plugins: [TimelinePointer()],
			list: {
				columns: {
					data: {
						[GSTC.api.GSTCID('label')]: {
							id: GSTC.api.GSTCID('label'),
							width: 200,
							data: 'label',
							header: {
								content: 'Label',
							},
						},
					},
				},
				rows: generateRows(this.data),
			},
			chart: {
				items: generateItems(this.data),
			},
		};
		state = GSTC.api.stateFromConfig(config);
		gstc = GSTC({
			element: this.$refs.gstc,
			state,
		});
	},
	beforeUnmount() {
		if (gstc) gstc.destroy();
	},
	methods: {
		updateFirstRow() {
			state.update(`config.list.rows.${GSTC.api.GSTCID('0')}`, (row) => {
				row.label = 'Changed dynamically';
				return row;
			});
		},
		changeZoomLevel() {
			state.update('config.chart.time.zoom', 21);
		},
	},
};
</script>
<style lang="scss">
@import '@/global';

.gstc-component {
	margin: 0;
	padding: 0;
}

.gstc {
	background: transparent;
	color: white;
	border-color: white;
}

.gstc__chart-calendar,
.gstc__chart-calendar-date-content,
.gstc__chart-timeline-grid-row-cell,
.gstc__chart-calendar-date,
.gstc__list-column-header {
	background: transparent;
	color: white;
	border-color: white;
}

.gstc__chart-timeline-items-row-item {
	background: rgb(168, 45, 0);
}
</style>
