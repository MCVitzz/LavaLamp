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
	console.log(data);
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
				'====BEGIN LICENSE KEY====\noK+qeV3O9wJwzzZ6/5uyj6QZcJHOCZjzbDdWk3fNnQATzPk1ZvNMWRQH7p4vL4VMsI3y90h8JOtx6cBdNoe/FDWqLXySlybeoZzdd6Nh6A4goYSwrRoS8GfsAwRIiZorfjbl+3poDp9vDdEJJqadWDmwCGYDBUTlTOl2zGc6O71+Qk2ibXRmSZv/CeAZTr2xbCTTWl94YwJZyeRp2OnTR1mb2Ma57sGP5v8PtlpSh1uH7NUmddJy5HqX5E6aSbxZK65rx5nSpuR1Uz2XKAJVGZxFxGU4PRo/0q9SqLudjAFvYV2WVwZ4SFWvDI9mzsrW4qeFQN+j7r1B8KJ/aQqheQ==||U2FsdGVkX1+5nnCVS5yd/J2MVm8JyIoUpdV30ebg9W8djgwMNJGNpABChQyA9qrj7B5Md2G1NXcKjXGqoBYDM6wzhX9Uus9O3E+Xg+KvHYE=\nIol6PNivAvBUb0WQ14BoUsZGMDXpDq51lGe2m7wNeO+aZ4KKYAxNH6HXWVaqTM4PWs1HtqcaSyu592KkYsZ2x2I7qEmm/+VUhcNWyYCtMbNH/uqTzk38K1RynR55+7bGZCaNXfhFgEcQPCP3XwLRbwFX1gFnl7biIWWlavuIZHUgVGQD+nvzCF/PubBxPJKZdH9K5ltaM/eZ4Dvm3Rq4DhjH0y4I1AAuUdMa7gmNjQJhL9YHYsuEo40vgU+0+fpoeOWLQ7HPsFRPmUp2dKtaixtAqflQ5K/4enzxLcmfY6NIssrP5Lf5ZUEv+67Fy76JbII/DTtam9OK+e/NeweNUQ==\n====END LICENSE KEY====',
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
