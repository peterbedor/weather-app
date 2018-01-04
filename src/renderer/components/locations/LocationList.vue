<template>
	<ul class="list">
		<location-item v-for="(location, i) in locations" :key="i" :location="location" v-if="i <= 4" />
		<button class="button list-action" @click="$router.push({ name: 'add-location' })">
			<icon type="add" size="medium" />
		</button>
	</ul>
</template>

<script>
	import { mapGetters } from 'vuex';
	import LocationItem from './LocationItem';
	import Icon from '../utilities/Icon';

	export default {
		name: 'location-list',
		components: { LocationItem, Icon },
		computed: {
			...mapGetters('locations', {
				locations: 'locations',
			}),
		},
	};
</script>

<style lang="scss" scoped>
	@import "../../../renderer/assets/scss/_variables";
	@import "../../../renderer/assets/scss/_mixins";

	.list {
		list-style-type: none;
		display: flex;
	}
	.list-action {
		@include circle(4rem);
		padding: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: $white;
		color: $baseColor;
		transition: all .2s ease-in-out;
		&:hover {
			background-color: $lighterGray;
			box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
		}
		&:active {
			box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);

		}
	}
</style>
