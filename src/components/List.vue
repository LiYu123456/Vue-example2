<template>
    <ul class="todo-main">
        <Item v-for="(gender,index) in Genders" :key="index"
            :gender="gender" :index="index"></Item>
    </ul>
</template>
<script>
import Item from './Item.vue'
export default {
  props: {
    Genders: Array,
    deleteGender: Function
  },
  components: {
    Item
  }
}
</script>
<style>
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}
</style>
