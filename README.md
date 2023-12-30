# Readme

To use this template, simply clone the repo, run `npm ci --ignore-scripts`, and then run `npm run dev` to start the server in development mode, or `npm start` to start the server in production mode.

# Analyzing the client build

```bash
npx esbuild src/pages/counter.tsx \
--bundle \
--minify \
--analyze \
--define:IS_DEV=false
```

# Listing the dependencies

The sed and grep commands are used to remove the leading `$PWD/node_modules/` from the output. NPM ls lists your project itself as a dependency, and this filters this that first line out as well.

```bash
npm ls --all --parseable | sed -E -e "s|$PWD(/node_modules)?/?||" | grep -E '[^\s]+'
```

## Listing the production dependencies

```bash
npm ls --all --omit dev --parseable | sed -E -e "s|$PWD(/node_modules)?/?||" | grep -E '[^\s]+'
```
