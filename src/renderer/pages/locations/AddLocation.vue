<template>
	<div class="page white">
		<page-header />
		<div class="content">
			<h1>Add a location</h1>
			<location-search placeholder="Search by address, zip, city, etc..." />
		</div>
	</div>
</template>

<script>
	import PageHeader from '../../components/PageHeader';
	import LocationSearch from '../../components/locations/LocationSearch';

	export default {
		name: 'add-location',
		components: { PageHeader, LocationSearch },
	};
</script>

<style lang="scss" scoped>
	h1 {
		font-size: 4rem;
		font-weight: 100;
	}
</style>
