<template>
  <div id="app">
    <div class="todo-container">
      <div class="todo-wrap">
        <Header :addGender="addGender" ref="header"></Header>
        <List :Genders="Genders" :deleteGender="deleteGender"></List>
        <Footer :Genders="Genders" :delSelectedGender="delSelectedGender" :selectAll="selectAll"></Footer>
      </div>
    </div>
    <div>
      <div v-if="!repoUrl">loading</div>
      <div v-else>most start repo is <a :href='repoUrl'>{{repoName}}</a></div>
    </div>
  </div>
</template>

<script>
import PubSub from 'pubsub-js'
import Header from './components/Header.vue'
import List from './components/List.vue'
import Footer from './components/Footer.vue'
import storageUtil from './util/storageUtil'
import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      // Genders: JSON.parse(window.localStorage.getItem('gender') || '[]')
      Genders: storageUtil.read(),
      repoUrl: '',
      repoName: ''
    }
  },
  mounted() {
    // 发送Ajax请求，获取数据
    const url=`https://api.github.com/search/repositories?q=v&sort=stars`

    // 使用vueResource做ajax请求
    this.$http.get(url).then(
      (response) => {
        // success callback
        console.log(response.data)
        const result = response.data
        const mostRepo = result.item[0]
        this.repoUrl = mostRepo.html_url
        this.repoName = mostRepo.name
      }, (response) => {
        // error callback
        alert(`请求失败`)
      }
    )

    //使用axios做ajax请求
    axios.get(url).then(
      (response) => {
        // success callback
        console.log(response.data)
        const result = response.data
        const mostRepo = result.item[0]
        this.repoUrl = mostRepo.html_url
        this.repoName = mostRepo.name
      }, (response) => {
        // error callback
        alert(`请求失败`)
      }
    )

  },
  watch: { // 深度监视
    Genders: {
      deep: true,
      handler: function (value) {
        // window.localStorage.setItem('gender', JSON.stringify(value))
        // 使用组件来进入函数
        storageUtil.save(value)
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
