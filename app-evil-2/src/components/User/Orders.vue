<template>
	<v-container>
		<v-layout row>
			<v-flex xs12 sm6 offset-sm3>
				<h1 class="text--secondary mb-3">Orders</h1>
				<v-list
					subheader
					two-line
					flat
				>
					<v-list-item-group
						v-model="settings"
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
									></v-checkbox>
								</v-list-item-action>

								<v-list-item-content>
									<v-list-item-title>{{ order.name }}</v-list-item-title>
									<v-list-item-subtitle>{{ order.task }}</v-list-item-subtitle>
								</v-list-item-content>
								<v-list>
									<v-btn color="primary" :to="'https://mayr-katarn.github.io/mayrkatarn.pages/app-evil-2/evil/' + order.evilId">Open</v-btn>
								</v-list>
							</template>
						</v-list-item>

						
					</v-list-item-group>
				</v-list>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	data () {
		return {
			orders: [
				{
					id: '11',
					name: 'DR Evil',
					task: 'Buy a LASER SHARKS',
					evilId: '1',
					done: false
				}
			]
		}
	},
	methods: {
		isDone(order) {
			order.done = true
		}
	},
}
</script>