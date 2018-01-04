<template>
	<div class="overlay">
		<div class="message">

		</div>
		<div class="actions">
			<button class="button">Confirm</button>
			<button class="button">Cancel</button>
		</div>
	</div>
</template>

<script>
	export default {

	};
</script>

<style lang="scss" scoped>
	.overlay {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.2);
	}
</style>
