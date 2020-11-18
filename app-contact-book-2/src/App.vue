<template>
  <div id="app">
    <div class="header">
      <div class="header__container">

        <div class="header__btn">
          <router-link :to="'/contact/' + lastId"><button class="new" @click="newContact" v-show="!isNewContact">+ New contact</button></router-link>
        </div>

        <div class="header__title">
          <h1>CONTACT BOOK</h1>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    // Gathering information from Vuex store.
    // Information about last contact id. New contact get this is. This is necessary to prevent duplicate keys in contact list.
    lastId() {
      return this.$store.getters.lastId
    },

    // Information about creating a new contact. This necessary to hide 'New contact' button if user allready creating a new contact.
    isNewContact() {
      return this.$store.getters.isNewContact
    }
  },
  methods: {
    // Creating a new contact in Vuex store.
    newContact() {
      this.$store.dispatch('newContact')
    }
  },  
}
</script>

<style>
  body {
    font-family: Arial, Helvetica, sans-serif;
  }
  .link {
    text-decoration: none;
    color: inherit;
  }
  .header {
    position: fixed;
    width: 100%;
    height: 70px;
    left: 0;
    top: 0;
    background-color: rgb(42, 109, 253);
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.5);
  }
  .header__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .header__title {
    margin-right: 8%;
  }
  .header__btn {
    margin-left: 7%;
  }
  h1 {
    color: white;
    pointer-events: none;
  }
  .new {
    width: 140px;
    height: 34px;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    border: none;
    border-radius: 5px;
    outline: none;
    background-color: #73ffbe83;
    transition: .25s;
  }
  .new:hover {
    background-color: rgb(0, 100, 165);
    transition: .25s;
  }
  .new:hover:disabled {
    background-color: #73ffbe83;
  }
</style>