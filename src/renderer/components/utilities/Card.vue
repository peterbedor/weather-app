<template>
	<div class="card">
		<slot />
	</div>
</template>

<script>
	export default {

	};
</script>


<style lang="scss" scoped>
	@import "../../assets/scss/_variables";

	.card {
		background: $trueWhite;
		box-shadow: 0 2px 6px 0 rgba(0,0,0,0.12);
	}
</style>

