<template lang="html">
  <div>
    <input
      v-bind:value="value"
      v-on:input="$emit('input', (/^[+-]?\d+(\.\d+)?$/.test($event.target.value) ? parseFloat($event.target.value) : $event.target.value) )"
      type="text"
    >
  </div>
</template>

<script>

export default {
  name: "FormField",
  props: ['value']
}
</script>

<style lang="scss">
</style>
