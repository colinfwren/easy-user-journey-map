import * as esbuild from 'esbuild'

await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/index.js',
    platform: 'node',
    moduleResolution: 'nodenext',
    format: 'cjs',
    target: ['node18'],
    packages: 'external',
    esModuleInterop: true
})