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
      <textarea name="name" v-model="editableStr"></textarea>
    </div>

    <div class="editor__label">
      <h3>Editor Form</h3>
      <p>
        Insert your YAML in the dark section on the right 👉.<br>
        Edit it below 👇 and export the resulting YAML at the bottom right.
      </p>
    </div>

    <div class="editor">
      <div class="editor__form">
        <FormFieldGroup
          v-if="editableObj != null"
          :path=[]
          :value="editableObj"
        />
        <FormNewValue 
          v-else 
          :path=[]
        />
      </div>
    </div>

    <footer>Current version from: Dec 21st, 2019</footer>
  </div>
</template>

<script>
import FormNewValue from '@/components/FormNewValue.vue'

export default {
  name: 'home',
  components: {
    FormNewValue,
    FormFieldGroup: () => import('@/components/FormFieldGroup.vue')
  },
  data: () => {
    return {}
  },
  computed: {
    editableStr: {
      get(){
        return this.$store.state.editableStr
      },
      set(value){
        this.$store.commit('updateStr', value)
      }
    },
    editableObj(){ return this.$store.state.editableObj }
  },
  methods: {
    copyExport: function(){
      navigator.clipboard.writeText(
        this.$store.state.editableStr
      ).then(() => {
        alert("Export YML copied to clipboard. You can now just paste it anywhere.")
      })
    }
  }
}
</script>

<style lang="scss" scoped>

/* *** LAYOUT *** */

.home {
  padding: 10px;

  max-height: 100vh;
  height: 100vh;

  max-width: 100%;
  max-height: 100%;

  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'editor__label import__label'
    'editor import'
    'footer footer';

  @media(max-width: 700px){
    display: block;
  }
}

.editor__label { grid-area: editor__label; }
.editor {
  grid-area: editor;

  overflow: scroll;
}
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

footer {
  font-size: .6rem;
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
