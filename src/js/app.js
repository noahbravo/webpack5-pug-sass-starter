import 'normalize.css/normalize.css'
import '../sass/style.sass'
import { onDocumentReady, importAll } from './functions.js'

// import all images from assets
importAll(require.context('../assets/images', false, /\.(png|jpe?g|svg|gif)$/))

onDocumentReady(function () {
  console.log('hello friend.')
})
