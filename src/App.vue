<template>
  <div id="app">
    <div class="todo-container">
    <div class="todo-wrap">
      <Header :addGender="addGender" ref="header"></Header>
      <List :Genders="Genders" :deleteGender="deleteGender"></List>
      <Footer :Genders="Genders" :delSelectedGender="delSelectedGender" :selectAll="selectAll"></Footer>
    </div>
  </div>
  </div>
</template>

<script>
import PubSub from 'pubsub-js'
import Header from './components/Header.vue'
import List from './components/List.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  data () {
    return {
      Genders: JSON.parse(window.localStorage.getItem('gender') || '[]')
    }
  },
  watch: { // 深度监视
    Genders: {
      deep: true,
      handler: function (value) {
        window.localStorage.setItem('gender', JSON.stringify(value))
      }
    }
  },
  mounted () {
    // 用JS动态绑定事件
    this.$refs.header.$on('deleteGender',this.Genders)
    
    // 使用消息机制来处理事件的调用和参数传递问题
    // 订阅消息
    PubSub.subscribe('deleteGender',(msg,index) => {
      this.Genders.splice(index, 1)
    })
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
