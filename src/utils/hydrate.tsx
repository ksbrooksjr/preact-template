import { hydrate, render, ComponentType } from 'preact'

declare global {
  interface Window {
    LIVE_RELOAD?: boolean
  }
}

const LIVE_RELOAD = window.LIVE_RELOAD ?? false

if (LIVE_RELOAD) {
  new EventSource('/esbuild').addEventListener('change', () =>
    location.reload()
  )
}

export default function clientHydrate<T>(
  Component: ComponentType<T>,
  propsId = '__INITIAL_DATA__'
) {
  if ('location' in globalThis) {
    const propsElement = document.getElementById(propsId)
    const props = LIVE_RELOAD
      ? {}
      : JSON.parse(propsElement!.textContent ?? '{}')

    const renderFn = LIVE_RELOAD ? render : hydrate
    renderFn(
      <Component {...props} />,
      document.getElementById('root') as HTMLElement
    )
  }
}
