<template>
	<div class="page">
		<dashboard-header />
		<div class="content">
			<current-date format="dddd MMMM DD" />
		</div>
	</div>
</template>

<script>
	import DashboardHeader from '../components/DashboardHeader';
	import CurrentDate from '../components/utilities/CurrentDate';

	export default {
		name: 'index',
		components: { DashboardHeader, CurrentDate },
	};
</script>
