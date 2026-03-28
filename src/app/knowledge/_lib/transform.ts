'use client'

const REMOTE_PACKAGE_VERSIONS = {
  'framer-motion': '10.16.4',
  'lucide-react': '0.542.0'
} as const

const SUPPORTED_BARE_IMPORTS = new Set([
  'react',
  'react-dom',
  'react-dom/client',
  'react/jsx-runtime',
  'react/jsx-dev-runtime',
  ...Object.keys(REMOTE_PACKAGE_VERSIONS)
])

const IMPORT_RE = /(?:import|export)\s+(?:[^'";]+?\s+from\s+)?["']([^"']+)["']/g

// Use globalThis to survive HMR module re-evaluation in dev mode.
// In production modules are evaluated once so this is a no-op.
declare const globalThis: { __esbuildInitPromise?: Promise<void> }

async function initEsbuild() {
  if (!globalThis.__esbuildInitPromise) {
    // Assign synchronously before any await so concurrent callers
    // (e.g. React 18 StrictMode double-effect) share the same promise
    // instead of each racing to call initialize().
    globalThis.__esbuildInitPromise = import('esbuild-wasm').then((esbuild) =>
      esbuild.initialize({
        wasmURL: 'https://cdn.jsdelivr.net/npm/esbuild-wasm@0.27.4/bin/esbuild.wasm',
        worker: true
      })
    )
  }
  await globalThis.__esbuildInitPromise
}

function detectUnsupportedImports(code: string) {
  const unsupported = new Set<string>()

  for (const match of code.matchAll(IMPORT_RE)) {
    const specifier = match[1]

    if (
      specifier.startsWith('.') ||
      specifier.startsWith('/') ||
      specifier.startsWith('http://') ||
      specifier.startsWith('https://')
    ) {
      continue
    }

    if (!SUPPORTED_BARE_IMPORTS.has(specifier)) {
      unsupported.add(specifier)
    }
  }

  if (unsupported.size > 0) {
    throw new Error(
      `Unsupported imports: ${Array.from(unsupported).join(', ')}. Supported packages in JSX mode: react, framer-motion, lucide-react.`
    )
  }
}

function preprocessJSX(code: string): { code: string; name: string } {
  let processed = code
  let name = '__App__'

  const fnMatch = code.match(/export\s+default\s+function\s+(\w+)/)
  const clsMatch = code.match(/export\s+default\s+class\s+(\w+)/)

  if (fnMatch) {
    name = fnMatch[1]
    processed = processed.replace(
      /export\s+default\s+function\s+(\w+)/,
      'function $1'
    )
  } else if (clsMatch) {
    name = clsMatch[1]
    processed = processed.replace(
      /export\s+default\s+class\s+(\w+)/,
      'class $1'
    )
  } else {
    const arrowMatch = code.match(
      /(?:export\s+default\s+)?(?:const|let|var)\s+(\w+)\s*=.*?(?:=>|\bfunction\b)/s
    )
    if (arrowMatch) {
      name = arrowMatch[1]
      processed = processed.replace(/export\s+default\s+/, '')
    } else {
      const idMatch = code.match(/export\s+default\s+(\w+)/)
      if (idMatch) {
        name = idMatch[1]
        processed = processed.replace(
          /export\s+default\s+(\w+)/,
          'const __PlaygroundDefault__ = $1'
        )
        name = '__PlaygroundDefault__'
      }
    }
  }

  processed += `

const __playgroundRoot = document.getElementById('root');
if (!__playgroundRoot) {
  throw new Error('Preview root element was not found.');
}
ReactDOM.createRoot(__playgroundRoot).render(React.createElement(${name}, null));
`

  return { code: processed, name }
}

function buildRemoteUrl(specifier: keyof typeof REMOTE_PACKAGE_VERSIONS) {
  const version = REMOTE_PACKAGE_VERSIONS[specifier]
  return `https://esm.sh/${specifier}@${version}?bundle&target=es2018&external=react,react-dom`
}

function createEsbuildPlugins(esbuild: Awaited<typeof import('esbuild-wasm')>) {
  return [
    {
      name: 'playground-imports',
      setup(build: any) {
        build.onResolve({ filter: /^react$/ }, () => ({
          path: 'react',
          namespace: 'playground-shim'
        }))
        build.onResolve({ filter: /^react-dom$/ }, () => ({
          path: 'react-dom',
          namespace: 'playground-shim'
        }))
        build.onResolve({ filter: /^react-dom\/client$/ }, () => ({
          path: 'react-dom/client',
          namespace: 'playground-shim'
        }))
        build.onResolve({ filter: /^react\/jsx-runtime$/ }, () => ({
          path: 'react/jsx-runtime',
          namespace: 'playground-shim'
        }))
        build.onResolve({ filter: /^react\/jsx-dev-runtime$/ }, () => ({
          path: 'react/jsx-dev-runtime',
          namespace: 'playground-shim'
        }))

        build.onResolve(
          { filter: /^(framer-motion|lucide-react)$/ },
          (args: any) => ({
            path: buildRemoteUrl(args.path),
            namespace: 'http-url'
          })
        )

        build.onResolve({ filter: /^https?:\/\// }, (args: any) => ({
          path: args.path,
          namespace: 'http-url'
        }))

        build.onResolve({ filter: /^\/+.+/ }, (args: any) => {
          if (
            !args.importer.startsWith('http://') &&
            !args.importer.startsWith('https://')
          ) {
            return null
          }
          return {
            path: new URL(args.path, args.importer).toString(),
            namespace: 'http-url'
          }
        })

        build.onResolve(
          { filter: /^\.?\.?\//, namespace: 'http-url' },
          (args: any) => ({
            path: new URL(args.path, args.importer).toString(),
            namespace: 'http-url'
          })
        )

        build.onLoad(
          { filter: /.*/, namespace: 'playground-shim' },
          (args: any) => {
            switch (args.path) {
              case 'react':
                return {
                  contents: `
                  const React = window.React;
                  export default React;
                  export const Fragment = React.Fragment;
                  export const createElement = React.createElement;
                  export const cloneElement = React.cloneElement;
                  export const createContext = React.createContext;
                  export const createRef = React.createRef;
                  export const isValidElement = React.isValidElement;
                  export const Children = React.Children;
                  export const Component = React.Component;
                  export const PureComponent = React.PureComponent;
                  export const StrictMode = React.StrictMode;
                  export const Suspense = React.Suspense;
                  export const forwardRef = React.forwardRef;
                  export const memo = React.memo;
                  export const lazy = React.lazy;
                  export const startTransition = React.startTransition;
                  export const useCallback = React.useCallback;
                  export const useContext = React.useContext;
                  export const useDebugValue = React.useDebugValue;
                  export const useDeferredValue = React.useDeferredValue;
                  export const useEffect = React.useEffect;
                  export const useId = React.useId;
                  export const useImperativeHandle = React.useImperativeHandle;
                  export const useInsertionEffect = React.useInsertionEffect;
                  export const useLayoutEffect = React.useLayoutEffect;
                  export const useMemo = React.useMemo;
                  export const useReducer = React.useReducer;
                  export const useRef = React.useRef;
                  export const useState = React.useState;
                  export const useSyncExternalStore = React.useSyncExternalStore;
                  export const useTransition = React.useTransition;
                  export const version = React.version;
                `,
                  loader: 'js'
                }
              case 'react-dom':
              case 'react-dom/client':
                return {
                  contents: `
                  const ReactDOM = window.ReactDOM;
                  export default ReactDOM;
                  export const createRoot = ReactDOM.createRoot;
                  export const hydrateRoot = ReactDOM.hydrateRoot;
                  export const flushSync = ReactDOM.flushSync;
                `,
                  loader: 'js'
                }
              case 'react/jsx-runtime':
              case 'react/jsx-dev-runtime':
                return {
                  contents: `
                  const React = window.React;
                  export const Fragment = React.Fragment;
                  export function jsx(type, props, key) {
                    return React.createElement(type, { ...props, key });
                  }
                  export const jsxs = jsx;
                  export const jsxDEV = jsx;
                `,
                  loader: 'js'
                }
              default:
                return null
            }
          }
        )

        build.onLoad(
          { filter: /.*/, namespace: 'http-url' },
          async (args: any) => {
            const response = await fetch(args.path)
            if (!response.ok) {
              throw new Error(
                `Failed to load ${args.path} (${response.status})`
              )
            }

            const contents = await response.text()
            const loader = args.path.includes('.json')
              ? 'json'
              : args.path.match(/\.(tsx|ts)(?:\?|$)/)
                ? 'ts'
                : args.path.match(/\.(jsx|js|mjs)(?:\?|$)/)
                  ? 'js'
                  : 'js'

            return {
              contents,
              loader,
              resolveDir: new URL('./', args.path).toString()
            }
          }
        )
      }
    }
  ] satisfies esbuild.Plugin[]
}

export async function transformJSX(rawCode: string): Promise<string> {
  detectUnsupportedImports(rawCode)
  await initEsbuild()
  const esbuild = await import('esbuild-wasm')
  const { code } = preprocessJSX(rawCode)
  const result = await esbuild.build({
    bundle: true,
    write: false,
    format: 'iife',
    platform: 'browser',
    target: ['es2018'],
    jsx: 'transform',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    stdin: {
      contents: code,
      loader: 'tsx',
      sourcefile: 'playground-entry.tsx',
      resolveDir: '/'
    },
    plugins: createEsbuildPlugins(esbuild),
    define: {
      'process.env.NODE_ENV': '"production"'
    }
  })

  return result.outputFiles[0].text
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
