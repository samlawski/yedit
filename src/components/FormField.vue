<template lang="html">
  <div>
    <textarea
      v-if="showTextarea"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    ></textarea>
    <input
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

<style lang="scss">
</style>
