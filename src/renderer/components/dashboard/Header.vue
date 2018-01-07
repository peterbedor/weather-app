<template>
	<header class="header">
		<button class="button icon-wrap" @click="toggleSidebar">
			<icon type="location_on" size="large" />
		</button>
		<div class="header-content">
			<div class="current-location">
				{{ defaultLocation.city }}, {{ defaultLocation.state }}
			</div>
			<div class="current-time">
				<current-date format="HH:mm:ss" />
			</div>
		</div>
	</header>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import Icon from '../utilities/Icon';
	import CurrentDate from '../utilities/CurrentDate';

	export default {
		name: 'dashboard-header',
		components: { Icon, CurrentDate },

		methods: {
			...mapActions('app', {
				openSidebar: 'openSidebar',
				closeSidebar: 'closeSidebar',
			}),

			toggleSidebar() {
				if (this.sidebarOpen) {
					this.closeSidebar();
				} else {
					this.openSidebar();
				}
			},
		},

		computed: {
			...mapGetters('locations', {
				defaultLocation: 'defaultLocation',
			}),

			...mapGetters('app', {
				sidebarOpen: 'sidebarOpen',
			}),
		},
	};
</script>

<style lang="scss" scoped>
	@import "../../assets/scss/_variables";

	.header {
		background-color: $primary;
		height: 6rem;
		display: flex;
		width: 100%;
		&-content {
			padding-left: 2rem;
			padding-right: 2rem;
			display: flex;
			align-items: center;
			div {
				color: $trueWhite;
				font-size: 1.8rem;
				font-weight: 600;
			}
		}
	}
	.header-content {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
	.icon-wrap {
		width: 6rem;
		height:6rem;
		color: $trueWhite;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 0;
		background-color: $primary;
		cursor: pointer;
		&:active {
			background-color: darken($primary, 5%);
		}
		&:hover {
			background-color: lighten($primary, 5%);
		}
	}
	.current-time {
		color: $trueWhite;
		font-size: 1.8rem;
		font-weight: 600;
	}
</style>
