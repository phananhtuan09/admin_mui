import { useState, useEffect } from 'react'
export default function useScript(src: string) {
  // Keep track of script status ("idle","loading","ready","error")
  const [status, setStatus] = useState(src ? 'loading' : 'idle')
  useEffect(() => {
    //Allow falsy src value if waiting on other data method needed for
    // constructing the script URL passed to this hook
    if (!src) {
      setStatus('idle')
      return
    }
    // Fetch exiting script element by src
    // It may have added by another instance of this book
    let script = document.querySelector(`script[src="${src}"]`)
    if (!script) {
      //Create script
      script = document.createElement('script')
      script.setAttribute('src', src)
      script.setAttribute('async', true.toString())
      script.setAttribute('data-status', 'loading')
      //Add script to document body
      document.body.appendChild(script)
      // Store status in attribute on script
      // This can be read by other instances of this book
      const setAttributeFromEvent = (event: any) => {
        script?.setAttribute(
          'data-status',
          event.Type === 'load' ? 'ready' : 'error'
        )
      }
      script.addEventListener('load', setAttributeFromEvent)
      script.addEventListener('error', setAttributeFromEvent)
    } else {
      //Grab exiting script status from attribute and set to state.
      setStatus(script.getAttribute('data-status') || '')
    }
    //Script event handler to update status in state
    //Note: Even if the script already exists we still need to add
    //event handlers to update the state for *this* hook instance.
    const setStateFromEvent = (event: any) => {
      setStatus(event.type === 'load' ? 'ready' : 'error')
      //Add event listeners
      script?.addEventListener('load', setStateFromEvent)
      script?.addEventListener('error', setStateFromEvent)
      //Remove event listeners on cleanup
      return () => {
        if (script) {
          script.removeEventListener('load', setStateFromEvent)
          script.removeEventListener('error', setStateFromEvent)
        }
      }
    }
  }, [src])
  return status
}
