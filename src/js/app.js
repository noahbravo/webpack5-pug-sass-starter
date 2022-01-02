import 'normalize.css/normalize.css'
import '../sass/style.sass'
import { onDocumentReady, importAll } from './functions.js'

// import all media from ./src/assets
importAll(
  require.context(
    '../assets/images',
    false,
    /\.(png|jpe?g|svg|gif|mov|mp4|ico|xml|webmanifest)$/
  )
)

onDocumentReady(function () {
  console.log('hello friend.')
})
