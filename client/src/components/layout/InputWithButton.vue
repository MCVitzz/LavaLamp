<template>
	<div class="input-with-button">
		<Textbox
			class="full-row"
			:model="textboxValue"
			:placeholder="placeholder"
			@focus="toggleButton"
			@blur="toggleButton"
			@keyUp="txtKeyUp"
		/>
		<transition :duration="1000" name="slide">
			<div v-if="isActive" v-on:click="submit" class="button">
				{{ text }}
			</div>
		</transition>
	</div>
</template>
<script>
import Textbox from './Textbox';

export default {
	name: 'InputWithButton',
	data() {
		return {
			isActive: false,
			textboxValue: '',
		};
	},
	props: ['text', 'value', 'placeholder', 'onClick'],
	methods: {
		toggleButton: function() {
			this.isActive = !this.isActive;
		},
		txtKeyUp: function(e) {
			//Enter
			if (e.keyCode === 13) {
				this.submit();
			}
		},
		submit: function() {
			if (this.textboxValue == '') return;
			this.onClick(this.textboxValue);
			this.textboxValue = '';
		},
	},
	components: {
		Textbox,
	},
};
</script>
<style lang="scss" scoped>
@import '../../global';

.input-with-button {
	display: flex;
}

.button {
	margin: 1vh 1vh 1vh 0vh;
	padding: 1vh 2vh;
	background: orangered;
	cursor: pointer;
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
