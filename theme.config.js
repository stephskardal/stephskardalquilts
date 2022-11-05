export default {
  titleSuffix: ' – Steph Skardal Quilts',
  logo: (
    <>
      <span className="mr-2 font-extrabold hidden md:inline">Steph Skardal Quilts</span>
      <span className="text-gray-600 font-normal hidden md:inline">
        Steph Skardal Quilts
      </span>
    </>
  ),
  head: (
    <>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="description" content="Steph Skardal Quilts" />
      <meta name="og:description" content="Steph Skardal Quilts" />
      <meta name="og:title" content="Steph Skardal Quilts" />
      <meta name="og:image" content="https://stephskardalquilts.com/images/logo.png" />
      <meta name="apple-mobile-web-app-title" content="Steph Skardal Quilts" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/favicon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <meta name="msapplication-TileImage" content="/favicon-144x144.png" />
    </>
  ),
  search: true,
  prevLinks: true,
  nextLinks: true,
  footer: true,
  footerText: <>MIT {new Date().getFullYear()} © Steph Skardal Quilts.</>,
  unstable_faviconGlyph: '👋',
}
