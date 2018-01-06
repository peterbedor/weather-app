<template>
	<div>
		<input
			type="text"
			:class="['input', { 'has-results': this.results.length }]"
			:placeholder="placeholder"
			@input="handleInput"
			v-model="query"
			@keyup.enter.prevent="handleSelection"
			@keydown.up.down.prevent="handleNavigation"
		>
		<ul class="results" v-if="results.length">
			<li
				:class="['result', { active: result.active }]"
				v-for="(result, i) in results"
				:key="i"
				v-text="result.address"
				@click="handleClick(result)"
			></li>
		</ul>
	</div>
</template>

<script>
	import map from 'lodash/map';
	import each from 'lodash/each';
	import throttle from 'lodash/throttle';
	import { mapActions, mapGetters } from 'vuex';
	import { str } from '../../utilities/prop-types';
	import { searchByAddress } from '../../services/locations';

	const transform = ({ data: { results } }) => map(results, o => ({
		active: false,
		address: o.formatted_address,
		latitude: o.location.lat,
		longitude: o.location.lng,
		city: o.address_components.city,
		zip: o.address_components.zip,
	}));

	export default {
		nmae: 'location-search',
		props: {
			placeholder: str(),
		},

		methods: {
			...mapActions('locations', {
				addLocationFromCoords: 'addLocationFromCoords',
			}),

			/**
			 * Handle keyup input
			 * @param {KeyboardEvent} $0.target.value
			 */
			handleInput: throttle(async function handleInput({ target: { value } }) {
				if (value.length >= 4) {
					const results = await searchByAddress(value);

					this.results = transform(results);

					if (this.results.length) {
						this.results[0].active = true;
					}
				}
			}, 50),

			/**
			 * Handle the click event
			 * @param {String} $0.latitude
			 * @param {String} $0.longitude
			 */
			handleClick({ latitude, longitude, address, city, zip }) {
				if (!this.hasLocation({ city, zip })) {
					this.addLocationFromCoords({ latitude, longitude })
						.then(() => {
							this.query = address;
							this.clearResults();
							// TODO: clean the notifcation system up
							this.notify();
						});
				} else {
					// TODO: Possibly move these types of things out into a global
					// file and call as a named function
					this.$notify({
						group: 'feedback',
						title: 'Error',
						text: 'Location already in your location\'s list',
						type: 'error',
					});
				}
			},

			/**
			 * Handle keyboard navigation
			 * @param {KeyboardEvent} $0.key
			 */
			handleNavigation({ key }) {
				const activeIndex = this.activeIndex;

				if (key === 'ArrowUp') {
					if (activeIndex !== 0) {
						this.results[activeIndex].active = false;
						this.results[activeIndex - 1].active = true;
					}
				} else if (activeIndex !== (this.results.length - 1)) {
					this.results[activeIndex].active = false;
					this.results[activeIndex + 1].active = true;
				}
			},

			/**
			 * Handle selection by keypress
			 */
			handleSelection() {
				const { latitude, longitude, address, city, zip } = this.results[this.activeIndex];

				if (!this.hasLocation({ city, zip })) {
					this.addLocationFromCoords({ latitude, longitude })
						.then(() => {
							this.query = address;
							this.clearResults();
							// TODO: clean the notifcation system up
							this.notify();
						});
				} else {
					// TODO: Possibly move these types of things out into a global
					// file and call as a named function
					this.$notify({
						group: 'feedback',
						title: 'Error',
						text: 'Location already in your location\'s list',
						type: 'error',
					});
				}
			},

			hasLocation({ city, zip }) {
				let contains = false;

				each(this.locations, (o) => {
					if (o.city === city && o.zip === zip) {
						contains = true;
					}
				});

				return contains;
			},

			/**
			 * Clear the results
			 */
			clearResults() {
				this.results = [];
			},

			notify() {
				this.$notify({
					group: 'feedback',
					title: 'Success',
					text: 'Location added',
					type: 'success',
				});
			},
		},

		computed: {
			...mapGetters('locations', {
				locations: 'locations',
			}),

			activeIndex() {
				return this.results.findIndex(location => location.active === true);
			},
		},

		data: () => ({
			results: [],
			selected: {},
			query: '',
		}),
	};
</script>

<style lang="scss" scoped>
	@import "../../../renderer/assets/scss/_variables";

	div {
		position: relative;
	}
	input {
		margin-bottom: 0;
		&.has-results {
			border-bottom-right-radius: 0;
			border-bottom-left-radius: 0;
		}
	}
	.results {
		list-style-type: none;
		border: 1px solid $lightGray;
		border-bottom-right-radius: $defaultRadius;
		border-bottom-left-radius: $defaultRadius;
		margin-top: -1px;
		position: absolute;
		left: 0;
		right: 0;
	}
	.result {
		padding: 1rem 1.6rem;
		margin: 0;
		background-color: $white;
		cursor: pointer;
		&.active {
			background-color: $primary;
			color: $white;
			&:hover {
				background-color: darken($primary, 5%);
			}
		}
		&:not(:last-child) {
			border-bottom: 1px solid $lighterGray;
		}
		&:hover {
			&:not(.active) {
				background-color: $lightestGray;
			}
		}
	}
</style>
