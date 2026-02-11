import rootSaga from '@/store/rootSaga'

describe('Root Saga', () => {
  it('should yield all sagas', () => {
    const generator = rootSaga()
    const result = generator.next()

    expect(result.value).toBeDefined()
    expect(result.done).toBe(false)
  })

  it('should be a generator function', () => {
    expect(typeof rootSaga).toBe('function')
    const gen = rootSaga()
    expect(typeof gen.next).toBe('function')
  })
})
