<template>
  <div class="container mt-4">
    <div class="calc bg-light">
      <div class="row">
        <button type="button" class="btn btn-dark mx-1 my-1 ">C</button>
        <button type="button" class="btn btn-dark mx-1 my-1">CE</button>
        <button type="button" class="btn btn-dark mx-1 my-1">
          <svg width="1em" height="1em" viewBox="1 1 16 16" class="bi bi-backspace-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z"/>
          </svg>
        </button>
        <button type="button" class="btn btn-dark mx-1 my-1">
          <svg width="1em" height="1em" viewBox="1 1 16 16" class="bi bi-slash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M11.354 4.646a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708 0z"/>
          </svg>
        </button>
      </div>

      <div class="row">
        <button type="button" class="btn btn-dark mx-1 my-1">7</button>
        <button type="button" class="btn btn-dark mx-1 my-1">8</button>
        <button type="button" class="btn btn-dark mx-1 my-1">9</button>
        <button type="button" class="btn btn-dark mx-1 my-1">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
      </div>

      <div class="row">
        <button type="button" class="btn btn-dark mx-1 my-1">4</button>
        <button type="button" class="btn btn-dark mx-1 my-1">5</button>
        <button type="button" class="btn btn-dark mx-1 my-1">6</button>
        <button type="button" class="btn btn-dark mx-1 my-1">-</button>
      </div>

      <div class="row">
        <button type="button" class="btn btn-dark mx-1 my-1">1</button>
        <button type="button" class="btn btn-dark mx-1 my-1">2</button>
        <button type="button" class="btn btn-dark mx-1 my-1">3</button>
        <button type="button" class="btn btn-dark mx-1 my-1">+</button>
      </div>

      <div class="row">
        <button type="button" class="btn btn-dark mx-1 my-1 col-1">0</button>
        <button type="button" class="btn btn-dark mx-1 my-1">.</button>
        <button type="button" class="btn btn-dark mx-1 my-1">=</button>
      </div>
    </div>

  </div>
</template>

<script>

export default {
data() {
  return {

  }
}

}
</script>

<style>
.calc {
  width: 200px;
}
</style>
