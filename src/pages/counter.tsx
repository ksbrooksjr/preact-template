import { useCallback, useMemo } from 'preact/hooks'
import clientHydrate from '../utils/hydrate.js'
import { useLocation, useRoute } from 'wouter-preact'
import { h } from 'preact'
import { setup, css, styled } from 'goober'

setup(h)

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
    <div className={containerClass({ width: '10rem' })}>
      <Input readOnly value={numberCount} />
      <Button onClick={() => add(-1)}>Decrement</Button>
      <Button onClick={() => add(1)}>Increment</Button>
    </div>
  )
}

const Input = styled('input')`
  padding: 0.25rem;
`

const Button = styled('button')`
  cursor: pointer;
`

const containerClass = ({ width }: { width: string | number }) => css`
  display: flex;
  justify-content: space-between;
  width: ${width};
  & * {
    margin: 1rem;
  }
  & *:first-child {
    margin-left: 0;
  }
  & *:last-child {
    margin-right: 0;
  }
`

clientHydrate(Counter)
