<template>
	<div class="loader">
		<div class="loader-inner">
			<bounce-loader class="loader-spinner" />
			<h5 v-text="message" v-if="message.length"></h5>
		</div>
	</div>
</template>


<script>
	import { mapGetters } from 'vuex';
	import BounceLoader from 'vue-spinner/src/BounceLoader';

	export default {
		name: 'app-loader',
		components: { BounceLoader },

		computed: {
			...mapGetters('app', {
				message: 'loadingMessage',
			}),
		},
	};
</script>

<style lang="scss" scoped>
	.loader {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(255, 255, 255, 0.8);
	}
	.loader-inner {
		text-align: center;
	}
	.loader-spinner {
		display: inline-block;
		margin: 0 auto;
		margin-bottom: 40px;
	}
</style>
