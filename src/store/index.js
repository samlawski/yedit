import Vue from 'vue'
import Vuex from 'vuex'
import YAML from 'yaml'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editableStr: '',
    editableObj: null
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
      payload.path.length > 0 ?
        _.set(state.editableObj, payload.path, payload.value) :
        state.editableObj = payload.value

      state.editableStr = YAML.stringify(state.editableObj)
    },
    updateObjKey(state, payload){
      if(payload.path.length > 0){
        _.set(
          state.editableObj,
          payload.path,
          replaceObjKey(
            _.get(state.editableObj, payload.path),
            payload.oldKey,
            payload.newKey
          )
        )
      }else{
        state.editableObj = replaceObjKey(
          state.editableObj,
          payload.oldKey,
          payload.newKey
        )
      }

      state.editableStr = YAML.stringify(state.editableObj)
    },
    removeObjKey(state, payload){
      state.editableObj = _.omit(
        state.editableObj,
        [[].concat(payload.path, payload.key)]
      )

      state.editableStr = YAML.stringify(state.editableObj)
    },
    addObjItem(state, payload){

      if(payload.path.length > 0){
        _.set(
          state.editableObj,
          [].concat(payload.path, [""]),
          ""
        )
      }else{
        state.editableObj[""] = ""
      }

      state.editableStr = YAML.stringify(state.editableObj)
    }
  }
})


function replaceObjKey(oldObj, oldKey, newKey){
  let tmpObj = {}
  Object.keys(oldObj).forEach(key => {
    if (key === oldKey) {
      let newPair = { [newKey]: oldObj[oldKey] }
      tmpObj = { ...tmpObj, ...newPair }
    } else {
      tmpObj = { ...tmpObj, [key]: oldObj[key] }
    }
  })
  return tmpObj
}
