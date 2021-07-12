// src/plugins/fontAwesome.js
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core' // Core SVG
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' // Integration
import {
  faPlusCircle,
  faSignOutAlt,
  faGlobeAmericas,
  faCopyright,
  faChartBar,
  faMapMarkerAlt,
  faEraser,
  faEllipsisV,
  faLink,
  faIdCard,
  faMobileAlt,
  faUser,
  faBellSlash,
  faBell,
  faCog,
  faTimes,
  faCheck,
  faHeart,
  faRedoAlt,
  faSync,
  faImage,
  faCrosshairs,
  faPenAlt,
  faChevronCircleDown,
  faChevronCircleUp,
  faChevronLeft,
  faBookmark,
  faExclamationTriangle,
  faDotCircle,
  faInfoCircle,
  faQuoteLeft,
  faQuoteRight,
  faCheckSquare,
  faCaretDown,
  faHome
} from '@fortawesome/free-solid-svg-icons'
import {
  faTwitter,
  faFacebookF,
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons'
import {
  faHeart as farHeart,
  faSquare as farSquare,
  faDotCircle as farDotCircle,
  faCircle as farCircle
} from '@fortawesome/free-regular-svg-icons'

Vue.component('FontAwesomeIcon', FontAwesomeIcon)

library.add(
  faTwitter,
  faFacebookF,
  faWhatsapp,

  faPlusCircle,
  faSignOutAlt,
  faCopyright,
  faGlobeAmericas,
  faChartBar,
  faMapMarkerAlt,
  faEraser,
  faEllipsisV,
  faLink,
  faIdCard,
  faMobileAlt,
  faUser,
  faBellSlash,
  faBell,
  faCog,
  faTimes,
  faCheck,
  faHeart,
  farHeart,
  faRedoAlt,
  faSync,
  faImage,
  faCrosshairs,
  faPenAlt,
  faChevronCircleDown,
  faChevronCircleUp,
  faChevronLeft,
  faBookmark,
  faExclamationTriangle,
  farSquare,
  faDotCircle,
  farDotCircle,
  farCircle,
  faInfoCircle,
  faQuoteLeft,
  faQuoteRight,
  faCheckSquare,
  faCaretDown,
  faHome
)
