import React, { useState, useEffect, useCallback } from 'react'
const useAsync = (
  asyncFunction: () => Promise<string>,
  immediate: boolean = true
) => {
  const [status, setStatus] = useState<string>('idle')
  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<string>('')
  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setStatus('pending')
    setValue('')
    setError('')
    return asyncFunction()
      .then((response: any) => {
        setValue(response)
        setStatus('success')
      })
      .catch((error: any) => {
        setError(error)
        setStatus('error')
      })
  }, [asyncFunction])
  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return {
    execute,
    status,
    value,
    error,
  }
}
export default useAsync
