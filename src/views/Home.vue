<template>
  <div class="home">
    <ImportForm />
  </div>
</template>

<script>
// @ is an alias to /src
import ImportForm from '@/components/ImportForm.vue'

export default {
  name: 'home',
  components: {
    ImportForm
  }
}
</script>
