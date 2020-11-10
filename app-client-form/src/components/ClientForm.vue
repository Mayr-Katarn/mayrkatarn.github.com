<template>
  <div>
    <!-- Форма клиента -->
    <div class="block" v-if="!regestrated">
      <h2>ФОРМА КЛИЕНТА</h2>
      <div class="block__row">

        <!-- Основная информация -->
        <div class="block__element">
          <h3>Основная информация</h3>
          <hr>

          <!-- Фамилия -->
          <div class="block__content">
            <label for="surname">Фамилия<b>*</b></label>
            <input
              id="surname"
              type="text"
              v-model="client.surname"
              :class="{'error': invalid($v.client.surname)}"
              @blur="$v.client.surname.$touch()"
            >
            <span v-if="invalidRequired($v.client.surname)">{{error.required}}</span>
            <span v-else-if="invalidAlpha($v.client.surname)">{{error.alpha}}</span>
          </div>

          <!-- Имя -->
          <div class="block__content">
            <label for="name">Имя<b>*</b></label>
            <input
              id="name"
              type="text"
              v-model="client.name"
              :class="{'error': invalid($v.client.name)}"
              @blur="$v.client.name.$touch()"
            >
            <span v-if="invalidRequired($v.client.name)">{{error.required}}</span>
            <span v-else-if="invalidAlpha($v.client.name)">{{error.alpha}}</span>
          </div>
          
          <!-- Отчество -->
          <div class="block__content">
            <label for="fathername">Отчество</label>
            <input
              id="fathername"
              type="text"
              v-model="client.fathername"
            >
          </div>

          <!-- Дата рождения -->
          <div class="block__content">
            <label for="birthday">Дата рождения<b>*</b></label>
            <input
              id="birthday"
              type="date"
              v-model="client.birthday"
              :class="{'error': invalid($v.client.birthday)}"
              @blur="$v.client.birthday.$touch()"
            >
            <span v-if="invalidRequired($v.client.birthday)">{{error.required}}</span>
            <span v-else-if="invalidDate($v.client.birthday)">{{error.date}}</span>
          </div>

          <!-- Телефон -->
          <div class="block__content">
            <label for="tel">Номер телефона<b>*</b></label>
            <input
              id="tel"
              type="text"
              placeholder="7ххххххххх"
              v-model.trim="client.tel"
              :class="{'error': invalid($v.client.tel)}"
              @blur="$v.client.tel.$touch()"
            >
            <span v-if="invalidRequired($v.client.tel)">{{error.required}}</span>
            <span v-else-if="invalidNum($v.client.tel)">{{error.num}}</span>
            <span v-else-if="invalidSeven($v.client.tel)">{{error.seven}}</span>
            <span v-else-if="invalidLength($v.client.tel)">{{error.length}}</span>
          </div>

          <!-- Пол -->
          <div class="block__content">
            <label for="sex">Пол</label>
            <select
              id="sex"
              v-model="client.sex"
            >
              <option disabled value="">Выберите вариант</option>
              <option value="m">Мужской</option>
              <option value="w">Женский</option>
            </select>
          </div>

          <!-- Группа пациентов -->
          <div class="block__content block__multiselect">
            <label>Группа пациентов<b>*</b></label>
            <div class="multiselect" :class="{'error': invalid($v.client.patientGroup)}">
              <label class="multilabel" @click="$v.client.patientGroup.$touch()" for="vip"><input type="checkbox" id="vip" value="vip" v-model="client.patientGroup">VIP</label>
              <label class="multilabel" @click="$v.client.patientGroup.$touch()" for="problematic"><input type="checkbox" id="problematic" value="problematic" v-model="client.patientGroup">Проблемные</label>
              <label class="multilabel" @click="$v.client.patientGroup.$touch()" for="oms"><input type="checkbox" id="oms" value="oms" v-model="client.patientGroup">ОМС</label>
            </div>
            <span v-if="invalidRequired($v.client.patientGroup)">{{error.required}}</span>
          </div>

          <!-- Лечащий врач -->
          <div class="block__content">
            <label for="doctor">Лечащий врач</label>
            <select
              id="doctor"
              v-model="client.doctor"
            >
              <option disabled value="">Выберите вариант</option>
              <option value="ivanov">Иванов</option>
              <option value="zaharov">Захаров</option>
              <option value="chernyshova">Чернышева</option>
            </select>
          </div>

          <div class="block__content">
            <label class="sms" for="sms"><input type="checkbox" id="sms" v-model="client.sms">Не отправлять СМС</label>
          </div>
        </div>
        
        <!-- Адрес -->
        <div class="block__element">
          <h3>Адрес</h3>
          <hr>

          <!-- Индекс -->
          <div class="block__content">
            <label for="index">Индекс</label>
            <input
              id="index"
              type="text"
              v-model="client.adress.index"
              @blur="$v.client.adress.index.$touch()"
            >
            <span v-if="invalidNum($v.client.adress.index)">{{error.num}}</span>
          </div>
          
          <!-- Страна -->
          <div class="block__content">
            <label for="country">Страна</label>
            <input
              id="country"
              type="text"
              v-model="client.adress.country"
            >
          </div>

          <!-- Область -->
          <div class="block__content">
            <label for="region">Область</label>
            <input
              id="region"
              type="text"
              v-model="client.adress.region"
            >
          </div>

          <!-- Город -->
          <div class="block__content">
            <label for="city">Город<b>*</b></label>
            <input
              id="city"
              type="text"
              v-model="client.adress.city"
              @blur="$v.client.adress.city.$touch()"
            >
            <span v-if="invalidRequired($v.client.adress.city)">{{error.required}}</span>
            <span v-else-if="invalidAlpha($v.client.adress.city)">{{error.alpha}}</span>
          </div>

          <!-- Улица -->
          <div class="block__content">
            <label for="street">Улица</label>
            <input
              id="street"
              type="text"
              v-model="client.adress.street"
            >
          </div>

          <!-- Дом -->
          <div class="block__content">
            <label for="building">Дом</label>
            <input
              id="building"
              type="text"
              v-model="client.adress.building"
            >
          </div>

        </div>

        <!-- Удостоверение личности -->
        <div class="block__element">
          <h3>Удостоверение личности</h3>
          <hr>

          <!-- Тип документа -->
          <div class="block__content">
            <label for="document">Тип документа<b>*</b></label>
            <select
              id="document"
              v-model="client.document.type"
              :class="{'error': invalid($v.client.document.type)}"
              @blur="$v.client.document.type.$touch()"
            >
              <option disabled value="">Выберите вариант</option>
              <option value="passport">Паспорт</option>
              <option value="bс">Сведетельство о рождении</option>
              <option value="dr">Водительское удостоверение</option>
            </select>
            <span v-if="invalidRequired($v.client.document.type)">{{error.required}}</span>
          </div>

          <!-- Серия -->
          <div class="block__content">
            <label for="series">Серия</label>
            <input
              id="series"
              type="text"
              v-model="client.document.series"
              @blur="$v.client.document.series.$touch()"
            >
            <span v-if="invalidNum($v.client.document.series)">{{error.num}}</span>
          </div>

          <!-- Номер -->
          <div class="block__content">
            <label for="number">Номер</label>
            <input
              id="number"
              type="text"
              v-model="client.document.number"
              @blur="$v.client.document.number.$touch()"
            >
            <span v-if="invalidNum($v.client.document.number)">{{error.num}}</span>
          </div>

          <!-- Кем выдан -->
          <div class="block__content">
            <label for="issued">Кем выдан</label>
            <input
              id="issued"
              type="text"
              v-model="client.document.issued"
            >
          </div>

          <!-- Дата выдачи -->
          <div class="block__content">
            <label for="date">Дата выдачи<b>*</b></label>
            <input
              id="date"
              type="date"
              v-model="client.document.date"
              :class="{'error': invalid($v.client.document.date)}"
              @blur="$v.client.document.date.$touch()"
            >
            <span v-if="invalidRequired($v.client.document.date)">{{error.required}}</span>
            <span v-else-if="invalidDate($v.client.document.date)">{{error.date}}</span>
          </div>

        </div>
        
      </div>

      <button
        :disabled="validation"
        :class="{'disabled': validation}"
        @click="regestrated = true"
        >ЗАРЕГЕСТРИРОВАТЬСЯ
      </button>
      <pre><b>*</b> - Обязательне поле</pre>
    </div>

    <!-- Информация об успешной регистрации -->
    <div class="block" v-else-if="regestrated">
      <div class="block__column">
        <div class="block__element regestrated">
          <h3 style="margin: 40px;">Вы успешно зарегестрированны!</h3>
        </div>
        <button @click="regestrated = false">ОК</button>
      </div>
    </div>
  </div>
