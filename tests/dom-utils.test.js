import { screen } from '@testing-library/dom'

describe('Basic DOM', () => {
  it('finds the "hello friend." text', () => {
    document.body.innerHTML = `
      <section class="terminal__wrapper">
        <p>hello friend.</p>
      </section>
    `

    const el = screen.getByText(/hello friend\./i)
    expect(el).toBeInTheDocument()
  })
})
