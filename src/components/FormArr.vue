<template lang="html">
  <ol class="editor__arr">
    <li class="editor__arr__item" v-for="(val, i) in arr" v-bind:key="`editable-wrapper-arr-${i}`">

      <div v-if="isNumOrStr(val)">
        <FormField v-model="arr[i]" />
      </div>
      <div v-else-if="isArr(val)">
        <FormArr v-bind:arr="val" />
      </div>
      <div v-else-if="isObj(val)">
        <FormObj v-bind:obj="val" />
      </div>
      <div v-else>
        <p>Whoops. Somehow this field couldn't be displayed 🤷‍</p>
      </div>

    </li>
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
    isObj: val => isObj(val)
  }
}
</script>

<style lang="scss">
.editor__arr {
  margin-bottom: 10px;
}
.editor__arr__item {
  margin-bottom: 20px;
}
</style>
