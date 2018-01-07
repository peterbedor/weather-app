<template>
	<card :class="['sidebar', { active: sidebarOpen }]">
		<ul class="location-list">
			<li
				:class="['location-list-item', { active: location.default }]"
				v-for="(location, i) in locations"
				:key="i"
				@click="handleClick(location)"
			>
				<location-circle :label="location.city" />
				<transition name="fade-delay">
					<div v-if="sidebarOpen" class="location-info">
						<div class="location-city">
							{{ location.city }}, {{ location.state }}
						</div>
						<div class="location-coords">
							{{ location.coordinates.latitude }}, {{ location.coordinates.longitude }}
						</div>
					</div>
				</transition>
			</li>
		</ul>
		<div :class="['add-location', { active: sidebarOpen }]">
			<icon type="add" class="add-location-icon" />
			<transition name="fade-delay">
				<div v-if="sidebarOpen" class="add-location-label">
					Add a location
				</div>
			</transition>
		</div>
	</card>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import LocationCircle from '../../components/utilities/LocationCircle';
	// TODO: Make global
	import Card from '../../components/utilities/Card';
	import Icon from '../utilities/Icon';

	export default {
		name: 'dashboard-sidebar',
		components: { LocationCircle, Card, Icon },

		methods: {
			...mapActions('locations', {
				setDefaultLocation: 'setDefaultLocation',
			}),

			handleClick(location) {
				this.setDefaultLocation(location);
			},
		},

		computed: {
			...mapGetters('locations', {
				locations: 'locations',
			}),

			...mapGetters('app', {
				sidebarOpen: 'sidebarOpen',
			}),
		},
	};
</script>

<style lang="scss" scoped>
	@import "../../assets/scss/_variables";

	.sidebar {
		width: 6rem;
		height: 100%;
		background-color: $trueWhite;
		padding-top: 1.4rem;
		will-change: width;
		transition: all .2s ease-in-out;
		&.active {
			width: 20rem;
		}
	}
	.location-list {
		list-style-type: none;
		margin: 0;
		padding: 0;
		width: 100%;
		// padding-left: 1.2rem;
	}
	.location-list-item {
		// margin-bottom: 1.4rem;
		padding: 1.2rem .7rem;
		position: relative;
		display: flex;
		max-height: 6rem;
		cursor: pointer;
		&:hover {
			background: $lightestGray;
		}
		&.active {
			&::after {
				display: block;
				content: '';
				height: 2.3rem;
				width: .2rem;
				background-color: $primary;
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
	.location-city {
		font-size: 1.3rem;
		font-weight: 600;
		line-height: 1;
		text-transform: uppercase;
		margin-bottom: .5rem;
	}
	.location-coords {
		font-size: 1rem;
		font-weight: 300;
		line-height: 1;
	}
	.location-info {
		margin-left: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.add-location {
		position: absolute;
		bottom: 0;
		width: 6rem;
		height: 6rem;
		display: flex;
		// justify-content: center;
		// align-items: center;
		border-top: 1px solid $lighterGray;
		background-color: $trueWhite;
		transition: all .2s ease-in-out;
		cursor: pointer;
		&:hover {
			background-color: $lightestGray;
		}
		&.active {
			width: 20rem;
		}
	}
	.add-location-icon {
		padding: 1.7rem;
	}
	.add-location-label {
		font-size: 1.3rem;
		font-weight: 600;
		text-transform: uppercase;
		margin-left: 1rem;
		justify-content: center;
		display: flex;
		align-items: center;
	}
</style>
