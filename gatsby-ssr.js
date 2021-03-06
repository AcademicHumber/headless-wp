const React = require("react")
const Layout = require("./src/components/layout").default
const GlobalStyles = require("./src/styles/index").GlobalStyles
const MainProvider = require("./src/context/main-context").MainProvider

exports.wrapRootElement = ({ element }) => (
  <>
    <MainProvider>
      <GlobalStyles />
      <Layout>{element}</Layout>
    </MainProvider>
  </>
)
