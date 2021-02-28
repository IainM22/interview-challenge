import { jsx } from 'theme-ui'

const Layout = ({ children, page }) => {
  return (
    <div>
      <header></header>

      <main>{children}</main>
      <style jsx global>{`
        // Defaults
        *,
        *:before,
        *:after,
        *:link,
        *:visited,
        *:active,
        *:focus,
        *:focus-within,
        *:checked,
        *:disabled {
          box-sizing: border-box;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden !important;
          background: url('/images/Background@2x.jpg') no-repeat;
        }
        ul,
        ol,
        li {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        img {
          max-width: 100%;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        a,
        button,
        [type='button'],
        [type='reset'],
        [type='submit'] {
          text-transform: none;
          appearance: none;
          cursor: pointer;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
          margin-top: 0;
        }
        img,
        svg,
        picture,
        span,
        b,
        u,
        i,
        small,
        sub,
        strong,
        label {
          display: inline-block;
        }
        table,
        thead,
        tbody,
        tfoot,
        tr,
        td,
        th {
          border-spacing: 0;
          border-collapse: collapse;
          text-align: left;
        }
        table {
          width: 100%;
        }
      `}</style>
      <style jsx global>{`
        html {
        }
        body {
          overflow: auto;
          scroll-behavior: smooth;
        }
        .layout {
          max-width: 1260px;
          margin: auto;
          padding: 0 20px;
          position: relative;
        }

        div::selection,
        p::selection,
        h1::selection {
        }
      `}</style>
    </div>
  )
}

export default Layout
