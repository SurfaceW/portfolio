'use client'

let esbuildInitPromise: Promise<void> | null = null

async function initEsbuild() {
  if (!esbuildInitPromise) {
    const esbuild = await import('esbuild-wasm')
    esbuildInitPromise = esbuild.initialize({
      wasmURL: '/esbuild.wasm',
      worker: true,
    })
  }
  await esbuildInitPromise
}

function preprocessJSX(code: string): { code: string; name: string } {
  let processed = code
  let name = '__App__'

  const fnMatch = code.match(/export\s+default\s+function\s+(\w+)/)
  const clsMatch = code.match(/export\s+default\s+class\s+(\w+)/)

  if (fnMatch) {
    name = fnMatch[1]
    processed = processed.replace(/export\s+default\s+function\s+(\w+)/, 'function $1')
  } else if (clsMatch) {
    name = clsMatch[1]
    processed = processed.replace(/export\s+default\s+class\s+(\w+)/, 'class $1')
  } else {
    const arrowMatch = code.match(/(?:export\s+default\s+)?(?:const|let)\s+(\w+)\s*=.*?(?:=>|\bfunction\b)/)
    if (arrowMatch) {
      name = arrowMatch[1]
      processed = processed.replace(/export\s+default\s+/, '')
    } else {
      const idMatch = code.match(/export\s+default\s+(\w+)/)
      if (idMatch) {
        name = idMatch[1]
        processed = processed.replace(/export\s+default\s+\w+/, '')
      }
    }
  }

  processed += `\n\nReactDOM.createRoot(document.getElementById('root')).render(React.createElement(${name}, null));\n`
  return { code: processed, name }
}

export async function transformJSX(rawCode: string): Promise<string> {
  await initEsbuild()
  const esbuild = await import('esbuild-wasm')
  const { code } = preprocessJSX(rawCode)
  const result = await esbuild.transform(code, {
    loader: 'jsx',
    jsx: 'transform',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    target: 'es2017',
  })
  return result.code
}

export function buildHTMLDoc(html: string): string {
  const trimmed = html.trim()
  if (/^<!doctype|^<html/i.test(trimmed)) return html
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>${html}</body></html>`
}

export function buildJSXDoc(transformedCode: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
</head>
<body>
  <div id="root"></div>
  <script>
${transformedCode}
  </script>
</body>
</html>`
}
