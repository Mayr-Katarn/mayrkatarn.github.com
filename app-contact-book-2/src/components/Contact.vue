<template>
  <div class="container">
    <div v-if="contact !== undefined" class="container__box">

      <div class="container__element">
        <div class="container__col name">
          <label v-if="edit">Name:</label>
        </div>
        <div class="container__col">
          <input v-if="edit" type="text" v-model="contact.name">
          <h2 v-else>{{ contact.name }}</h2>
        </div>
      </div>
      <hr>

      <div class="container__element" v-for="field of contact.fields" :key="field.length">
        <div class="container__col name">
          <label v-if="!edit">{{ field.type }}:</label>
          <select v-else v-model="field.type">
            <option value="Phone">Phone</option>
            <option value="E-mail">E-mail</option>
            <option value="Website">Website</option>
          </select>
        </div>

        <div class="container__col">
          <input v-if="edit" type="text" v-model="field.value">
          <h3 v-else>{{ field.value }}</h3>
        </div>

        <div class="container__col extra">
          <button class="btn edit undo" v-if="edit" @click="undo(contact.fields.indexOf(field))" title="Cancel this field changes">Undo</button>
          <button class="btn delete" v-if="edit" @click="openModal(0, contact.fields.indexOf(field))" title="Delete this field">X</button>
          <add-Ask-Modal v-show="deleteModal" @close="closeModal(0)" @deleteField="deleteField" :modal="0"></add-Ask-Modal>
        </div>
      </div>

      <div class="container__element">
        <div class="container__btn">
          <button class="btn save" @click="newField" v-if="edit">New field</button>
          <button class="btn save" @mousedown="editMode()" v-if="edit" :disabled="emptyFields">Save</button>
          <button class="btn edit" @click="editMode" v-if="!edit">Edit</button>

          <button class="btn back" @click="openModal(1)" v-if="edit">Cancel</button>
          <add-Ask-Modal v-show="cancelModal" @close="closeModal(1)" @cancel="cancel" :modal="1"></add-Ask-Modal>

          <router-link to="/contact-book/"><button class="btn back" v-if="!edit">Back</button></router-link>
        </div>
      </div>
    </div>
    <div v-else class="container__box">
      <h1>Contact not found</h1>
      <router-link to="/contact-book/"><button class="btn book" v-if="!edit">Back to contact book</button></router-link>
    </div>
  </div>
</template>

<script>
import AskModal from './modal/AskModal'

