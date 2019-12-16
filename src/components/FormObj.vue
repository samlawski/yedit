<template lang="html">
  <div>
    <div class="editor__obj" v-for="(val, key, i) in obj" v-bind:key="`editable-wrapper-${key}-${i}`">
      <label><strong>{{key}}</strong></label>

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
import FormArr from '@/components/FormArr.vue'

export default {
  name: 'FormObj',
  components: {FormField, FormArr},
  props: ['obj'],
  methods: {
    isNumOrStr: val => isNumOrStr(val),
    isArr: val => isArr(val),
    isObj: val => isObj(val)
  }
}
</script>

<style lang="scss">
.editor__obj {
  border: 1px solid #ccc;
  padding: 5px;
}
</style>
