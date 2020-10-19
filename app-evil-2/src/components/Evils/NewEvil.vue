<template>
	<v-container>
		<v-layout class="mr-4 ml-4" row>
			<v-flex xs12>
				<h1 class="text--secondary mb-3">Make new Evil</h1>
				<v-form
					ref="form"
					v-model="valid"
					validation
				>
					<v-text-field
						name="title" 
						label="Evil title" 
						type="text"
						v-model="title"
						:rules="[v => !!v || 'Title is required']"
					></v-text-field>
					<v-textarea 						
						name="description" 
						label="Evil description" 
						type="text"
						v-model="description"
						:rules="[v => !!v || 'Description is required']"
						multi-line
					></v-textarea>
					<v-container
						class="px-0"
						fluid
					>
						<v-switch
							v-model="promo"
							label='Make with THE GRATEST?'
						></v-switch>
					</v-container>
				</v-form>
				<v-layout row class="ml-1">
					<v-flex xs12>
						<v-btn class="warning mb-4" @click="triggerUpload">
							Upload photo
							<v-icon right>mdi-upload</v-icon>
						</v-btn>
						<input type="file"
						ref="fileInput"
						style="display: none"
						accept="image/*"
						@change="onFileChange"
						>
					</v-flex>
					<img :src="imageSrc" height="100" v-if="imageSrc">
				</v-layout>
				<v-layout row class="ml-1 mt-4">
					<v-flex xs12>
						<v-btn class="primary" :loading="loading" @click="newEvil" :disabled="!valid || !image || loading">
							New Evil
							<v-icon right>mdi-emoticon-devil-outline</v-icon>
						</v-btn>
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	data () {
		return {
			title: '',
			description: '',
			promo: false,
			valid: false,
			image: null,
			imageSrc: ''
		}
	},
	computed: {
		loading () {
			return this.$store.getters.loading
		}
	},
	methods: {
		newEvil () {
			if (this.$refs.form.validate() && this.image) {
				const evil = {
					title: this.title,
					description: this.description,
					promo: this.promo,
					image: this.image
				}
				this.$store.dispatch('newEvil', evil)
				.then(() => {
					this.$router.push('/list')
				})
				.catch(() => {})
			}
		},
		triggerUpload () {
			this.$refs.fileInput.click()
		},
		onFileChange (event) {
			const file = event.target.files[0]
			const reader = new FileReader()

			reader.onload = () => {
				this.imageSrc = reader.result
			}
			reader.readAsDataURL(file)
			this.image = file
		}
	}
}
</script>