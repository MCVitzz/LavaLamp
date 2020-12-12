<template>
	<div>
		<div class="gstc-wrapper" ref="gstc"></div>
	</div>
</template>

<script>
import GSTC from 'gantt-schedule-timeline-calendar';
import { Plugin as TimelinePointer } from 'gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js';
import { Plugin as Selection } from 'gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js';
import { Plugin as ItemResizing } from 'gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min.js';
import { Plugin as ItemMovement } from 'gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min.js';
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
				'====BEGIN LICENSE KEY====\nXOfH/lnVASM6et4Co473t9jPIvhmQ/l0X3Ewog30VudX6GVkOB0n3oDx42NtADJ8HjYrhfXKSNu5EMRb5KzCLvMt/pu7xugjbvpyI1glE7Ha6E5VZwRpb4AC8T1KBF67FKAgaI7YFeOtPFROSCKrW5la38jbE5fo+q2N6wAfEti8la2ie6/7U2V+SdJPqkm/mLY/JBHdvDHoUduwe4zgqBUYLTNUgX6aKdlhpZPuHfj2SMeB/tcTJfH48rN1mgGkNkAT9ovROwI7ReLrdlHrHmJ1UwZZnAfxAC3ftIjgTEHsd/f+JrjW6t+kL6Ef1tT1eQ2DPFLJlhluTD91AsZMUg==||U2FsdGVkX1/SWWqU9YmxtM0T6Nm5mClKwqTaoF9wgZd9rNw2xs4hnY8Ilv8DZtFyNt92xym3eB6WA605N5llLm0D68EQtU9ci1rTEDopZ1ODzcqtTVSoFEloNPFSfW6LTIC9+2LSVBeeHXoLEQiLYHWihHu10Xll3KsH9iBObDACDm1PT7IV4uWvNpNeuKJc\npY3C5SG+3sHRX1aeMnHlKLhaIsOdw2IexjvMqocVpfRpX4wnsabNA0VJ3k95zUPS3vTtSegeDhwbl6j+/FZcGk9i+gAy6LuetlKuARjPYn2LH5Be3Ah+ggSBPlxf3JW9rtWNdUoFByHTcFlhzlU9HnpnBUrgcVMhCQ7SAjN9h2NMGmCr10Rn4OE0WtelNqYVig7KmENaPvFT+k2I0cYZ4KWwxxsQNKbjEAxJxrzK4HkaczCvyQbzj4Ppxx/0q+Cns44OeyWcwYD/vSaJm4Kptwpr+L4y5BoSO/WeqhSUQQ85nvOhtE0pSH/ZXYo3pqjPdQRfNm6NFeBl2lwTmZUEuw==\n====END LICENSE KEY====',
			plugins: [TimelinePointer(), Selection(), ItemResizing(), ItemMovement()],
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
