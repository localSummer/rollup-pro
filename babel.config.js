module.exports = {
  presets: [[
    "@babel/preset-env",
    {
      "modules": false,
      "useBuiltIns": "usage",
      "corejs": "3.3.3",
      "targets": {
        "ie": 10
      }
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
    "@babel/plugin-transform-runtime" // 解决多个地方使用相同代码导致打包重复的问题
  ]
}