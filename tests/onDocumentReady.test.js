import { onDocumentReady } from '../src/scripts/helpers.js'

describe('onDocumentReady', () => {
  it('calls the callback immediately when the document is already loaded', () => {
    Object.defineProperty(document, 'readyState', {
      configurable: true,
      get: () => 'complete'
    })

    const cb = vi.fn()
    onDocumentReady(cb)

    expect(cb).toHaveBeenCalledTimes(1)
  })

  it('registers the callback when the document is still loading', () => {
    Object.defineProperty(document, 'readyState', {
      configurable: true,
      get: () => 'loading'
    })

    const cb = vi.fn()
    onDocumentReady(cb)

    document.dispatchEvent(new Event('DOMContentLoaded'))

    expect(cb).toHaveBeenCalledTimes(1)
  })
})
