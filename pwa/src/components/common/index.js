import Vue from 'vue'
import LoadingCard from './LoadingCard'
import MenuAccount from './MenuAccount'

const requireComponent = {}
requireComponent['LoadingCard'] = LoadingCard
requireComponent['MenuAccount'] = MenuAccount

Object.keys(requireComponent).forEach(fileName => {
  // console.log({ 'LOGGING fileName': fileName })
  const componentConfig = requireComponent[fileName]
  // En algunos test lo sobreescribo
  if (componentConfig) {
    Vue.component(fileName, componentConfig.default || componentConfig)
  } else {
    console.log('LOGGING no hay componentConfig')
  }
})
