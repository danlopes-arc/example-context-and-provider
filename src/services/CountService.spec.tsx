import { renderHook } from "@testing-library/react-hooks"
import { CountContext, CountService, useCount } from "./CountService"

describe('useCount', () => {

  const countServiceMock: jest.Mocked<CountService> = {
    count: 0,
    increment: jest.fn(),
    decrement: jest.fn()
  }

  const CountProviderMock: React.FC = ({ children }) => {
    return (
      <CountContext.Provider value={countServiceMock}>
        {children}
      </CountContext.Provider>
    )
  }

  it('uses CountContext', () => {
    const { result } = renderHook(() => useCount(), {
      wrapper: CountProviderMock
    })

    expect(result.current).toBe(countServiceMock)
  })

  it('throws if not wrapped by CountProvider', () => {
    const { result } = renderHook(() => useCount())

    expect(result.error).toEqual(new Error('useCount must be used within a CountProvider'))
  })
})