<template>
	<li :class="['item', { default: location.default }]">
		<div :class="['city', { default: location.default }]" @click="handleClick(location)">
			{{ location.city }}, {{ location.state }}
		</div>
		<div class="action" v-if="! location.default" @click="handleDelete(location)">
			<icon type="delete" size="small" />
		</div>
	</li>
</template>

<script>
	import { mapActions } from 'vuex';
	import Icon from '../utilities/Icon';
	import { obj } from '../../utilities/prop-types';

	export default {
		name: 'location-item',
		components: { Icon },

		props: {
			location: obj(),
		},

		methods: {
			...mapActions('locations', {
				removeLocation: 'removeLocation',
				setDefaultLocation: 'setDefaultLocation',
			}),

			handleClick(location) {
				if (!location.default) {
					this.setDefaultLocation(location);
				}
			},

			/**
			 * Handle the deletion of a location
			 */
			handleDelete(location) {
				this.$dialog.confirm('Are you sure you want to delete this location?')
					.then(() => {
						this.removeLocation(location);
						this.$notify({
							group: 'feedback',
							title: 'Success',
							text: 'Location deleted',
							type: 'success',
						});
					}).catch(() => {
						console.log('Clicked on cancel');
					});
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "../../../renderer/assets/scss/_variables";

	.item {
		margin-right: 1.5rem;
		display: flex;
	}

	.city {
		border-top-left-radius: 10rem;
		border-bottom-left-radius: 10rem;
		background-color: $white;
		padding: .5rem 1.5rem;
		font-size: 1.3rem;
		cursor: pointer;
		opacity: .5;
		opacity: .5;
		transition: opacity .2s ease-in-out;
		&:hover {
			opacity: 1;
			.action {
				opacity: 1;
			}
		}
		&.default {
			opacity: 1;
			border-radius: 10rem;
		}
	}

	.action {
		background-color: $white;
		border-top-right-radius: 10rem;
		border-bottom-right-radius: 10rem;
		padding: .5rem 1rem;
		border-left: 1px solid $lighterGray;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		opacity: .5;
		transition: opacity .2s ease-in-out;
		line-height: 1;
		&:hover {
			opacity: 1;
		}
	}
</style>
