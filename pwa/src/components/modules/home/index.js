import Vue from 'vue'
import HomeCard from './HomeCard'
import Map from './Map'
import Category from './Category'

const requireComponent = {}
requireComponent['HomeCard'] = HomeCard
requireComponent['Map'] = Map
requireComponent['Category'] = Category

Object.keys(requireComponent).forEach(fileName => {
  // console.log({'LOGGING fileName': fileName})
  const componentConfig = requireComponent[fileName]
  // En algunos test lo sobreescribo
  if (componentConfig) {
    Vue.component(fileName, componentConfig.default || componentConfig)
  }
})
