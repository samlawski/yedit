<template lang="html">
  <div class="editor__arr">
    <div class="editor__arr__item" v-for="(val, i) in arr" :key="`editable-wrapper-arr-${i}`">
      <FormFieldGroup class="field" v-model="arr[i]" />
      <button type="button" name="button" @click="removeItem(i)">-</button>
    </div>

    <div class="editor__add-item">
      <button type="button" name="button" @click="addItem">+</button>
    </div>
  </div>
</template>

<script>
import {isNumOrStr, isObj, isArr} from '@/services/Utility.js'

export default {
  name: 'FormArr',
  components: {
    FormFieldGroup: () => import('@/components/FormFieldGroup.vue')
  },
  props: ['arr'],
  methods: {
    isNumOrStr: val => isNumOrStr(val),
    isArr: val => isArr(val),
    isObj: val => isObj(val),
    addItem: function(){ this.arr.push("") },
    removeItem: function(i){ this.arr.splice(i, 1) }
  }
}
</script>

<style lang="scss" scoped>
.editor__arr {
  margin-bottom: 10px;
}
.editor__arr__item {
  margin-bottom: 20px;

  display: flex;

  .field { flex-grow: 1 }
  button { flex-grow: 0 }
}


.editor__add-item {
  text-align: center;

  button {
    border-radius: 50%;
    background-color: rgba(0,0,0,0.1);
  }
}
</style>
