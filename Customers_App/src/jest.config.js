module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.css$": "jest-transform-css"
  },
  testEnvironment: 'jsdom'
};
