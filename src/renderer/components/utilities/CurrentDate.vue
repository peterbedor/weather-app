<template>
	<div class="text-shadow">
		{{ date }}
	</div>
</template>

<script>
	import moment from 'moment/moment';
	import { str } from '../../utilities/prop-types';

	const getDate = format => moment().format(format);

	export default {
		name: 'current-date',
		props: {
			format: str('dddd MMMM DD, YYYY HH:mm:ss'),
		},

		mounted() {
			this.date = getDate(this.format);

			setInterval(() => {
				this.date = getDate(this.format);
			}, 1000);
		},

		data: () => ({
			date: '',
		}),
	};
</script>

<style lang="scss" scoped>
	@import "../../../renderer/assets/scss/_variables";

	div {
		font-size: 1.8rem;
		color: $white;
	}
</style>
