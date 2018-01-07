<template>
	<div class="layout">
		<div class="left">
			<slot name="left" />
		</div>
		<div class="right">
			<slot name="right" />
		</div>
	</div>
</template>

<script>
	export default {

	};
</script>

<style lang="scss" scoped>
	@import "../../assets/scss/_mixins";

	.layout {
		width: 100%;
		height: 100%;
		display: flex;
		overflow: hidden;
	}
	.right {
		width: 100%;
		padding: 2rem;
	}
</style>
