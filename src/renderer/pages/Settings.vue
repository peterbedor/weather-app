<template>
	<div class="full">
		<dashboard-header :page="true" />
		<div class="content">
			<card padded fill>
				<div class="layout">
					<div class="left">
						<ul class="menu">
							<li @click="active = 'map'">
								Map
							</li>
						</ul>
					</div>
					<div class="right">
						<div v-if="active === 'map'">
							<div class="section">
								<h2>Map Style</h2>
								<div class="styles">
									<div
										:class="['style', { active: selectedMapStyle === `mapbox.${key}` }]"
										v-for="(style, key) in mapStyles"
										:key="key"
										@click="setMapStyle(key)"
									>
										<img :src="`/static/images/${key}.png`" class="style-image" />
										<div class="style-name">
											{{ style.name }}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</card>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import DashboardHeader from '../components/dashboard/Header';
	import Card from '../components/utilities/Card';

	export default {
		name: 'settings-page',
		components: { DashboardHeader, Card },

		methods: {
			...mapActions('weatherMap', {
				setMapStyle: 'setMapStyle',
			}),


		},

		computed: {
			...mapGetters('weatherMap', {
				mapStyles: 'mapStyles',
				selectedMapStyle: 'selectedMapStyle',
			}),
		},

		data: () => ({
			active: 'map',
		}),
	};
</script>

<style lang="scss" scoped>
	@import "../../renderer/assets/scss/_variables";
	@import "../../renderer/assets/scss/_mixins";

	.content {
		padding: 2rem;
		height: 100%;
	}
	.layout {
		display: flex;
		height: 100%;
	}
	.left {
		width: 20rem;
		height: 100%;
	}
	.right {
		width: calc(100% - 20rem);
		height: 100%;
	}
	.menu {
		list-style-type: none;
		font-size: 1.8rem;
		font-weight: 600;
		li {
			cursor: pointer;
			&:hover {
				color: lighten($baseColor, 10%);
			}
		}
	}
	.styles {
		@include row();
	}
	.style {
		@include column(spaced, 1, 4);
		margin-bottom: 6%;
		padding: 1rem;
		border: 1px solid $lighterGray;
		border-radius: .3rem;
		cursor: pointer;
		box-shadow: 0;
		transition: all .2s ease-in-out;
		&:hover {
			box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.1);
			transform: translate3d(-1px, -1px, 0);
			border-color: $primary;
		}
		&.active {
			box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.1);
			transform: translate3d(-1px, -1px, 0);
			border-color: $primary;
		}
	}
	.style-name {
		font-weight: 600;
		font-size: 1.4rem;
		text-transform: uppercase;
	}
	.style-image {
		margin-bottom: 1rem;
	}
</style>
