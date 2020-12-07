<template>
	<div class="d-flex">
		<Textbox
			class="full-row"
			:value="value"
			ref="txt"
			:placeholder="placeholder"
			@focus="toggleIcon"
			@blur="toggleIcon"
			@keyUp="keyUp"
		/>
		<transition :duration="1000" name="slide">
			<div v-if="isActive" v-on:click="click" class="btn-primary">
				<FontAwesome :icon="icon" />
			</div>
		</transition>
	</div>
</template>
<script>
import Textbox from './Textbox';

export default {
	name: 'InputWithIcon',
	data() {
		return {
			isActive: false,
		};
	},
	props: ['icon', 'value', 'placeholder'],
	methods: {
		toggleIcon: function() {
			this.isActive = !this.isActive;
		},
		click: function($event) {
			this.$emit('buttonClick', $event);
		},
		keyUp: function($event) {
			this.$emit('keyUp', $event);
		},
		empty: function() {
			this.$refs.txt.empty();
		},
		getValue: function() {
			return this.$refs.txt.getValue();
		},
	},
	components: {
		Textbox,
	},
};
</script>
<style lang="scss" scoped>
@import '../../global';

.full-row {
	width: 100%;
}

.slide-enter-active {
	transition: all 0.3s ease;
}
.slide-leave-active {
	transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
	transform: translateX(10px);
	opacity: 0;
}
</style>
