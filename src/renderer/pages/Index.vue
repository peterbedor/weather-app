<template>
	<div class="page">
		<dashboard-header />
		<dashboard-layout>
			<dashboard-sidebar slot="left" />
			<!-- TODO: Fix this -->
			<div slot="right" style="height: 100%">
				<weather-map />
			</div>
		</dashboard-layout>
	</div>
</template>

<script>
	import Card from '../components/utilities/Card';
	import WeatherMap from '../components/weather/Map';
	import DashboardHeader from '../components/dashboard/Header';
	import DashboardSidebar from '../components/dashboard/Sidebar';
	import DashboardLayout from '../components/dashboard/Layout';

	export default {
		name: 'index',
		components: {
			DashboardHeader,
			DashboardSidebar,
			DashboardLayout,
			Card,
			WeatherMap,
		},
	};
</script>
