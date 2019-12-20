<template lang="html">
  <div class="">

    <div class="editor__field" v-if="isNumOrStr(value)">

      <textarea
        v-if="showTextarea"
        placeholder="type your text ..."
        rows="3"
        :value="value"
        @input="updateValue($event.target.value)"
      ></textarea>
      <input
        v-else
        placeholder="type your text ..."
        type="text"
        :value="value"
        @input="updateValue($event.target.value)"
      >

    </div>
    <div v-else-if="isArr(value)">

      <FormArr
        :path="path"
        :arr="value"
      />

    </div>
    <div v-else-if="isObj(value)">

      <FormObj
        :path="path"
        :obj="value"
      />

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
  props: ['value', 'path'],
  computed: {
    showTextarea: function(){
      return isStr(this.value) && (this.value.length > 24 || this.value.includes('\n'))
    }
  },
  methods: {
    isNumOrStr: val => isNumOrStr(val),
    isArr: val => isArr(val),
    isObj: val => isObj(val),
    updateValue: function(v){
      let stringOrFloat = (/^[+-]?\d+(\.\d+)?$/.test(v) ? parseFloat(v) : v)

      this.$store.commit('updateVal', {
        value: stringOrFloat,
        path: this.path
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
