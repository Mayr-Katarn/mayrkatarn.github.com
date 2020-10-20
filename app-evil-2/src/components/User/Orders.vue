<template>
	<v-container>
		<v-layout row>
			<v-flex xs12 class="text-xs-center" v-if="loading">
				<v-flex class="grid-loading">
					<v-progress-circular
						indeterminate
						color="red"
						size="80"
					></v-progress-circular>
				</v-flex>
			</v-flex>
			<v-flex xs12 sm6 offset-sm3 v-else-if="!loading && orders.lenght !== 0">
				<h1 class="text--secondary mb-3">Orders</h1>
				<v-list
					subheader
					two-line
					flat
				>
					<v-list-item-group
						multiple
					>
						<v-list-item
							v-for="order of orders"
							:key="order.id"
						>
							<template>
								<v-list-item-action>
									<v-checkbox
										:input-value="order.done"
										color="primary"
										@change="isDone(order)"
									></v-checkbox>
								</v-list-item-action>

								<v-list-item-content>
									<v-list-item-title>{{ order.name }}</v-list-item-title>
									<v-list-item-subtitle>{{ order.contact }}</v-list-item-subtitle>
								</v-list-item-content>
								<v-list>
									<v-btn color="primary" :to="'/mayrkatarn.pages/app-evil-2/evil/' + order.evilId">Open</v-btn>
								</v-list>
							</template>
						</v-list-item>

						
					</v-list-item-group>
				</v-list>
			</v-flex>
			<v-flex xs12 class="text-xs-center" v-else>
				<h1 class="text--secondary">You have nothing!</h1>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	computed: {
		loading() {
			return this.$store.getters.loading
		},
		orders() {
			return this.$store.getters.orders
		}
	},
	methods: {
		isDone(order) {
			this.$store.dispatch('markOrderDone', order.id)
			.then(() => {
				order.done = true
			})
			.catch(() => {})
		}
	},
	created() {
		this.$store.dispatch('fetchOrders')	
	}
}
</script>