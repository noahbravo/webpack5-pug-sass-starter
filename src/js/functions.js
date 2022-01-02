export const onDocumentReady = (callback) => {
  // in case the document is already rendered
  if (document.readyState !== 'loading') callback()
  // modern browsers
  else if (document.addEventListener)
    document.addEventListener('DOMContentLoaded', callback)
  // IE <= 8
  else
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState === 'complete') callback()
    })
}

export const importAll = (require) => require.keys().map(require)