export default {
  props:['id'],
  components: {
    addAskModal: AskModal
  },
  data() {
    return {
      legacy: {
        name: '',
        fields: []
      },
      cancelModal: false,
      deleteModal: false,
      fieldIndex: ''
    }
  },
  methods: {
    // Add new field for contact
    newField() {
      this.contact.fields.push({})
      this.legacy.fields.push({type: '', value: ''})
    },

    // Switching editing mode with setting information about contact in legacy.
    // Legacy keeping information about contact without changing and return it when editing canceled.
    editMode() {
      this.$store.dispatch('editing')
      this.legacy = JSON.parse(JSON.stringify(this.contact))
      if (this.isNewContact) {
        this.$store.dispatch('setIsNewContact', false)
      }
    },

    // Delete contact information field.
    deleteField() {
      this.contact.fields.splice(this.fieldIndex, 1)
      this.deleteModal = false
    },

    // Return field changing from legacy.
    undo(index) {
      this.contact.fields[index].type = this.legacy.fields[index].type
      this.contact.fields[index].value = this.legacy.fields[index].value
    },

    // Cancel a changing ang closing editing mode. If it was a new conact, it will be deleted and app return to main page.
    cancel() {
      if (this.isNewContact){
        const index = this.$store.getters.contacts.indexOf(this.contact)
        this.contacts.splice(index, 1)
        this.$router.push('/contact-book/')
        this.$store.dispatch('setIsNewContact', false)
        this.$store.dispatch('returnLastId')
      } else {
        this.$store.dispatch('editing')
        this.$store.dispatch('setContact', {
          name: this.legacy.name,
          fields: this.legacy.fields,
          id: this.id
        })
      }
      this.cancelModal = false
    },

    // Opening of modal window.
    // Modal window structure depends from receved value
    // 0 - Asking about deleting contact information field
    // 1 - Asking about canceling a changes
    openModal(modal, field = null) {
      if (modal === 0) {
        this.fieldIndex = field
        this.deleteModal = true
      }
      if (modal === 1) {
        this.cancelModal = true
      }
    },

    // Closing of modal window.
    closeModal(modal) {
      if (modal === 0) {
        this.deleteModal = false
      }
      if (modal === 1) {
        this.cancelModal = false
      }
    }
  },
  computed: {
    // Gathering information from Vuex store
    // Information about contact
    contact() {
      return this.$store.getters.contactById(this.id)
    },
    
    // Full contact list. It needs when user cancel creating of new contact, in this case it will be deleted
    contacts() {
      return this.$store.getters.contacts
    },

    // Find out if this is a new contact
    edit() {
      return this.$store.getters.editing
    },

    // Information about creating a new contact
    isNewContact() {
      return this.$store.getters.isNewContact
    },

    // Cheking empty contact fields in editing mode. If there have empty fields, then 'Save' button will be disabled.
    emptyFields() {
      const isEmpty = this.contact.fields.some(el => {
        return el.type === undefined || el.value === undefined || el.value === ''
      })
      const hasName = this.contact.name === ''
      return hasName || isEmpty
    }
  }
}
</script>

<style>
  .container {
    display: flex;
    margin-top: 100px;
    margin-left: 5%;
    width: 100%;
  }
  .container__box {
    border-radius: 5px;
    background-color: #73ffbe83
  }
  .container__element {
    display: flex;
  }
  .container__element:first-child {
    margin-top: 10px;
  }
  .container__col {
    display: inherit;
    align-items: center;
    width: 260px;
    height: 30px;
    margin-right: 14px;
  }
  h1 {
    margin-left: 20px;
    margin-right: 20px;
  }
  h2 {
    color: rgb(2, 25, 233)
  }
  hr {
    border-color: rgb(42, 109, 253);
  }
  .name {
    margin-left: 3%;
    width: 100px !important;
    font-size: large;
  }
  .extra {
    width: 100px;
  }
  .container__btn {
    display: flex;
    margin-left: 3%;
    margin-right: 3%;
    justify-content: flex-end;
    width: 414px;
  }
  .btn {
    width: 80px;
    height: 24px;
    margin: 6px;
    font-weight: bold;
    border: none;
    background-color: rgba(67, 224, 88, 0.719);
    transition: .25s;
  }
  .save:hover {
    background-color: rgba(14, 170, 9, 0.719);
    transition: .25s;
  }
  .save:hover:disabled {
    background-color: rgba(67, 224, 88, 0.719);
    transition: .25s;
  }
  .back {
    background-color: rgba(53, 147, 235, 0.55);
    transition: .25s;
  }
  .book {
    background-color: rgba(53, 147, 235, 0.55);
    width: 300px;
    height: 30px;
  }
  .back:hover, .book:hover {
    background-color: rgb(71, 135, 231);
    transition: .25s;
  }
  .edit {
    background-color: #ffd573c2;
    transition: .25s;
  }
  .edit:hover {
    background-color: rgb(230, 177, 4);
    transition: .25s;
  }
  .undo {
    width: 46px;
  }
  .delete {
    width: 25px;
    background-color: #ff787383;
    transition: .25s;
  }
  .delete:hover {
    background-color: rgba(255, 42, 27, 0.726);
    transition: .25s;
  }
  input, select {
    width: 100%;
    height: 20px;
    font-size: large;
  }
  input:disabled {
    color: black;
    background-color: #73ffbe83;
    border: none;
  }
  select {
    width: 100%;
    height: 24px;
  }
</style>