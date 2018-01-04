<template>
	<header>
		<div @click="$router.push({ name: 'index' })">
			<icon type="keyboard_arrow_left" size="large" align="left" clickable />
			<h2>Back</h2>
		</div>
	</header>
</template>

<script>
	import Icon from '../components/utilities/Icon';

	export default {
		name: 'page-header',
		components: { Icon },
	};
</script>

<style lang="scss" scoped>
	header {
		padding: 20px 30px;
		h2 {
			font-weight: 300;
			cursor: pointer;
		}
		div {
			display: flex;
		}
	}
</style>
