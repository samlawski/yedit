<template lang="html">
  <div class="editor__arr">
    
    <div class="editor__arr__item" v-for="(val, i) in arr" :key="`editable-wrapper-arr-${i}`">
      <div class="field__line">
        <div class="field__counter">{{i + 1}}.</div>
        <FormFieldGroup
          class="field"
          :path="newPath(i)"
          :value="arr[i]"
        />
      </div>
      <div class="field__icons">
        <button class="field__remove" type="button" name="button" @click="removeItem(i)">🗑</button>
      </div>
    </div>

    <div class="editor__arr__item">
      <div class="field__line">
        <div class="field__counter">{{arr.length + 1}}.</div>
        <div class="field">
          <FormNewValue :path="newPath(arr.length)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {isNumOrStr, isObj, isArr} from '@/services/Utility.js'
import FormNewValue from '@/components/FormNewValue.vue'

export default {
  name: 'FormArr',
  components: {
    FormNewValue,
    FormFieldGroup: () => import('@/components/FormFieldGroup.vue')
  },
  props: ['arr', 'path'],
  methods: {
    isNumOrStr: val => isNumOrStr(val),
    isArr: val => isArr(val),
    isObj: val => isObj(val),
    newPath(index){ return [].concat(this.path, index.toString()) },
    // addItem: function(){
    //   this.arr.push("")
    //   this.$store.commit('updateVal', {
    //     value: this.arr,
    //     path: this.path
    //   })
    // },
    removeItem: function(i){
      this.arr.splice(i, 1)
      this.$store.commit('updateVal', {
        value: this.arr,
        path: this.path
      })
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  padding: 0;
  margin: 0;
}

.editor__arr {
  margin-bottom: 10px;
}
.editor__arr__item {
  margin-bottom: 20px;
}

.field__line {
  display: flex;
}
.field {
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;
}
.field__icons {
  margin-top: 5px;
  font-size: .6rem;
  text-align: left;

  opacity: 0.2;
  transition: .4s opacity;

  &:hover {
    opacity: 1;
  }
}
.field__counter {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 5px;
  margin-right: 10px;
}
</style>
