import { renderHook } from "@testing-library/react-hooks"
import { act } from "react-dom/test-utils"
import { CountContext, CountProvider, CountService, useCount } from "./CountService"

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

    expect(result.error).not.toBeDefined()
    expect(result.current).toBe(countServiceMock)
  })

  it('throws if not wrapped by CountProvider', () => {
    const { result } = renderHook(() => useCount())

    expect(result.error).toEqual(new Error('useCount must be used within a CountProvider'))
  })
})

describe('CountProvider', () => {
  it('initializes with count as 0', () => {
    const { result } = renderHook(() => useCount(), {
      wrapper: CountProvider
    })

    expect(result.error).not.toBeDefined()
    expect(result.current.count).toBe(0)
  })

  it('increments count by 1', () => {
    const { result } = renderHook(() => useCount(), {
      wrapper: CountProvider
    })

    act(() => {
      result.current.increment()
    })

    expect(result.error).not.toBeDefined()
    expect(result.current.count).toBe(1)
  })

  it('decrements count by 1', () => {
    const { result } = renderHook(() => useCount(), {
      wrapper: CountProvider
    })

    act(() => {
      result.current.decrement()
    })

    expect(result.error).not.toBeDefined()
    expect(result.current.count).toBe(-1)
  })
})
