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
        :ref="path.toString() + '_valInput_' + i"
        :value="obj[key]"
      />
      <div class="field__icons">
        <button class="field__remove" type="button" name="button" @click="removeItem(key)">🗑</button>
      </div>

    </div>

    <div class="editor__obj__item editor__obj__item--add">
      <input 
        type="text" 
        value="add label ..." 
        @click="startAddingKey" 
        @blur="resetAddKeyBtn" 
        @keyup.enter="addKey($event.target)" 
        ref="addKey"
      >
      <small v-if="addingKey">(Hit <i>Enter</i> to add)</small>
    </div>

  </div>
</template>

<script>
import {isNumOrStr, isObj, isArr} from '@/services/Utility.js'
// import FormNewValue from '@/components/FormNewValue.vue'

export default {
  name: 'FormObj',
  components: {
    FormFieldGroup: () => import('@/components/FormFieldGroup.vue')
  },
  props: ['obj', 'path'],
  data(){
    return {
      addingKey: false
    }
  },
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
    },
    startAddingKey(){
      this.addingKey = true
      this.$refs.addKey.value = ""
    },
    resetAddKeyBtn(){
      this.addingKey = false
      this.$refs.addKey.value = "add label ..."
    },
    addKey(target){
      let key = target.value
      this.$store.commit('addObjKey', { path: this.path, key: key})
      target.blur()
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

.editor__obj__item--add {
  display: flex;
  align-items: center; 
  
  input {
    background-color: rgba(0,0,0,0.1);
    padding: 5px 10px;
    font-size: .7rem;
    margin-right: 10px;

    border: none;
    outline: none;
    cursor: pointer;
  }
}
</style>
