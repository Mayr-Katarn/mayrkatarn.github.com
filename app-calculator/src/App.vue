<template>
  <div class="container mt-4">
    <div class="calc container ml-4 p-2 bg-secondary">
      <fieldset disabled>
        <div class="form-group">
          <input type="text" id="disabledTextInput" class="form-control mt-0 p-0 bg-light text-right" v-model="display">
        </div>
      </fieldset>

      <div class="row">
        <button @click="clearAll" type="button" class="btn btn-dark btn-lg">C</button>
        <button @click="clear" type="button" class="btn btn-dark btn-lg">CE</button>
        <button @click="backspace" type="button" class="btn btn-dark btn-lg">
          <svg width="1em" height="1em" viewBox="1 1 16 16" class="bi bi-backspace-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z"/>
          </svg>
        </button>
        <button type="button" class="btn btn-dark btn-lg">
          <svg width="1em" height="1em" viewBox="1 1 16 16" class="bi bi-slash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M11.354 4.646a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708 0z"/>
          </svg>
        </button>
      </div>

      <div class="row">
        <button @click="typeNumber(numbers[7])" type="button" class="btn btn-dark btn-lg">7</button>
        <button @click="typeNumber(numbers[8])" type="button" class="btn btn-dark btn-lg">8</button>
        <button @click="typeNumber(numbers[9])" type="button" class="btn btn-dark btn-lg">9</button>
        <button type="button" class="btn btn-dark btn-lg">
          <svg width="1em" height="1em" viewBox="1 1 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
      </div>

      <div class="row">
        <button @click="typeNumber(numbers[4])" type="button" class="btn btn-dark btn-lg">4</button>
        <button @click="typeNumber(numbers[5])" type="button" class="btn btn-dark btn-lg">5</button>
        <button @click="typeNumber(numbers[6])" type="button" class="btn btn-dark btn-lg">6</button>
        <button type="button" class="btn btn-dark btn-lg">-</button>
      </div>

      <div class="row">
        <button @click="typeNumber(numbers[1])" type="button" class="btn btn-dark btn-lg">1</button>
        <button @click="typeNumber(numbers[2])" type="button" class="btn btn-dark btn-lg">2</button>
        <button @click="typeNumber(numbers[3])" type="button" class="btn btn-dark btn-lg">3</button>
        <button @click="addition" type="button" class="btn btn-dark btn-lg">+</button>
      </div>

      <div class="row">
        <button @click="typeNumber(numbers[0])" type="button" class="btn btn-dark btn-lg btn-zero">0</button>
        <button type="button" class="btn btn-dark btn-lg">.</button>
        <button @click="getResult" type="button" class="btn btn-dark btn-lg">=</button>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
      numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      display: '', // отображаемое число на дисплее\инпуте
      current: '', // текущее число для вычислений
      result: '', // результат
      safeResult: '', // сохраненный результат (нужен для корректных вычислений при наборе цифр)
      lastAction: '' // последний использованный оператор
    }
  },
  methods: {
    typeNumber(number) {
      if (this.display.length < 20) {
        this.display += number
        if (this.lastAction === '+') {
          this.current = this.display
          this.result = +this.safeResult + +this.current
        }
      }
    },
    getResult() {
      if (this.result) {
        this.display = this.result
      }
    },
    addition() {
      if (this.display) {
        this.current = this.display
        this.display = ''
        this.lastAction = '+'
        if (!this.result) {
          this.safeResult = this.result = this.current
        } else {
          this.safeResult = this.result
        }
      }
    },
    backspace() {
      if (this.display) {
        this.display = this.display.toString()
        this.display = this.display.slice(0, -1)
        if (this.current) {
          this.current = this.display
        }
      }
    },
    clear() {
      if (this.display) {
        this.display = ''
        this.current = ''
      }
    },
    clearAll() {
      this.display = ''
      this.current = ''
      this.result = ''
      this.safeResult = ''
      this.lastAction = ''
    }
  }
}
</script>

<style>
.calc {
  width: 232px !important;
  border-radius: 4px;
}
.row {
  margin-left: 0 !important;
}
.btn {
  margin: 2px;
  width: 50px;
  height: 50px;
}
.btn-zero {
  margin: 2px;
  width: 104px;
  height: 50px;
}
.form-control {
  font-size: 18px;
  height: 30px;
}
</style>
