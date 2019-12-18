<template lang="html">
  <div class="editor__obj">
    <div class="editor__obj__item" v-for="(val, key, i) in obj" v-bind:key="`editable-wrapper-${key}-${i}`">

      <label>{{key}}</label>
      <FormFieldGroup v-model="obj[key]" />

    </div>
  </div>
</template>

<script>
import {isNumOrStr, isObj, isArr} from '@/services/Utility.js'

export default {
  name: 'FormObj',
  components: {
    FormFieldGroup: () => import('@/components/FormFieldGroup.vue')
  },
  props: ['obj'],
  methods: {
    isNumOrStr: val => isNumOrStr(val),
    isArr: val => isArr(val),
    isObj: val => isObj(val)
  }
}
</script>

<style lang="scss" scoped>
.editor__obj {
  padding: 10px;
  margin-bottom: 10px;

  border-left: 3px solid #ccc;
}

.editor__obj__item {
  margin-bottom: 20px;

  label {
    font-size: .7rem;
    font-weight: 700;
    margin-bottom: 5px;
    display: block;
  }
}
</style>
