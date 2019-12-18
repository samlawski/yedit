<template lang="html">
  <ol class="editor__arr">
    <li class="editor__arr__item" v-for="(val, i) in arr" :key="`editable-wrapper-arr-${i}`">
      <div v-if="isNumOrStr(val)">
        <FormField v-model="arr[i]" />
      </div>
      <div v-else-if="isArr(val)">
        <FormArr :arr="val" />
      </div>
      <div v-else-if="isObj(val)">
        <FormObj :obj="val" />
      </div>
      <div v-else>
        <p>Whoops. Somehow this field couldn't be displayed 🤷‍</p>
      </div>
    </li>

    <div class="editor__add-item">
      <button type="button" name="button" @click="addItem">+</button>
    </div>
  </ol>
</template>

<script>
import {isNumOrStr, isObj, isArr} from '@/services/Utility.js'
import FormField from '@/components/FormField.vue'

export default {
  name: 'FormArr',
  components: {
    FormField,
    FormObj: () => import('@/components/FormObj.vue')
  },
  props: ['arr'],
  methods: {
    isNumOrStr: val => isNumOrStr(val),
    isArr: val => isArr(val),
    isObj: val => isObj(val),
    addItem: function(){ this.arr.push("") }
  }
}
</script>

<style lang="scss" scoped>
.editor__arr {
  margin-bottom: 10px;
}
.editor__arr__item {
  margin-bottom: 20px;
}


.editor__add-item {
  text-align: center;
}
button {
  border-radius: 50%;
  background-color: rgba(0,0,0,0.1);

}
</style>
