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
	.small {
		font-size: 1.8rem;
	}
	.medium {
		font-size: 2.4rem;
	}
	.large {
		font-size: 3.2rem;
	}
	.xlarge {
		font-size: 4.8rem;
	}
	.clickable {
		cursor: pointer;
	}
</style>
