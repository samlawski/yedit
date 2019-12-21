<template>
  <div @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <button  @click="addValue('')">
      Add <span v-if="!hovering">...</span>
      <transition name="slide-fade">
        <span v-if="hovering">Text or Number</span>
      </transition>
    </button>
    
    <transition name="slide-fade">
      <button v-if="hovering" @click="addValue([])">Add List (array)</button>
    </transition>
    <transition name="slide-fade">
      <button v-if="hovering" @click="addValue({})">Add List with Labels (object)</button>
    </transition>
  </div>  
</template>

<script>
export default {
  name: 'FormNewValue',
  props: ['path'],
  data(){
    return {
      hovering: false
    }
  },
  methods: {
    mouseEnter(){ this.hovering = true },
    mouseLeave(){ this.hovering = false },
    addValue(val){
      this.$store.commit('updateVal', {
        value: val,
        path: this.path
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  button {
    background-color: rgba(0,0,0,0.1);
    padding: 5px 10px;
    font-size: .7rem;
    margin-right: 10px;
  }

  .slide-fade-enter-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-leave-active {
    transition: all .4s ;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(-30px);
    opacity: 0;
  }
</style>