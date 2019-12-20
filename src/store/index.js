import Vue from 'vue'
import Vuex from 'vuex'
import YAML from 'yaml'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editableStr: "test: 423\ntest2:\n  hi: there\n  world: \n    - 24\n    - drinks",
    editableObj: {test: 423, test2: {hi: "there", world: [24, "drinks"]}}
  },
  mutations: {
    updateStr(state, payload){
      state.editableStr = payload

      try{
        state.editableObj = YAML.parse(payload)
      }catch(error){
        state.editableObj = "Whoops. You don't seem to have entered valid YAML"
      }
    },
    updateVal(state, payload){
      let pathKeys = payload.path.split('/')

      pathKeys.reduce((acc, val, i) => {
        if(i == 0) return acc
        if(i + 1 != pathKeys.length) return acc[val]
        // TODO what if there is only a value?

        val.toString().length > 0 ?
          acc[val] = payload.value :
          acc = payload.value
      }, state.editableObj)

      state.editableStr = YAML.stringify(state.editableObj)
    },
    updateObjKey(state, payload){
      console.log('n', payload.path, payload.oldKey, payload.newKey)

      state
      payload
    }
  }
})
