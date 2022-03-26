import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
// import sourcemaps from "rollup-plugin-sourcemaps";
import resolve from "@rollup/plugin-node-resolve";
import { defineConfig } from "rollup";
import rollupExternalModules from "rollup-external-modules";
import { terser } from "rollup-plugin-terser";
// import typescript from "@rollup/plugin-typescript";
import typescript from "rollup-plugin-ts";
const mybabelplugin = babel({
    sourcemap: true,
    plugins: ["@babel/plugin-proposal-optional-catch-binding"],
    presets: [
        [
            "@babel/preset-env",
            {
                targets: [
                    "last 1 edge version",
                    "last 1 safari version",
                    "last 1 chrome version",
                    "last 1 firefox version",
                ],
            },
        ],
    ],
});
const myterserplugin = terser({
    module: true,
    // sourcemap: true,
    toplevel: true,
    output: {
        comments: !1,
        ascii_only: !0,
    },
    compress: {
        toplevel: true,
        unused: true,
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log"],
    },
    mangle: true,
});
export default defineConfig([
    {
        external: rollupExternalModules,
        input: "./src/index.ts",
        output: [
            {
                file: "./dist/index.js",
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            typescript({ transpiler: "typescript" }),
            // typescript({ objectHashIgnoreUnknownHack: true }),
            // sourcemaps(),
            json(),
            resolve(),
            commonjs(),
            myterserplugin,
        ],
    },
    {
        external: rollupExternalModules,
        input: "./dist/index.js",
        output: [
            {
                file: "./dist/index.min.js",
                format: "esm",
                sourcemap: true,
            },
            {
                exports: "auto",
                file: "./dist/index.min.cjs",
                format: "cjs",
                sourcemap: true,
            },
        ],
        plugins: [
            mybabelplugin,
            // sourcemaps(),
            json(),
            resolve(),
            commonjs(),

            myterserplugin,
        ],
    },
]);
