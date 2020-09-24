<template>
  <div id="app" @keyup="checkForms()" @mouseup="checkForms(), checkInput()">
    <span class="header"><big>Заполните форму</big><br><small><b>*</b>-обязательные поля</small></span>
    <div class="container">
      <div class="box">
        <div class="box__inner">
            <label for="surname">Фамилия<b>*</b></label>

            <input 
              type="text" 
              class="surname" 
              :class="{'error': $v.surname.$invalid && $v.surname.$dirty, 'valid': !$v.surname.$invalid}"
              @mouseenter="onHover"
              @mouseleave="leaveHover"
              @focus="focused"
              @blur="$v.surname.$touch(), unFocus()"
              v-model.trim="surname" 
              placeholder="Иванов"
            >

            <p 
              class="warn" 
              :class="{'hide': $v.surname.alpha}"
              >Должно содержать только буквы!
            </p>
    
        </div>

        <div class="box__inner">
            <label for="name">Имя<b>*</b></label>

            <input 
              type="text" 
              class="name" 
              :class="{'error': $v.name.$invalid && $v.name.$dirty, 'valid': !$v.name.$invalid}"
              @mouseenter="onHover"
              @mouseleave="leaveHover"
              @focus="focused"
              @blur="$v.name.$touch(), unFocus()"
              v-model.trim="name" 
              placeholder="Иван"
            >

            <p 
              class="warn" 
              :class="{'hide': $v.name.alpha}"
              >Должно содержать только буквы!
            </p>    
        </div>

        <div class="box__inner">
            <label for="fathername">Отчество<b>*</b></label>

            <input 
              type="text" 
              class="fathername"
              :class="{'error': $v.fathername.$invalid && $v.fathername.$dirty, 'valid': !$v.fathername.$invalid}"
              @mouseenter="onHover"
              @mouseleave="leaveHover"
              @focus="focused"
              @blur="$v.fathername.$touch(), unFocus()"
              v-model.trim="fathername" 
              placeholder="Иванович"
            >

            <p 
              class="warn"
              :class="{'hide': $v.fathername.alpha}"
              >Должно содержать только буквы!
            </p>
        </div>
      </div>

      <div class="box">
        <div class="box__inner">
            <label for="birthday">Дата рождения<b>*</b></label>

            <input 
              type="date" 
              name="birthday" 
              class="birthday"
              :class="{'error': $v.birthday.$dirty && !birthday.isCorrect , 'valid': birthday.date != '' && !$v.birthday.$invalid && birthday.isCorrect }"
              @mouseenter="onHover"
              @mouseleave="leaveHover"
              @mouseup="checkForms()"
              @focus="focused"
              @blur="$v.birthday.$touch(), unFocus(), checkDate(birthday)"
              v-model="birthday.date"
            >

            <p 
              class="warn"
              :class="{'hide': birthday.isCorrect}"
              >Неверная дата
            </p>
        </div>

        <div class="box__inner">
            <label for="tel">Номер телефона<b>*</b></label>
            <input 
              type="tel" 
              name="tel" 
              class="tel"
              :class="{'error': $v.tel.$dirty && $v.tel.$invalid, 'valid': !$v.tel.$invalid }"
              @mouseenter="onHover"
              @mouseleave="leaveHover"
              @focus="focused"
              @keyup="replaceAlpha"
              @blur="$v.tel.$touch(), unFocus()"
              v-model.trim="tel"
              placeholder="7ххххххххх"
            >

            <p 
              class="warn"
              :class="{'hide': $v.tel.minLength && $v.tel.maxLength}"
              >Введите 11-значный номер
            </p>
        </div>

        <div class="box__inner">
            <label for="sex">Пол</label>
            <select 
              name="sex" 
              class="sex"
              :class="{'valid': sex != ''}"
              v-model="sex"
              @mouseenter="onHover"
              @mouseleave="leaveHover"
              @focus="focused"
              @blur="unFocus()"
            >

              <option disabled value="">Выберите вариант</option>
              <option value="m">Мужской</option>
              <option value="w">Женский</option>
            </select>
        </div>
      </div>

    </div>

    <div class="container2">
      <div class="box">
        <div class="box__inner">
          <label for="pGroup">Группа пациентов<b>*</b></label>
          <select 
            name="pGroup" 
            multiple
            @mouseenter="onHover"
            @mouseleave="leaveHover"
            @focus="focused"
            @blur="unFocus()"
            v-model="pGroup"
          >
            <option disabled value="">Выберите вариант</option>
            <option value="VIP">VIP</option>
            <option value="Проблемные">Проблемные</option>
            <option value="ОМС">ОМС</option>
          </select>
          <input 
          disabled 
          :class="{'valid': pGroup != ''}"
          type="text" 
          v-model="pGroup"
          >
        </div>
      </div>
      
      <div class="box">
        <div class="box__inner2">
          <label for="doctor">Лечащий врач</label>
          <select 
            name="doctor"
            :class="{'valid': doctor != ''}"
            @mouseenter="onHover"
            @mouseleave="leaveHover"
            @focus="focused"
            @blur="unFocus()"
            v-model="doctor"
          >
            <option value="">Укажите врача</option>
            <option value="Ivanov">Иванов</option>
            <option value="Zaharov">Захаров</option>
            <option value="Chernyshova">Чернышева</option>
          </select>
        </div>


        <div class="box__inner2">
          <label for="sms">Не отправлять SMS</label>
          <input 
            type="checkbox"
            name="sms"
            @mouseenter="onHover"
            @mouseleave="leaveHover"
            @focus="focused"
            @blur="unFocus()"
            v-model="sendSms"
          >
        </div>
          
      </div>

    </div>

    <div class="container3">
      <div class="box">
        <div class="box__inner">
          <label for="index">Индекс</label>
          <input 
            type="text"
            name="index"
            class="index"
            :class="{'error': isNaN(index), 'valid': !isNaN(index) && index != ''}"
            @mouseenter="onHover"
            @mouseleave="leaveHover"
            @keyup="replaceAlpha"
            @focus="focused"
            @blur="unFocus()"
            v-model="index"
          >
        </div>
        <div class="box__inner">
          <label for="country">Страна</label>
          <input 
            type="text"
            name="country"
            :class="{'valid': country != ''}"
            @mouseenter="onHover"
            @mouseleave="leaveHover"
            @focus="focused"
            @blur="unFocus()"
            v-model="country"
          >
        </div>
        <div class="box__inner">
          <label for="region">Область</label>
          <input 
            type="text"
            name="region"
            :class="{'valid': region != ''}"
            @mouseenter="onHover"
            @mouseleave="leaveHover"
            @focus="focused"
            @blur="unFocus()"
            v-model="region"
          >
        </div>
        <div class="box__inner">
          <label for="city">Город<b>*</b></label>
          <input 
            type="text" 
            class="name" 
            :class="{'error': $v.city.$invalid && $v.city.$dirty, 'valid': !$v.city.$invalid}"
            @mouseenter="onHover"
            @mouseleave="leaveHover"
            @focus="focused"
            @blur="$v.city.$touch(), unFocus()"
            v-model.trim="city" 
          >

          <p 
            class="warn" 
            :class="{'hide': $v.city.alpha}"
            >Должно содержать только буквы!
          </p>
        </div>
        <div class="box__inner">
          <label for="street">Улица</label>
          <input 
            type="text"
            name="street"
            :class="{'valid': street != ''}"
            @mouseenter="onHover"
            @mouseleave="leaveHover"
            @focus="focused"
            @blur="unFocus()"
            v-model="street"
          >
        </div>
        <div class="box__inner">
           <label for="building">Дом</label>
          <input 
            type="text"
            name="building"
            :class="{'valid': building != ''}"
            @mouseenter="onHover"
            @mouseleave="leaveHover"
            @focus="focused"
            @blur="unFocus()"
            v-model="building"
          >
        </div>
      </div>

      <div class="box">
        <div class="box__inner">
          <label for="document">Тип документа<b>*</b></label>
          <select 
            name="document"
            :class="{'valid': document != ''}"
            @mouseenter="onHover"
            @mouseleave="leaveHover"
            @focus="focused"
            @blur="$v.document.$touch(), unFocus()"
            v-model="document"
          >
            <option disabled value="">Выберите вариант</option>
            <option value="Passport">Паспорт</option>
            <option value="birthdayDoc">Свидетельство о рождении</option>
            <option value="driverLicence">Водительское удостоверение</option>
          </select>
        </div>

        <div class="box__inner">
          <label for="docSerial">Серия</label>
          <input 
            type="text"
            name="docSerial"
            class="docSerial"
            :class="{'error': isNaN(docSerial), 'valid': !isNaN(docSerial) && docSerial != ''}"
            @mouseenter="onHover"
            @mouseleave="leaveHover"
            @focus="focused"
            @blur="unFocus()"
            @keyup="replaceAlpha"
            v-model="docSerial"
          >
        </div>
        
        <div class="box__inner">
          <label for="docNumber">Номер</label>
          <input 
            type="text"
            name="docNumber"
            class="docNumber"
            :class="{'error': isNaN(docNumber), 'valid': !isNaN(docNumber) && docNumber != ''}"
            @mouseenter="onHover"
            @mouseleave="leaveHover"
            @focus="focused"
            @blur="unFocus()"
            @keyup="replaceAlpha"
            v-model="docNumber"
          >
        </div>

        <div class="box__inner">
          <label for="docOrganization">Кем выдан</label>
          <input 
            type="text"
            name="docOrganization"
            :class="{'valid': docOrganization != ''}"
            @mouseenter="onHover"
            @mouseleave="leaveHover"
            @focus="focused"
            @blur="unFocus()"
            v-model="docOrganization"
          >
        </div>

        <div class="box__inner">
          <label for="docDate">Дата выдачи<b>*</b></label>
          <input 
            type="date" 
            name="docDate" 
            class="docDate"
            :class="{'error': $v.docDate.$dirty && !docDate.isCorrect , 'valid': docDate.date != '' && !$v.docDate.$invalid && docDate.isCorrect }"
            @mouseenter="onHover"
            @mouseleave="leaveHover"
            @mouseup="checkForms()"
            @focus="focused"
            @blur="$v.docDate.$touch(), unFocus(), checkDate(docDate)"
            @reset ="checkForms()"
            v-model="docDate.date"
          >
          <p 
            class="warn"
            :class="{'hide': docDate.isCorrect}"
            >Неверная дата
          </p>
        </div>
        
      </div>
    </div>

    <div class="buttonbox">
    <button class="reg" @mousedown="checkForms()" @click="regestration()" :disabled="!isEnabled" :title="btnTitle"><big>РЕГИСТРАЦИЯ</big></button>
    <div class="buttonerror hide">Ошибка регистрации: Проверьте правильность полей</div>
    <div>

    </div>
    </div>

    <div class="regOk hide">
      <div>ВЫ УСПЕШНО ЗАРЕГЕСТРИРОВАНЫ</div>
      <button>OK</button>
    </div>

  </div>
