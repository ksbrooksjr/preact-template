import { hydrate, ComponentType } from 'preact'

export default function clientHydrate<T>(
  Component: ComponentType<T>,
  propsId = '__INITIAL_DATA__'
) {
  if ('location' in globalThis) {
    const propsElement = document.getElementById(propsId)
    const props = JSON.parse(propsElement!.textContent ?? '{}')
    hydrate(
      <Component {...props} />,
      document.getElementById('root') as HTMLElement
    )
  }
}
