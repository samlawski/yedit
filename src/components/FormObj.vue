<template lang="html">
  <div class="editor__obj">
    <div class="editor__obj__item" v-for="(val, key, i) in obj" v-bind:key="`editable-wrapper-${key}-${i}`">
      <label>{{key}}</label>

      <div v-if="isNumOrStr(val)">
        <FormField v-model="obj[key]" />
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

    </div>
  </div>
</template>

<script>
import {isNumOrStr, isObj, isArr} from '@/services/Utility.js'
import FormField from '@/components/FormField.vue'

export default {
  name: 'FormObj',
  components: {
    FormField,
    FormArr: () => import('@/components/FormArr.vue')
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
  // border-radius: 3px;
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
