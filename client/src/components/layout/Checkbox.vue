<template>
	<input type="checkbox" class="checkbox" />
</template>
<script>
export default {
	name: 'Checkbox',
};
</script>
<style lang="scss" scoped>
@import '../../global';

.checkbox {
	position: relative;
	width: 16px;
	height: 16px;
	margin: 0;
	display: inline-block;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	-o-user-select: none;
	user-select: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	outline: 0;
}

.checkbox:after {
	content: '';
	position: absolute;
	display: block;
	z-index: 1;
	width: 16px;
	height: 16px;
	border: 1px solid #dedede;
	border-radius: 2px;
}

.checkbox[type='checkbox']:before {
	background: #f6ac4f url('http://i.imgur.com/dR1TM0y.png');
	background-size: 10px 8px;
	background-repeat: no-repeat;
	background-position: 3px 4px;
	position: absolute;
	left: 2px;
	z-index: 2;
	opacity: 0;
	width: 100%;
	height: 100%;
	color: #f6ac4f;
}

.checkbox[type='checkbox']:checked:before {
	content: '';
	position: absolute;
	top: 0px;
	opacity: 1;
	left: 0px;
	border: 1px solid #f6ac4f;
	border-radius: 2px;
}
</style>
