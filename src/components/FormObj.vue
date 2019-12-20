<template lang="html">
  <div class="editor__obj">
    <div class="editor__obj__item" v-for="(val, key, i) in obj" v-bind:key="`editable-wrapper-${key}-${i}`">

      <label>
        <input
          class="editKey__field"
          type="text"
          :value="key"
          @input="editKey(key, $event.target.value)"
        >
        <span class="editKey__icon">✏️</span>
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
    newPath(key){ return this.path + '/' + key.toString() },
    editKey: function(oldKey, newKey){
      this.$store.commit('updateObjKey', {
        path: this.path,
        oldKey: oldKey,
        newKey: newKey
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
    font-size: .7rem;
    font-weight: 700;
    margin-bottom: 5px;
    display: flex;

    .editKey__icon {
      opacity: 0.2;
      transition: .4s opacity;
      cursor: pointer;
    }

    &:hover {
      .editKey__icon {opacity: 1}
    }
  }
}

.editKey__field {
  outline: none;
  background-color: transparent;
  font-weight: 700;
  border: none;
  display: inline;
  width: 100%;
}
</style>
