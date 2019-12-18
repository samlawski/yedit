<template lang="html">
  <div class="">
    <div v-if="isNumOrStr(value)">

      <div class="editor__field">
        <textarea
          placeholder="type your text ..."
          rows="3"
          v-if="showTextarea"
          v-bind:value="value"
          v-on:input="$emit('input', $event.target.value)"
        ></textarea>
        <input
          placeholder="type your text ..."
          v-else
          v-bind:value="value"
          v-on:input="$emit('input', (/^[+-]?\d+(\.\d+)?$/.test($event.target.value) ? parseFloat($event.target.value) : $event.target.value) )"
          type="text"
        >
      </div>

    </div>
    <div v-else-if="isArr(value)">

      <FormArr v-bind:arr="value" />

    </div>
    <div v-else-if="isObj(value)">

      <FormObj v-bind:obj="value" />

    </div>
    <div v-else>
      <p>Whoops. Somehow this field couldn't be displayed 🤷‍ Maybe try <a href="http://www.yamllint.com/" target="_blank">YAMLlint</a> to check whether your YAML is correct.</p>
    </div>
  </div>
</template>

<script>
import {isNumOrStr, isObj, isArr, isStr} from '@/services/Utility.js'

export default {
  name: 'FormFieldGroup',
  components: {
    FormObj: () => import('@/components/FormObj.vue'),
    FormArr: () => import('@/components/FormArr.vue')
  },
  props: ['value'],
  computed: {
    showTextarea: function(){
      return isStr(this.value) && (this.value.length > 24 || this.value.includes('\n'))
    }
  },
  methods: {
    isNumOrStr: val => isNumOrStr(val),
    isArr: val => isArr(val),
    isObj: val => isObj(val)
  }
}
</script>

<style lang="scss">
input, textarea {
  border: none;
  width: 100%;
  border-bottom: 2px solid #ccc;
  padding: 3px;
  outline: none;
  background-color: transparent;

  transition: .4s border-color;

  &:focus {
    border-color: LightSeaGreen;
  }
}
</style>
