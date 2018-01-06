<template>
	<div class="page white">
		<page-header />
		<div class="content-split">
			<div class="content-split-section">
				<h1>Add a location</h1>
				<location-search placeholder="Search by address, zip, city, etc..." />
			</div>
			<div class="content-split-section">
				<h1>Manage Locations</h1>
				<location-manager />
			</div>
		</div>
	</div>
</template>

<script>
	import PageHeader from '../../components/PageHeader';
	import LocationSearch from '../../components/locations/LocationSearch';
	import LocationManager from '../../components/locations/LocationManager';

	export default {
		name: 'add-location',
		components: { PageHeader, LocationSearch, LocationManager },
	};
</script>

<style lang="scss" scoped>
	h1 {
		font-size: 4rem;
		font-weight: 100;
	}
</style>
