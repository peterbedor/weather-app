<template>
	<header>
		<location-list />
	</header>
</template>

<script>
	import LocationList from './locations/LocationList';

	export default {
		components: { LocationList },
	};
</script>

<style lang="scss" scoped>
	header {
		padding: 20px 30px;
	}
</style>
