import { useEffect, useRef } from 'react'
import loadMayan from '../src/pages/loadMayan'

export default function Widget() {
  const mayan = useRef();
  useEffect(() => {
    (async function() {
      const mayanInstance = await loadMayan()
      mayan.current = mayanInstance
      const config = {
        appIdentity: {
          name: 'My Project',
          icon: './logo.png',
          uri: 'https://myproject.io',
        }
      }
      mayan.current.init('mayanContainer', config)
    })()
    return () => {
      if (mayan.current && mayan.current.destroy) {
        mayan.current.destroy()
      }
    }
  }, [])

  return (
    <div>
      <div id="mayanContainer"/>
    </div>
  )
}
