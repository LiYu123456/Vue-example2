<template>
    <li @mouseenter="handleEnter(true)" @mouseleave="handleEnter(false)" :style="{background: bgColor}">
        <label>
            <input type="checkbox" v-model="gender.selected"/>
            <span>{{gender.title}}</span>
        </label>
        <button class="btn btn-danger" v-show="isShow" @click="delGender">删除</button>
    </li>
</template>
<script>
import PubSub from 'pubsub-js'
export default {
  props: {
    gender: Object,
    index: Number,
    deleteGender: Function
  },
  data () {
    return {
      bgColor: 'white',
      isShow: false
    }
  },
  methods: {
    handleEnter (isEnter) {
      if (isEnter) {
        this.bgColor = '#aaaaaa'
        this.isShow = true
      } else {
        this.bgColor = 'white'
        this.isShow = false
      }
    },
    delGender () {
      const {gender, index, deleteGender} = this
      if (window.confirm(`确定删除爱好${gender.title}`)) {
        console.log(index)
        // deleteGender(index)
        //发布消息
        PubSub.publish('deleteGender',index)
      }
    }
  }
}
</script>
<style>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
</style>
