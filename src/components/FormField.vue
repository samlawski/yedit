<template lang="html">
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
</template>

<script>
import {isStr} from '@/services/Utility.js'

export default {
  name: "FormField",
  props: ['value'],
  computed: {
    showTextarea: function(){
      return isStr(this.value) && (this.value.length > 24 || this.value.includes('\n'))
    }
  }
}
</script>

<style lang="scss" scoped>
input, textarea {
  border: none;
  width: 100%;
  // border-left: 1px solid #ccc;
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
