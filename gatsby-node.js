exports.onCreatePage = ({ page, actions }) => {
  if (page.path.match(/^\/sala/)) {
    page.matchPath = "/sala/*"
    actions.createPage(page)
  }
}
