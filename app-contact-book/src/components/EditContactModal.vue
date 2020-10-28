<template>

  <!-- modal form -->
  <v-dialog
    v-model="dialog"
    scrollable 
    persistent :overlay="false"
    max-width="700px"
    transition="dialog-transition"
  >

    <!-- edit button form providing opening modal window -->
    <template v-slot:activator="{ on }">
      <v-btn color="edit" depressed v-on="on"><v-icon class="mr-2">mdi-account-edit</v-icon>Edit</v-btn>
    </template>

      <!-- card of modal -->
      <v-card>

        <!-- title of modal -->
        <v-card-title class="headline edit lighten-2 mb-2">
          Edit contact
        </v-card-title>

        <v-card-text>
          <v-form v-model="valid">

            <!-- first part with text fields of contact name, phone, email and website -->
            <v-text-field
              name="name" 
              label="Contact name" 
              type="text"
              v-model="editedName"
              :rules="[v => !!v || 'Name is required']"
              required
            ></v-text-field>
            <v-text-field
              name="phone" 
              label="Phone number" 
              type="text"
              v-model="editedPhone"
            ></v-text-field>
            <v-text-field
              name="email" 
              label="Email" 
              type="email"
              v-model="editedEmail"
              :rules="emailRules"
            ></v-text-field>
            <v-text-field
              name="website" 
              label="Website" 
              type="text"
              v-model="editedWebsite"
            ></v-text-field>

            <v-divider class="edit mb-3"></v-divider>

            <!-- second part with text fields of contact street address information -->
            <div class="d-flex justify-space-between">
              <v-text-field
                class="mr-4"
                name="streetA" 
                label="Street" 
                type="text"
                v-model="editedStreetA"
              ></v-text-field>
              <v-text-field
                name="streetB" 
                label="Street+" 
                type="text"
                v-model="editedStreetB"
              ></v-text-field>
            </div>
            
            <div class="d-flex justify-space-between">
              <v-text-field
                class="mr-4"
                name="streetC" 
                label="Street+" 
                type="text"
                v-model="editedStreetC"
              ></v-text-field>
              <v-text-field
                name="streetD" 
                label="Street+" 
                type="text"
                v-model="editedStreetD"
              ></v-text-field>
            </div>

            <v-divider class="edit mb-3"></v-divider>

            <!-- third part with text fields of contact city, state, country and zipcode information -->
            <div class="d-flex justify-space-between">
              <v-text-field
                class="mr-4"
                name="city" 
                label="City" 
                type="text"
                v-model="editedCity"
              ></v-text-field>
              <v-text-field
                name="state" 
                label="State" 
                type="text"
                v-model="editedState"
              ></v-text-field>
            </div>

            <div class="d-flex justify-space-between">
              <v-text-field
                class="mr-4"
                name="country" 
                label="Country" 
                type="text"
                v-model="editedCountry"
              ></v-text-field>
              <v-text-field
                name="zipcode" 
                label="Zipcode" 
                type="text"
                v-model="editedZipcode"
              ></v-text-field>
            </div>

            <v-divider class="edit mb-3"></v-divider>

            <!-- last part with text fields of contact company information -->
            <v-text-field
              name="companyName" 
              label="Company name" 
              type="text"
              v-model="editedCompanyname"
            ></v-text-field>
            <v-text-field
              name="catchPhrase" 
              label="Catch phrase" 
              type="text"
              v-model="editedCatchPhrase"
            ></v-text-field>
            <v-text-field
              name="bs" 
              label="Bisnes" 
              type="text"
              v-model="editedBisnes"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <!-- buttons field -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="onCancel" color="accent" depressed>
            Cancel
          </v-btn>
          <v-btn @click="onSave" :disabled="!valid" color="primary" depressed>
            Save
          </v-btn>
        </v-card-actions>

      </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['contact'],
  data() {
    return {
      dialog: false,
      valid: false,
      editedName: this.contact.name,
      editedPhone: this.contact.phone,
      editedEmail: this.contact.email,
      editedWebsite: this.contact.website,
      editedStreetA: this.contact.address.streetA,
      editedStreetB: this.contact.address.streetB,
      editedStreetC: this.contact.address.streetC,
      editedStreetD: this.contact.address.streetD,
      editedCity: this.contact.address.city,
      editedState: this.contact.address.state,
      editedCountry: this.contact.address.country,
      editedZipcode: this.contact.address.zipcode,
      editedCompanyname: this.contact.company.name,
      editedCatchPhrase: this.contact.company.catchPhrase,
      editedBisnes: this.contact.company.bs,
      emailRules: [
        v => (/.+@.+\..+/.test(v) ||  v === '') || 'E-mail must be valid' // email validation rules
      ]
    }
  },
  methods: {
    // cancel contact editing and close modal
    onCancel() {
      this.editedName = this.contact.name
      this.editedPhone = this.contact.phone
      this.editedEmail = this.contact.email
      this.editedWebsite = this.contact.website
      this.editedStreetA = this.contact.address.streetA
      this.editedStreetB = this.contact.address.streetB
      this.editedStreetC = this.contact.address.streetC
      this.editedStreetD = this.contact.address.streetD
      this.editedCity = this.contact.address.city
      this.editedState = this.contact.address.state
      this.editedCountry = this.contact.address.country
      this.editedZipcode = this.contact.address.zipcode
      this.editedCompanyname = this.contact.company.name
      this.editedCatchPhrase = this.contact.company.catchPhrase
      this.editedBisnes = this.contact.company.bs
      this.dialog = false
    },
    
    // saving contact chandges in application state and close modal
    onSave() {
      this.$store.dispatch('updatedContact', {
        name: this.editedName,
        phone: this.editedPhone,
        email: this.editedEmail,
        website: this.editedWebsite,
        streetA: this.editedStreetA,
        streetB: this.editedStreetB,
        streetC: this.editedStreetC,
        streetD: this.editedStreetD,
        city: this.editedCity,
        cState: this.editedState,
        country: this.editedCountry,
        zipcode: this.editedZipcode,
        companyName: this.editedCompanyname,
        catchPhrase: this.editedCatchPhrase,
        bs: this.editedBisnes,
        id: this.contact.id
      })
      this.dialog = false
    }
  }
}
</script>
