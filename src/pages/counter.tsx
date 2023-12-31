import { useCallback, useMemo } from 'preact/hooks'
import clientHydrate from '../utils/hydrate.js'
import { useLocation, useRoute } from 'wouter-preact'

export default function Counter() {
  const [, params] = useRoute('/counter/:currentCount')
  const [, setLocation] = useLocation()
  const numberCount = useMemo(
    () => (params?.currentCount ? Number(params.currentCount) : 0),
    [params]
  )
  const add = useCallback(
    (n: number) => setLocation(`/counter/${numberCount + n}`),
    [setLocation, numberCount]
  )
  return (
    <div className='wrapper'>
      <input readOnly value={numberCount} />
      <button onClick={() => add(-1)}>Decrement</button>
      <button onClick={() => add(1)}>Increment</button>
    </div>
  )
}

clientHydrate(Counter)
