<template>
	<v-container class="mx-2">
		<v-layout row v-if="!loading && myEvils.length !== 0">
			<v-flex xs11 sm9 offset-sm2>
				<h1 class="text--secondary mb-3">List of evil</h1>
				<v-card 
					tile
					z-index="12"
					class="elevation-10 mb-4"
					v-for="evil of myEvils"
					:key="evil.id"
				>
					<v-layout row>
						
						<v-flex xs4>						
							<v-img
								class="ml-3"
								max-height="170"
								max-width="260"
								:src="evil.imageSrc"
							>
							</v-img>
						</v-flex>

						<v-flex xs8>
							<v-card-text>
								<h1 class="text--primary">{{evil.title}}</h1>
								<p>{{evil.description}}</p>
								
							</v-card-text>

							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="info" class="mr-3" :to="'https://mayr-katarn.github.io/mayrkatarn.pages/app-evil-2/evil/' + evil.id">Open</v-btn>
							</v-card-actions>
						</v-flex>

					</v-layout>
				</v-card>
			</v-flex>
		</v-layout>
		<v-layout row v-else-if="!loading && myEvils.length === 0">
			<v-flex xs12>
				<h1 class="text--primary">You have no ads</h1>
			</v-flex>
		</v-layout>
		<div v-else class="text-xs-center">
			<v-flex class="grid-loading">
				<v-progress-circular
					indeterminate
					color="red"
					size="80"
				></v-progress-circular>
			</v-flex>
		</div>
	</v-container>
</template>

<script>
export default {
	computed: {
    myEvils () {
      return this.$store.getters.myEvils
		},
		loading () {
			return this.$store.getters.loading
		}
  },
}
</script>

