<template>
	<v-container >
		<v-layout row>
			<v-flex xs12 sm 10>
				<v-card v-if="!loading">
					<v-img
						class=""
						:src="evil.imageSrc"
						height="500"
					></v-img>
					<v-card-text>
						<h1 class="text--primary">{{evil.title}}</h1>
						<p>{{evil.description}}
						</p>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<add-Edit-Modal :evil='evil' v-if="isOwner"></add-Edit-Modal>
						<app-join-modal :evil='evil'></app-join-modal>
					</v-card-actions>
				</v-card>
				<div v-else class="text-xs-center">
					<v-flex class="grid-loading">
						<v-progress-circular
							indeterminate
							color="red"
							size="80"
						></v-progress-circular>
					</v-flex>
				</div>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import EditModal from './EditModal'

export default {
	props: ['id'],
	computed: {
		evil () {
			const id = this.id
			console.log(id)
			return this.$store.getters.evilById(id)
		},
		loading () {
			return this.$store.getters.loading
		},
		isOwner () {
			return this.evil.ownerId === this.$store.getters.user.id
		}
	},
	components: {
		addEditModal: EditModal
	}
}
</script>