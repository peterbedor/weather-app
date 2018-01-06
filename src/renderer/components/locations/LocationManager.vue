<template>
	<ul class="list">
		<li v-for="(location, i) in locations" :key="i" class="list-item">
			<ul class="inner-list">
				<li class="address">
					{{ location.address }}
				</li>
				<li class="coordinates">
					{{ location.coordinates.latitude }}, {{ location.coordinates.longitude }}
				</li>
			</ul>
			<div class="actions">
				<icon :type="location.default ? 'star' : 'star_outline'" @click="handleDefault(location)" />
				<icon type="delete" @click="handleDelete(location)" />
			</div>
		</li>
	</ul>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import Icon from '../utilities/Icon';

	export default {
		name: 'location-manager',
		components: { Icon },

		methods: {
			...mapActions('locations', {
				removeLocation: 'removeLocation',
				setDefaultLocation: 'setDefaultLocation',
			}),

			/**
			 * Handle the default selection of a location
			 */
			handleDefault(location) {
				if (!location.default) {
					this.setDefaultLocation(location);

					this.$notify({
						group: 'feedback',
						title: 'Success',
						text: 'Default location set',
						type: 'success',
					});
				}
			},

			/**
			 * Handle the deletion of a location
			 */
			handleDelete(location) {
				if (location.default) {
					this.$notify({
						group: 'feedback',
						title: 'Error',
						text: 'You can\'t delete a default location',
						type: 'error',
					});

					return;
				}

				this.$dialog.confirm('Are you sure you want to delete this location?')
					.then(() => {
						this.removeLocation(location)
							.then(() => {
								this.$notify({
									group: 'feedback',
									title: 'Success',
									text: 'Location deleted',
									type: 'success',
								});
							}).catch(() => {
								this.$notify({
									group: 'feedback',
									title: 'Error',
									text: 'There was an error when attempting to delete the location',
									type: 'error',
								});
							});
					});
			},
		},

		computed: {
			...mapGetters('locations', {
				locations: 'locations',
			}),
		},
	};
</script>

<style lang="scss" scoped>
	@import "../../../renderer/assets/scss/_variables";

	.list {
		max-height: 30rem;
		overflow: scroll;
	}
	.list,
	.inner-list {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}
	.actions {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 2rem;
	}
	.list {
		border-radius: 3px;
		border: 1px solid $lighterGray;
	}
	.list-item {
		display: flex;
		justify-content: space-between;
		&:not(:last-child) {
			border-bottom: 1px solid $lighterGray;
		}
	}
	.inner-list {
		padding: 1rem;
	}
	.coordinates {
		font-size: 1.2rem;
	}
</style>
