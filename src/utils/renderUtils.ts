export const html = ({
  title,
  description,
  scriptName,
  html,
  initialState = {},
  scriptId = '__INITIAL_DATA__',
}: Required<Record<'title' | 'description' | 'scriptName' | 'html', string>> & {
  scriptId?: string
  initialState?: unknown
}) =>
  `
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta
      name="description"
      content="${description}" />
    <meta name="author" content="Keith Brooks" />
    <style type="text/css">
      .wrapper {
        display: flex;
        justify-content: space-between;
        width: 10rem;
      }
    </style>
    <script id="${scriptId}" type="application/json">${escapeJson(
    JSON.stringify(initialState ?? {})
  )}</script>
  </head>
  <body>
    <div id="root">${html}</div>
    <script src="/public/${scriptName}"></script>
  </body>
</html>
`.trim()

/**
 * This utility is based on https://github.com/vercel/next.js/blob/9bcf678e646fea8340a8d9c72094c6c624d71668/packages/next/server/htmlescape.ts#L14
 */
function escapeJson(s: string) {
  return s
    .replaceAll('&', '\\u0026')
    .replaceAll('>', '\\u003e')
    .replaceAll('<', '\\u003c')
    .replaceAll('\u2028', '\\u2028')
    .replaceAll('\u2029', '\\u2029')
}