</template>

<script>
import { required, alpha, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  name: 'app',
  data () {
    return {
      surname: '',
      name: '',
      fathername: '',
      tel: '',
      birthday: {
        date: '',
        isCorrect: true
      },
      dateIsCorrect: true,
      sex: '',
      pGroup: [],
      doctor:'',
      sendSms: false,
      index: '',
      country: '',
      region: '',
      city: '',
      street: '',
      building: '',
      document: '',
      docSerial: '',
      docNumber: '',
      docOrganization: '',
      docDate: {
        date: '',
        isCorrect: true
      },
      isEnabled: false,
      btnTitle: 'Не все обязательные поля заполенны или имеется ошибка'
    }
  },
  validations: {
    surname: {required, alpha},
    name: {required, alpha},
    fathername: {required, alpha},
    tel: {required, minLength: minLength(11), maxLength: maxLength(11)},
    birthday: {required},
    pGroup: {required},
    city: {required, alpha},
    document: {required},
    docDate: {required}
  },
  methods: {
    checkForms: function($event) {
      if (!this.$v.$invalid && this.birthday.isCorrect && this.docDate.isCorrect && this.birthday.date != '' && this.docDate.date != '') {
        this.isEnabled = true
        this.btnTitle = 'Зарегестрироваться'
      } else {
        this.isEnabled = false
        this.btnTitle = 'Не все обязательные поля заполенны или имеется ошибка'
      }
    },

    checkInput: function($event) {
      document.querySelector('.index').value = this.index
      document.querySelector('.docSerial').value = this.docSerial
      document.querySelector('.docNumber').value = this.docNumber
    },

    regestration: function($event) {
      const hide = (elementClass) => {
        document.querySelector(elementClass).classList.add('hide')
      }
      
      if (isNaN(this.index) || isNaN(this.docSerial) || isNaN(this.docNumber)) {
        document.querySelector('.buttonerror').classList.remove('hide')
      } else {
        hide('.buttonerror')
        hide('.buttonbox')
        hide('.container')
        hide('.container2')
        hide('.container3')
        hide('.header')
        document.querySelector('.regOk').classList.remove('hide')

      }
    },

    onHover: function($event) {
      event.target.classList.add('active')
    },

    leaveHover: function($event) {
      event.target.classList.remove('active')
    },

    focused: function($event) {
      event.target.classList.add('focused')
    },

    unFocus: function($event) {
      event.target.classList.remove('focused')
    },
    
    replaceAlpha: function($event) {
      event.target.value = event.target.value.replace(/[^\d+]/g,'')
    },

    checkDate: function(element) {
      if (element.date != '') {
        let year = element.date.slice(0, 4)
        let month = element.date.slice(5, 7)
        let day = element.date.slice(8)

        if (year > new Date().getFullYear() || year < 1900 ){
          element.isCorrect = false
        } else if (year == new Date().getFullYear() && month > new Date().getMonth() + 1) {
          element.isCorrect = false
        } else if (year == new Date().getFullYear() && month == new Date().getMonth() + 1 && day > new Date().getDate()) {
          element.isCorrect = false
        } else {
          element.isCorrect = true
        }

      } else {
        element.isCorrect = false
      }
    }

  }
}
</script>