</template>

<script>
import { required, numeric } from 'vuelidate/lib/validators'

const date = value => {
  if (value !== '') {
    let year = value.slice(0, 4)
    let month = value.slice(5, 7)
    let day = value.slice(8)
    let currentYear = new Date().getFullYear()
    let currentMonth = new Date().getMonth() + 1
    let currentDay = new Date().getDate()

    if (year > currentYear) {
      return false
    } else if (year == currentYear && month > currentMonth) {
      return false
    } else if (year == currentYear && month == currentMonth && day > currentDay) {
      return false
    } else return true
  } else return false
}

export default {
  data() {
    return {
      client: {
        surname: '',
        name: '',
        fathername: '',
        tel: '',
        birthday: '',
        sex: '',
        patientGroup: [],
        doctor: '',
        sms: false,
        adress: {
          index: '',
          country: '',
          region: '',
          city: '',
          street: '',
          building: ''
        },
        document: {
          type: '',
          series: '',
          number: '',
          issued: '',
          date: ''
        },
      },
      error: {
        required: 'Обязательное поле',
        alpha: 'Поле должно сожержать только буквы на русском языке',
        date: 'Неверная дата',
        num: 'Поле должно содержать только цифры без символов',
        length: 'Введите 11-ти значный номер',
        seven: 'Номер телефона должен начинаться с 7'
      },
      regestrated: false
    }
  },
  validations: {
    client: {
      surname: {required, alpha: val => /^[а-яё]*$/i.test(val)},
      name: {required, alpha: val => /^[а-яё]*$/i.test(val)},
      tel: {required, numeric, length: val => val.length === 11, seven: val => val[0] === '7'},
      birthday: {required, date},
      patientGroup: {required},
      adress: {
        index: {numeric},
        city: {required, alpha: val => /^[а-яё]*$/i.test(val)}
      },
      document: {
        type: {required},
        series: {numeric},
        number: {numeric},
        date: {required, date}
      }
    }
  },
  computed: {
    validation() {
      if (this.$v.$invalid) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    invalid(el) {
      return el.$dirty && el.$invalid
    },
    invalidRequired(el){
      return el.$dirty && !el.required
    },
    invalidAlpha(el) {
      return el.$dirty && !el.alpha
    },
    invalidDate(el) {
      return el.$dirty && !el.date
    },
    invalidNum(el) {
      return el.$dirty && !el.numeric
    },
    invalidLength(el) {
      return el.$dirty && !el.length
    },
    invalidSeven(el) {
      return el.$dirty && !el.seven
    }
  }
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap')

$color_primary: rgba(0, 170, 210, 0.4)
$color_secondary: rgba(0, 170, 210, 0.1)
$color_success: rgba(0, 210, 0, 0.5)
$color_disabled: rgba(240, 50, 0, 0.5)
$color_error: #A81000
$font_primary: 'Montserrat', sans-serif

body
  font-family: $font_primary
hr
  border-color: white
.error
  border: 1px solid $color_error
  &:hover
    border: 1px solid red
label
  padding-left: 2px
  font-size: 18px
select
  width: 95%
  height: 26px
  outline: none
  border-color: #B1B1B1
  &:hover
    border-color: #7B7B7B
input
  width: 93%
  height: 24px
  font-size: 20px
  outline: none
  border: 1px solid rgba(0, 0, 0, 0.2)
  &:hover
    border: 1px solid rgba(0, 0, 0, 0.5)
select:focus, input:focus
  border: 1px solid rgba(0, 0, 0, 0.7)
b
  color: #9E3026
  margin-left: 2px
  font-size: 16px
span
  color: $color_error
  font-size: 12px
  text-align: start
button
  font-family: $font_primary
  font-size: 16px
  font-weight: bold
  background-color: $color_secondary
  width: 220px
  height: 44px
  margin-bottom: 12px
  margin-top: 10px
  border: none
  outline: 3px solid $color_primary
  transition: .25s
  &:hover
    background-color: $color_success
    outline: 3px solid $color_success
    transition: .25s
.disabled:hover
  background-color: $color_disabled
  outline: 3px solid $color_disabled
  transition: .25s
.block
  text-align: center
  .block__row
    display: flex
    flex-wrap: wrap
    justify-content: center
    .block__element
      background-color: $color_primary
      border-radius: 5px
      margin: 8px
      .block__content
        width: 290px
        height: 67px
        display: flex
        align-items: flex-start
        flex-direction: column
        padding-left: 16px
        margin-bottom: 20px
        &:first-child
          padding-top: 10px
.block__multiselect 
  height: 156px !important
.multiselect
  width: 272px
  background-color: white
  border: 1px solid rgba(0, 0, 0, 0.2)
  &:hover
    border: 1px solid rgba(0, 0, 0, 0.5)
.multilabel
  display: flex
  background-color: white
  align-items: center
  #vip, #problematic, #oms
    width: 24px
    margin: 6px 8px 6px 4px
  &:hover
    background-color: #1e90ff
.sms
  display: flex
  align-items: center
  margin-top: 14px
  #sms
    width: 24px
    margin: 6px 8px 6px 4px
.block__column
  display: flex
  flex-wrap: wrap
  flex-direction: column
  align-items: center
.regestrated
  background-color: rgba(0, 210, 0, 0.4) !important
  border-radius: 5px
  margin: 8px
</style>