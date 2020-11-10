<template>
  <div id="app">
    <div class="header">
      <b>Simon says</b>
    </div>

    <div class="container">
      <div class="game__field">
        <div class="blue-block" @click="blue"></div>
        <div class="red-block" @click="red"></div>
        <div class="yellow-block" @click="yellow"></div>
        <div class="green-block" @click="green"></div>
      </div>

      <div class="game__info">
        <h2>Round: {{ round }}</h2>

        <button
        @click="start"
        >Start</button>
        <p><b>{{ msg }}</b></p>
        <div class="input">
          <h2>Difficulty</h2>
            <input type="radio" name="gamemode" value="1500" v-model="gameSpeed">Easy <br>
            <input type="radio" name="gamemode" value="1000" v-model="gameSpeed" checked>Medium <br>
            <input type="radio" name="gamemode" value="400" v-model="gameSpeed">Hard <br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      gameStarted: false,
      playerTurn: false,
      round: '',
      stage: 0,
      gameSpeed: '1000',
      sound: {
        blue: './src/assets/1.ogg',
        red: './src/assets/2.ogg',
        yellow: './src/assets/3.ogg',
        green: './src/assets/4.ogg',
        win: './src/assets/win.mp3'
      },
      gameList: [],
      msg: 'ARE YOU READY?'
    }
  },

  methods: {
    start: function($event) {
      this.gameStarted = true
      this.round = 1
      this.stage = 0
      document.querySelector('.input').classList.add('hide')
      for (let i = 0; i < 10; i++) {
        let randomColor = Math.floor(Math.random() * 4)
        this.gameList.push(randomColor)
      }
      event.target.setAttribute('disabled', true)
      this.playRound()
    },

    playRound: function() {
      this.msg = 'WAIT'
      this.playerTurn = false
      let interval = setInterval(() => {
        if (this.stage < this.round) {
          this.playColor()
          this.stage++
        } else if (this.stage == this.round) {
          this.stage = 0
          clearInterval(interval)
          this.playerTurn = true
          this.msg = 'YOUR TURN'
        }
      }, this.gameSpeed)
    },
    
    playColor: function() {
      if (this.gameList[this.stage] == 0) {this.blue()}
      else if (this.gameList[this.stage] == 1) {this.red()}
      else if (this.gameList[this.stage] == 2) {this.yellow()}
      else if (this.gameList[this.stage] == 3) {this.green()}
    },

    check: function(color) {
      if (this.gameList[this.stage] == color) {
        this.stage++

        if (this.stage == this.round && this.round != this.gameList.length) {
          this.round++
          this.stage = 0
          this.playRound()
        } else if (this.stage == this.round && this.round == this.gameList.length) {
          this.win()
        }

      } else {
        this.gameOver()
      }
    },

    gameOver: function() {
      this.gameStarted = false
      this.playerTurn = false
      this.msg = 'GAME OVER!'
      this.gameList = []
      document.querySelector('button').removeAttribute('disabled')
      document.querySelector('.input').classList.remove('hide')
    },

    win: function() {
      this.gameStarted = false
      this.playerTurn = false
      this.msg = 'CONGRATULATIONS! YOU WIN!'
      this.gameList = []
      const sound = new Audio(this.sound.win)
      sound.play()
      document.querySelector('button').removeAttribute('disabled')
      document.querySelector('.input').classList.remove('hide')
    },

    blue: function($event) {
      const sound = new Audio(this.sound.blue)
      const cls = document.querySelector('.blue-block').classList

      cls.add('active')
      sound.play()

      setTimeout(() => {
        cls.remove('active')
      }, 200)

      if (this.playerTurn == true) {
        this.check(0)
      }
    },

    red: function($event) {
      const sound = new Audio(this.sound.red)
      const cls = document.querySelector('.red-block').classList

      cls.add('active')
      sound.play()

      setTimeout(event => {
        cls.remove('active')
      }, 200)

      if (this.playerTurn == true) {
        this.check(1)
      }
    },

    yellow: function($event) {
      const sound = new Audio(this.sound.yellow)
      const cls = document.querySelector('.yellow-block').classList

      cls.add('active')
      sound.play()

      setTimeout(event => {
        cls.remove('active')
      }, 200)

      if (this.playerTurn == true) {
        this.check(2)
      }
    },

    green: function($event) {
      const sound = new Audio(this.sound.green)
      const cls = document.querySelector('.green-block').classList

      cls.add('active')
      sound.play()

      setTimeout(event => {
        cls.remove('active')
      }, 200)

      if (this.playerTurn == true) {
        this.check(3)
      }
    }
  }
}
</script>

<style lang="sass">
  html
    height: 100%
    
  
  body
    background-image: radial-gradient(circle 700px at center, #fcf6ff, #bee1ff);
    font-family: Arial, sans-serif
    

    .header
      margin: auto
      margin-top: 60px
      text-align: center
      font-size: 30px
      width: 300px
      height: 40px
      

    .container 
      margin: auto
      margin-top: 80px
      width: 560px
      height: 300px
      justify-content: space-between
      display: flex

      .game__field 
        width: 300px
        height: 300px
        display: grid
        grid-template-columns: 50% 50%

        .blue-block,
        .red-block,
        .yellow-block, 
        .green-block 
          border: 1px solid black
          transition-duration: .1s


        .blue-block
          background-color: blue
          opacity: .4
        
        .red-block
          background-color: red
          opacity: .4

        .yellow-block
          background-color: yellow
          opacity: .4
          
        .green-block 
          background-color: green
          opacity: .4

        .active
          opacity: 1


      .game__info 
        width: 200px
        height: 300px

        .hide
          display: none!important

        button
          width: 140px
          height: 40px
          border-radius: 5px
          background: orange
</style>
