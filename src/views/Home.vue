<template>
  <div class="home">
    <div class="import__label">
      <h3>YAML Editor</h3>
      <div class="import__options">
        <!-- <input type="file" name="" value=""> -->
        <button v-on:click="copyExport" type="button" name="button">Copy YML to clipboard</button>
      </div>
    </div>

    <div class="import">
      <textarea name="name" @input="parseImport" v-model="importStr"></textarea>
    </div>

    <div class="editor__label">
      <h3>Editor Form</h3>
      <p>
        Paste or enter your <a href="http://www.yamllint.com/" target="_blank">clean YAML</a> to the right 👉.<br>
        Edit it below 👇. Export the resulting YAML at the bottom right.
      </p>
    </div>

    <div class="editor">

      <div @input="handleFormEdits" @click="handleFormEdits" class="editor__form">
        <FormFieldGroup v-model="editableObj" />
      </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import YAML from 'yaml'
import {isNumOrStr, isObj, isArr} from '@/services/Utility.js'

export default {
  name: 'home',
  components: {
    FormFieldGroup: () => import('@/components/FormFieldGroup.vue')
  },
  data: () => {
    return {
      importStr: '',
      editableObj: {}
    }
  },
  computed: {
    exportStr: function(){ return YAML.stringify(this.editableObj) }
  },
  methods: {
    isNumOrStr: val => isNumOrStr(val),
    isArr: val => isArr(val),
    isObj: val => isObj(val),
    parseImport: function(){
      try{
        this.editableObj = YAML.parse(this.importStr)
      }catch(error){
        this.editableObj = "Whoops. You don't seem to have entered valid YAML"
      }
    },
    copyExport: function(){
      navigator.clipboard.writeText(this.exportStr).then(() => {
        alert("Export YML copied to clipboard. You can now just paste it anywhere.")
      })
    },
    handleFormEdits: function() { this.importStr = this.exportStr }
  }
}
</script>

<style lang="scss" scoped>

/* *** LAYOUT *** */

.home {
  max-height: 100vh;

  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'editor__label import__label'
    'editor import';

  & > * { overflow: scroll; }

  @media(max-width: 700px){
    display: block;
  }
}

.editor__label { grid-area: editor__label; }
.editor { grid-area: editor; }
.import__label { grid-area: import__label; }
.import {
  grid-area: import;
  overflow: hidden;

  textarea {
    height: 100%;
    width: 100%;
    background-color: #eee;
    border: none;
    resize: none;
    outline: none;
    margin: 0;

    box-shadow: inset 0 0 5px #888;
    background-color: #223d51;//#51606b;
    color: #eee;
    font-family: Courier, serif;
    font-size: .8rem;
    padding: 5px;
  }
}

.import__options {
  text-align: right;
}
.editor__form {
  padding-right: 10px;
}

/* *** STYLES *** */

button {
  background-color: none;
  border: 2px solid #5ca2b2;
  border-radius: 3px;
  color: #5ca2b2;
  font-weight: 700;
  padding: 5px 10px;

  transition: .4s all;

  &:hover, &:focus {
    cursor: pointer;
    border-color: #77ddd6;
    color: #77ddd6;
  }
}
</style>
