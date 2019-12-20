<template lang="html">
  <div class="editor__obj">
    <div class="editor__obj__item" v-for="(val, key, i) in obj" v-bind:key="`editable-wrapper-${key}-${i}`">

      <label>
        <input
          class="editKey__field"
          type="text"
          :ref="path.toString() + '_keyInput_' + i"
          :value="key"
          @input="editKey(key, $event.target, i)"
        >
      </label>
      <FormFieldGroup
        :path="newPath(key)"
        :value="obj[key]"
      />
      <div class="field__icons">
        <button class="field__remove" type="button" name="button" @click="removeItem(key)">🗑</button>
      </div>

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
  props: ['obj', 'path'],
  methods: {
    isNumOrStr: val => isNumOrStr(val),
    isArr: val => isArr(val),
    isObj: val => isObj(val),
    newPath(key){ return [].concat(this.path, key.toString()) },
    editKey(oldKey, target, i){
      let newKey = target.value
      let isKeyPresent = Object.keys(this.obj).includes(newKey)

      if(isKeyPresent){
        alert("Attention! You tried to enter a field name that already exists. All fields on the same level need to have different names.")
        target.value = oldKey
      }else{
        this.$store.commit('updateObjKey', {
          path: this.path,
          oldKey: oldKey,
          newKey: newKey
        })
        this.$nextTick(() => {
          this.$refs[this.path.toString() + '_keyInput_' + i][0].focus()
        })
      }
    },
    removeItem(key){
      this.$store.commit('removeObjKey', {
        path: this.path,
        key: key
      })
    }
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
    display: flex;
  }
}

.editKey__field {
  font-size: .7rem;
  margin-bottom: 5px;
  outline: none;
  background-color: transparent;
  font-weight: 700;
  border: none;
  display: inline;
  width: 100%;
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
</style>
