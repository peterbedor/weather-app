<template>
	<i :class="['material-icons', size, { clickable }]" :style="styleObj" v-text="type" @click="$emit('click')"></i>
</template>

<script>
	import { str, bool } from '../../utilities/prop-types';

	export default {
		props: {
			type: str(),
			size: str('medium'),
			clickable: bool(true),
			align: str('middle'),
		},

		computed: {
			styleObj() {
				let obj = {};

				if (this.align === 'left') {
					obj = {
						marginLeft: '-20px',
					};
				}

				return obj;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.medium {
		font-size: 24px;
	}
	.small {
		font-size: 18px;
	}
	.large {
		font-size: 48px;
	}
	.clickable {
		cursor: pointer;
	}
</style>
