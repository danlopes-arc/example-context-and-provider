# React Context and Provider Example

A simple example of how to setup and test a context, a provider and a its hook.

`useCount` ensures it's within a `CountProvider` or `CountContext.Provider` otherwise
it thows and error asking for it.

The tests use `renderHook` from `@testing-library/react-hooks` so they don't need to
render a stub component that uses the hook/provider. That way we can make assertions
against the value returned by the hook instead of doing so against its side effects
in components.