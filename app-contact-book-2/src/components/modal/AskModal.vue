<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              {{ message[modal] }}
              <button class="modal-btn no" @click="no">
                No
              </button>
              <button class="modal-btn yes" @click="yes(modal)">
                Yes
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['modal'],
  data() {
    return {
      message: [
        'Do you realy want to delete this field?',
        'Do you realy want to cancel contact changes?',
        'Do you realy want to delete this contact?'
      ]
    }
  },
  methods: {
    // Closing modal window if user answered 'No'
    no() {
      this.$emit('close')
    },

    // If user answered 'Yes', then running a method depending on the receved value
    // 0 - Deleting contact information field
    // 1 - Canceling a changes
    // 2 - Deleting a contact
    yes(modal){
      if (modal === 0) {
        this.$emit('deleteField')
      }
      if (modal === 1) {
        this.$emit('cancel')
      }
      if (modal === 2) {
        this.$emit('deleteContact')
      }
    }
  }
}
</script>

<style>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(71, 71, 71, 0.2);
    display: table;
    transition: opacity 0.3s ease;
  }
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  .modal-container {
    width: 300px;
    height: 50px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }
  .modal-body {
    margin: 20px 0;
  }
  .modal-enter {
    opacity: 0;
  }
  .modal-leave-active {
    opacity: 0;
  }
  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  .modal-btn {
    float: right;
    width: 80px;
    height: 24px;
    margin: 14px 6px 0 6px;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    transition: .25s;
  }
  .yes {
    background-color: #ff787383;
  }
  .yes:hover {
    background-color: rgba(255, 42, 27, 0.726);
    transition: .25s;
  }
  .no {
    background-color: rgba(53, 147, 235, 0.55);
    transition: .25s;
  }
  .no:hover {
    background-color: rgb(71, 135, 231);
    transition: .25s;
  }
</style>