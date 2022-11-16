import ArticleListing from 'components/ArticleListing'

function Tools() {
  return <ArticleListing title="Tools" articles={toolPosts} urlBase="tools/" />
}

export default Tools

let toolPosts = [
  //{
  //  title: 'Battleship',
  //  width: 300,
  //  height: 250
  //},
  {
    title: 'Pantone Color Match',
    width: 1978,
    height: 978
  },
  {
    title: 'Digital Swatches for Procreate',
    width: 313,
    height: 241
  },
  {
    title: 'Color Palette Tool',
    width: 313,
    height: 169
  },
  {
    title: 'Digital Swatchy Tool',
    width: 313,
    height: 241
  },
  {
    title: 'Color Wheel: Harmony',
    width: 400,
    height: 400
  },
  {
    title: 'Color Wheel: Fabric and Color Distribution',
    width: 486,
    height: 400
  },
  {
    title: 'Solids Visualization: Hue x Saturation',
    width: 313,
    height: 154
  },
  {
    title: 'Solids Library: Now on Github',
    width: 313,
    height: 140
  },
  {
    title: 'Randomize All the Triangles',
    width: 313,
    height: 241
  }
]
