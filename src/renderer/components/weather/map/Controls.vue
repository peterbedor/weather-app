<template>
	<perfect-scroll class="controls-wrap">
		<ul class="controls">
			<li
				v-for="(layer, key) in layers"
				:key="key"
				:class="['control', { inactive: !layer.active }]"
			>
				<div class="control-name" @click="$emit('layerToggled', layer)">
					{{ layer.display }}
				</div>
				<div class="control-opacity" v-if="layer.active">
					<vue-slider
						:value="layer.opacity"
						:min="0"
						:max="1"
						:interval=".1"
						tooltip="hover"
						@input="$emit('layerOpacityChange', layer, $event)"
					/>
				</div>
			</li>
		</ul>
	</perfect-scroll>
</template>

<script>
	import PerfectScroll from 'vue-perfect-scrollbar';
	import VueSlider from 'vue-slider-component';
	import { obj } from '../../../utilities/prop-types';

	export default {
		name: 'map-controls',
		components: { PerfectScroll, VueSlider },
		props: {
			layers: obj(),
		},
	};
</script>

<style lang="scss" scoped>
	@import "../../../assets/scss/_variables";

	.controls-wrap {
		width: 20%;
		min-width: 20.8rem;
		margin-left: 2rem;
	}
	.controls {
		list-style-type: none;
		margin: 0;
		padding: 2rem;
		background-color: $lightestGray;
		overflow: hidden;
	}
	.control {
		font-size: 1.4rem;
		font-weight: 600;
		cursor: pointer;
		&.inactive {
			opacity: 0.5;
		}
	}
</style>
