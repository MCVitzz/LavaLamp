<template>
	<div class="detail-container">
		<Tabs>
			<Tab title="Details">
				<div class="form">
					<span class="label">Approver</span>
					<SelectUserComponent
						class="sltUser"
						:value="task.approver"
						:changed="changeApprover"
					/>
				</div>
			</Tab>
			<Tab title="Map">
				<div>
					<AddressFinder
						class="address-finder"
						@changed="changeAddress"
						:address="task.address"
					/>
					<IconTextButton
						class="button"
						icon="trash-alt"
						text="Delete"
						@click="deleteTask(item)"
					/>
					<Button
						v-for="(value, index) in getValue()"
						:key="index"
						class="button"
						:value="value"
						@clicked="stateChange(value)"
					/>
				</div>
			</Tab>
		</Tabs>
	</div>
</template>

<script>
import AddressFinder from '../../layout/AddressFinder';
import IconTextButton from '../../layout/IconTextButton';
import SelectUserComponent from '../users/SelectUserComponent';
import Button from '../../layout/Button';
import Tabs from '../../layout/Tabs/Tabs';
import Tab from '../../layout/Tabs/Tab';

export default {
	name: 'TaskDetailComponent',
	components: {
		AddressFinder,
		IconTextButton,
		Button,
		SelectUserComponent,
		Tabs,
		Tab,
	},
	props: ['task', 'stateButton'],
	methods: {
		deleteTask: function() {
			this.$emit('deleted', this.task);
		},
		getValue: function() {
			return this.stateButton(this.task);
		},
		stateChange: function(newState) {
			this.$emit('stateChange', this.task, newState);
		},
		changeAddress: function(address) {
			this.task.address = address;
			this.$emit('changed', this.task);
		},
		changeApprover: function(user) {
			this.task.approver = user;
			this.$emit('changed', this.task);
		},
	},
};
</script>

<style lang="scss" scoped>
@import '@/global';

.button {
	margin-left: 2vh;
}

.address-finder {
	width: 100%;
	max-width: 100%;
	height: 30vh;
	margin-bottom: 2vh;
}

.label {
	align-items: center;
	display: inline-flex;
}

.sltUser {
	border: 1px solid $background-color;
}

.form {
	display: grid;
	grid-template-columns: 1fr 1fr;
}
</style>
