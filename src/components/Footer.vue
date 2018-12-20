<template>
    <div class="todo-footer">
        <label>
          <input type="checkbox" v-model="isSelected"/>
        </label>
        <span>
          <span>已完成{{selectedSize}}</span> / 全部{{Genders.length}}
        </span>
        <button class="btn btn-danger" v-show="selectedSize>0" @click="delSelectedGender">清除已完成任务</button>
    </div>
</template>
<script>
export default {
  props: {
    Genders: Array,
    delSelectedGender: Function,
    selectAll: Function
  },
  data () {
    return {
      allSelected: false
    }
  },
  computed: {
    selectedSize () {
      return this.Genders.reduce((preTotal, gender) => preTotal + (gender.selected ? 1 : 0), 0)
    },
    isSelected: {
      get () {
        return this.selectedSize === this.Genders.length && this.selectedSize > 0
      },
      set (value) {
        this.selectAll(value)
      }
    }
  }
}
</script>
<style>
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
