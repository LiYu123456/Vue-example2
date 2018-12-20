<template>
  <div id="app">
    <div class="todo-container">
    <div class="todo-wrap">
      <Header :addGender="addGender"></Header>
      <List :Genders="Genders" :deleteGender="deleteGender"></List>
      <Footer :Genders="Genders" :delSelectedGender="delSelectedGender" :selectAll="selectAll"></Footer>
    </div>
  </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import List from './components/List.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  data () {
    return {
      Genders: [
        {
          title: '游泳',
          selected: false
        }, {
          title: '跳舞',
          selected: true
        }, {
          title: '射击',
          selected: false
        }
      ]
    }
  },
  components: {
    Header, List, Footer
  },
  methods: {
    addGender (gender) {
      this.Genders.unshift(gender)
    },
    deleteGender (index) {
      this.Genders.splice(index, 1)
    },
    delSelectedGender () {
      this.Genders = this.Genders.filter(gender => !gender.selected)
    },
    selectAll (arg) {
      this.Genders.forEach(gender => (gender.selected = arg))
    }
  }
}
</script>

<style>
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
