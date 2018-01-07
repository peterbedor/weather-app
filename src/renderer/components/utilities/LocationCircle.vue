<template>
	<div :class="['circle', backgroundColor]" v-text="letter" @click="$emit('click')"></div>
</template>

<script>
	import sample from 'lodash/sample';
	import { str } from '../../../renderer/utilities/prop-types';

	export default {
		name: 'location-circle',
		props: {
			label: str('U'),
			color: str(),
		},

		computed: {
			letter() {
				return this.label.charAt(0);
			},
			backgroundColor() {
				const colors = ['green', 'purple'];

				if (this.color) {
					return this.color;
				}

				return sample(colors);
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "../../assets/scss/_variables";
	@import "../../assets/scss/_mixins";

	.circle {
		@include circle(3.9rem);
		min-width: 3.9rem;
		display: flex;
		justify-content: center;
		align-items: center;
		color: $trueWhite;
		font-size: 1.8rem;
		font-weight: 600;
		cursor: pointer;
		transition: all .05s ease-in-out;
		&:active {
			transform: translate3d(1px, 1px, 0);
		}
	}

	.purple {
		background-color: $purple;
		&:hover {
			background-color: lighten($purple, 5%);
		}
	}

	.green {
		background-color: $green;
		&:hover {
			background-color: lighten($green, 5%);
		}
	}

	.blue {
		background-color: $primary;
		&:hover {
			background-color: lighten($primary, 5%);
		}
	}

	.orange {
		background-color: $orange;
		&:hover {
			background-color: lighten($orange, 5%);
		}
	}

	.red {
		background-color: $red;
		&:hover {
			background-color: lighten($red, 5%);
		}
	}
</style>
