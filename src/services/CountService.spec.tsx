import { act, renderHook } from "@testing-library/react-hooks"
import { CountContext, CountProvider, CountService, useCount } from "./CountService"

describe('useCount', () => {
  it('uses CountContext', () => {
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
  const renderUseCounter = () => renderHook(() => useCount(), {
    wrapper: CountProvider
  })

  it('initializes with count as 0', () => {
    const { result } = renderUseCounter()

    expect(result.current.count).toBe(0)
  })

  it('increments count by 1', () => {
    const { result } = renderUseCounter()

    act(() => result.current.increment())

    expect(result.current.count).toBe(1)

    act(() => result.current.increment())

    expect(result.current.count).toBe(2)
  })

  it('decrements count by 1', () => {
    const { result } = renderUseCounter()

    act(() => {
      result.current.increment()
      result.current.increment()
    })

    act(() => result.current.decrement())

    expect(result.current.count).toBe(1)

    act(() => result.current.decrement())

    expect(result.current.count).toBe(0)
  })
})
