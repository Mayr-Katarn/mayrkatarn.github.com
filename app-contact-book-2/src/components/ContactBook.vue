<template>
  <div class="container">
    <div v-for="contact of contacts" :key="contact.name" class="container__element contact">
      <div class="container__element info">
        <div class="link">
          <router-link :to="'/contact-book/contact/' + contact.id" class="link">
            <h3 @click="setEditingFalse">{{ contact.name }}</h3>
          </router-link>
        </div>
        <button class="btn delete" @click="openModal(contact.id)">X</button>
        <add-Ask-Modal v-show="deleteModal" @close="closeModal" @deleteContact="deleteContact" :modal="2"></add-Ask-Modal>
      </div>
    </div>
  </div>
</template>

<script>
import AskModal from './modal/AskModal'

export default {
  components: {
    addAskModal: AskModal
  },
  data() {
    return {
      deleteModal: false,
      contactId: ''
    }
  },
  computed: {
    // Full contact list from Vuex store
    contacts() {
      return this.$store.getters.contacts
    }
  },
  methods: {
    // Toggle off editing mode when goin to contact details
    setEditingFalse() {
      this.$store.dispatch('setEditingFalse')
    },

    // Opening of modal window and setting id of contact, whot user want to delete
    openModal(id) {
      this.contactId = id
      this.deleteModal = true
    },

    // Closing of modal window.
    closeModal() {
      this.deleteModal = false
    },

    // Finding contact by id and deleting it
    deleteContact() {
      const contact = this.$store.getters.contactById(this.contactId)
      const index = this.contacts.indexOf(contact)
      this.contacts.splice(index, 1)
      this.deleteModal = false
    }
  }
}
</script>

<style>
  .container {
    justify-content: flex-start !important;
    flex-wrap: wrap;
  }
  .info {
    margin: 0 !important;
    justify-content: space-between;
  }
  .contact {
    width: 300px;
    margin: 10px;
    background-color: #73ffbe83;
    border-radius: 5px;
    flex-direction: column;
  }
  .link {
    /* border: 1px solid black; */
    width: 90%;
    transition: .2s;
  }
   .link:hover {
    color:  rgb(0, 85, 212);
    cursor: pointer;
    transition: .2s;
   }
  h3 {
    margin-left: 10px;
  }
  .btn {
    outline: none !important;
    border-radius: 5px;
  }
</style>