<template lang="html">
  <div class="editor__obj">
    <div class="editor__obj__item" v-for="(val, key, i) in obj" v-bind:key="`editable-wrapper-${key}-${i}`">

      <label>
        <input
          class="editKey__field"
          type="text"
          :value="key"
          @blur="editKey(key, $event.target)"
        >
      </label>
      <FormFieldGroup
        :path="newPath(key)"
        :value="obj[key]"
      />
      <!-- <div class="field__icons">
        <button class="field__remove" type="button" name="button" @click="removeItem(i)">🗑</button>
      </div> -->

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
    editKey: function(oldKey, target){
      let newKey = target.value
      let isKeyPresent = Object.keys(this.obj).includes(newKey)

      let allowEdit = isKeyPresent ?
        confirm("Attention! You chose a name for this field that already exists. You cannot have two fields with the same name. If you confirm, the other field will be removed. Are you sure you want to do that?") :
        true

      if(allowEdit){
        this.$store.commit('updateObjKey', {
          path: this.path,
          oldKey: oldKey,
          newKey: newKey
        })
      }else{
        target.value = oldKey
      }
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
</style>
