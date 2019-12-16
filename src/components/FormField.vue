<template lang="html">
  <div>
    <label :for="`editable__field--${uid}`">{{name}}</label>
    <input
      v-bind:value="value"
      v-on:input="$emit('input', (/^[+-]?\d+(\.\d+)?$/.test($event.target.value) ? parseFloat($event.target.value) : $event.target.value) )"
      type="text"
      :name="`editable__field--${uid}`"
      :id="`editable__field--${uid}`"
    >
  </div>
</template>

<script>
export default {
  name: "FormField",
  props: ['uid', 'name', 'value'],
  computed: {},
  data: function(){
    return {}
  }
}
</script>

<style lang="scss">
</style>
