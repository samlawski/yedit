# yedit

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### ToDo

- Allow Toggle between text input and textarea


### Reference

```
<template lang="html">
  <div class="">
    <div v-if="isNumOrStr(value)">
      <FormField v-bind:value="fieldValue" />
    </div>
    <div v-else-if="isArr(value)">
      <FormArr v-bind:arr="value" />
    </div>
    <div v-else-if="isObj(value)">
      <FormObj v-bind:obj="value" />
    </div>
    <div v-else>
      <p>Whoops. Somehow this field couldn't be displayed 🤷‍</p>
    </div>
  </div>
</template>

<script>
import {isNumOrStr, isObj, isArr} from '@/services/Utility.js'

export default {
  name: 'FormFieldGroup',
  components: {
    FormField: () => import('@/components/FormField.vue'),
    FormObj: () => import('@/components/FormObj.vue'),
    FormArr: () => import('@/components/FormArr.vue')
  },
  props: ['value', 'fieldValue'],
  methods: {
    isNumOrStr: val => isNumOrStr(val),
    isArr: val => isArr(val),
    isObj: val => isObj(val)
  }
}
</script>

<style lang="scss">
</style>
```