<style lang="sass">
  html
   height: 100%

  body
    margin: 0
    background: radial-gradient(circle 700px at center, #fcf6ff, #bee1ff)
    font-family: Arial, sans-serif
    font-weight: 700

    b
      color: red
      font-size: 17px

    .header
      width: 100% 
      height: 40px
      background-color: rgb(250, 253, 246)
      position: fixed
      margin-bottom: 30px
      text-align: center
      border-bottom: 1px solid black
      top: 0
      left: 0

    .container 
      margin: auto
      margin-top: 58px
      width: 560px
      height: 240px
      border: 3px solid rgb(89, 100, 255)
      border-radius: 5px
      display: flex
      justify-content: space-between
      background-color: rgb(250, 253, 246)
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.6)

      .box 
        width: 45%
        height: 99%

        .box__inner 
          width: 99%
          height: 30%
          margin-top: 6px

          .error
            border: 1px solid rgb(255, 0, 0)
            box-shadow: 0 0 2px rgba(255, 0, 0, 0.6)

          .valid
            border: 1px solid green
            box-shadow: 0 0 3px rgba(0, 255, 0, 0.6)

          .active
            border: 1px solid blue
            box-shadow: 0 0 4px rgba(50, 0, 255, 0.6)
            
          .focused
            border: 1px solid blue
            box-shadow: 1px 1px 6px rgba(50, 0, 255, 0.6)

          
          input, .sex, label, .warn 
            margin-left: 18px
            margin-bottom: 2px
            display: block
            padding-left: 4px

          input 
            width: 200px
            height: 22px
            border: 1px solid gray
            border-radius: 5px
            font-size: 16px
        

          .warn
            margin-top: 0
            font-size: 12px
            color: red

          select
            width: 208px
            height: 26px
            border: 1px solid gray
            border-radius: 5px
            font-size: 16px

          .birthday
            height: 24px
          
          .hide
            display: none!important

    .container2
      margin: auto
      margin-top: 20px
      width: 560px
      height: 180px
      border: 3px solid rgb(89, 100, 255)
      border-radius: 5px
      display: flex
      justify-content: space-between
      background-color: rgb(250, 253, 246)
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.6)

      .box
        width: 45%
        height: 99%

        .error
          border: 1px solid rgb(255, 0, 0)
          box-shadow: 0 0 2px rgba(255, 0, 0, 0.6)

        .valid
          border: 1px solid green
          box-shadow: 0 0 3px rgba(0, 255, 0, 0.6)

        .active
          border: 1px solid blue
          box-shadow: 0 0 4px rgba(50, 0, 255, 0.6)
          
        .focused
          border: 1px solid blue
          box-shadow: 1px 1px 8px rgba(50, 0, 255, 0.8)

        label, select, input
          margin-left: 18px
          margin-bottom: 8px
          display: block
          padding-left: 4px

        select
          width: 208px
          border: 1px solid gray
          border-radius: 5px

        .box__inner 
          width: 99%
          height: 90%
          margin-top: 10px

          input
            width: 200px
            height: 22px
            margin-top: 12px
            border: 1px solid gray
            border-radius: 5px
            font-size: 16px

        .box__inner2 
          width: 99%
          height: 40%
          margin-top: 10px

          select
            height: 26px
            font-size: 16px
        
        .box__inner2:last-child
          margin-top: 40px
          display: flex

          label
            margin-top: 4px

          input
            height: 20px
            width: 20px

    .container3
      margin: auto
      margin-top: 20px
      width: 560px
      height: 440px
      border: 3px solid rgb(89, 100, 255)
      border-radius: 5px
      display: flex
      justify-content: space-between
      background-color: rgb(250, 253, 246)
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.6)

      .box
        width: 45%
        height: 99%

        
        .box__inner 
          width: 99%
          height: 15%
          margin-top: 6px

          .error 
            border: 1px solid rgb(255, 0, 0)
            box-shadow: 0 0 2px rgba(255, 0, 0, 0.6)

          .valid
            border: 1px solid green
            box-shadow: 0 0 3px rgba(0, 255, 0, 0.6)

          .active
            border: 1px solid blue
            box-shadow: 0 0 4px rgba(50, 0, 255, 0.6)
            
          .focused
            border: 1px solid blue
            box-shadow: 1px 1px 8px rgba(50, 0, 255, 0.8)

          input, label, select, .warn
            margin-left: 18px
            margin-bottom: 2px
            display: block
            padding-left: 4px

          select
            width: 208px
            height: 26px
            border: 1px solid gray
            border-radius: 5px
            font-size: 16px

          input 
            width: 200px
            height: 22px
            border: 1px solid gray
            border-radius: 5px
            font-size: 16px

          .warn
            margin-top: 0
            font-size: 12px
            color: red

          .hide
            display: none!important

    .buttonbox
      width: 240px
      height: 100px
      margin: auto

      .reg
        margin: auto
        margin-top: 16px
        display: flex
        width: 220px
        height: 34px
        background: linear-gradient(to top, rgb(255, 255, 255), lightgreen)
        border-radius: 10px
        padding-left: 20px
        font-size: 20px
        cursor: pointer

      .buttonerror
        margin: auto
        margin-top: 2px
        width: 240px
        height: 20px
        color: red
        font-size: 15px

    .regOk
      margin: auto
      margin-top: 20px
      width: 240px
      height: 100px
      border: 3px solid green
      border-radius: 5px
      display: block
      justify-content: space-between
      background-color: rgb(250, 253, 246)
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.6) 

      div
        margin: auto
        margin-top: 10px
        width: 200px
        height: 50px
        text-align: center
      button
        margin: auto
        display: flex
        width: 46px
        height: 30px
        background: linear-gradient(to top, rgb(255, 255, 255), lightgreen)
        border-radius: 10px
        font-size: 20px
        cursor: pointer

    .hide
      display: none!important


    @media screen and (max-width: 1024px)
      .header
        height: 36px

        big 
          font-size: 15px

        small
          font-size: 11px

        b
          font-size: 11px

      .container 
        margin: auto
        margin-top: 44px
        width: 240px
        height: 440px
        border: 3px solid rgb(89, 100, 255)
        border-radius: 5px
        display: block
    
        .box 
          width: 99%
          height: 47%

          label
            font-size: 15px

          .box__inner
            margin-top: 10px

            .warn
              font-size: 11px

        
        .box:last-child 
          margin-top: 10px

      .container2 
        margin: auto
        margin-top: 10px
        width: 240px
        height: 330px
        border: 3px solid rgb(89, 100, 255)
        border-radius: 5px
        display: block

        .box 
          width: 99%
          height: 47%

          label
            font-size: 15px

      
          .box__inner2
            margin-top: 20px
            height: 40%

            .warn
              font-size: 11px


          .box__inner2:last-child
            height: 20%
            margin-top: 40px

      .container3 
        margin: auto
        margin-top: 10px
        width: 240px
        height: 740px
        border: 3px solid rgb(89, 100, 255)
        border-radius: 5px
        display: block

        .box 
          width: 99%
          height: 43%

          label
            font-size: 15px


          .box__inner
            margin-top: 18px

            .warn
              font-size: 11px

        .box:last-child 
          margin-top: 70px

</style>
