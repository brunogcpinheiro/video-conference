import React from "react"
import { Link } from "gatsby"

import "./styles.css"

const Layout = ({ children }) => (
  <>
    <header>
      <Link to="/">Vídeo Conferência</Link>
    </header>
    <main>{children}</main>
  </>
)

export default Layout
