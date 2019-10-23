module.exports = {
  presets: [[
    "@babel/preset-env",
    {
      useBuiltIns: "usage"
    }
  ], "@babel/preset-react"],
  plugins: [
    [
      "@babel/plugin-transform-classes",
      {
        "loose": true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties", 
      { "loose": true }
    ],
    [
      "@babel/plugin-proposal-object-rest-spread",
      { "useBuiltIns": true }
    ],
    "@babel/plugin-transform-react-jsx",
    [
      "@babel/plugin-transform-runtime",
      {
        "helpers": true,
        // "polyfill": false,
        "regenerator": true,
        "absoluteRuntime": "@babel/runtime"
      }
    ]
  ]
}