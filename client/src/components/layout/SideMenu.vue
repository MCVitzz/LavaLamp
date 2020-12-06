<template>
	<div>
		<div @click="close" class="overlay"></div>
		<transition :duration="500" name="slide"
			><div v-if="on" class="container">
				<slot class="content"></slot></div
		></transition>
	</div>
</template>

<script>
export default {
	name: 'SideMenu',
	data() {
		return {
			on: false,
		};
	},
	methods: {
		close: function() {
			this.on = false;
			this.$emit('close');
		},
		keyUp: function($event) {
			if ($event.keyCode == 27) this.close();
		},
	},
	mounted() {
		let self = this;

		window.addEventListener('keyup', function(ev) {
			self.keyUp(ev);
		});

		this.on = true;
	},
};
</script>

<style lang="scss" scoped>
@import '@/global';

.container {
	position: absolute;
	right: 0;
	top: 0;
	z-index: 999;
	height: 100%;
	width: 33%;
}

.overlay {
	position: absolute;
	left: 0;
	top: 0;
	z-index: 998;
	height: 100%;
	width: 100%;
	background: rgba(76, 76, 76, 0.5);
}

.content {
	height: 100%;
}

.slide-enter-active {
	transition: all 0.3s ease;
}
.slide-leave-active {
	transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
	transform: translateX(33%);
	opacity: 0;
}
</style>
