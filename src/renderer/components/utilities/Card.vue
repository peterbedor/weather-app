<template>
	<div :class="['card', { padded, fill }]">
		<slot />
	</div>
</template>

<script>
	import { bool } from '../../utilities/prop-types';

	export default {
		name: 'card',
		props: {
			padded: bool(false),
			fill: bool(false),
		},
	};
</script>


<style lang="scss" scoped>
	@import "../../assets/scss/_variables";

	.card {
		background: $trueWhite;
		box-shadow: 0 2px 6px 0 rgba(0,0,0,0.12);
	}
	.padded {
		padding: 2rem;
	}
	.fill {
		height: 100%;
	}
</style>

