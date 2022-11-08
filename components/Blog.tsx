import ArticleListing from 'components/ArticleListing'

function Blog() {
  return (
    <ArticleListing title="On the Blog" articles={blogPosts} urlBase="blog/" />
  )
}

export default Blog

let blogPosts = [
  {
    title: 'Website Update: November 2022'
  },
  {
    title: 'Aurifil Artisan Challenge: April 2022'
  },
  {
    title: 'QuiltCon 2022: A Brief Recap'
  },
  { title: 'Coloring Sheets for Procreate' },
  { title: 'Aurifil Artisan Challenge: December 2021' },
  { title: 'Aurifil Artisan Challenge: November 2021' },
  { title: 'Aurifil Artisan Challenge: April 2021' },
  { title: 'QuiltCon 2021: Non-Trip Report' },
  { title: 'Aurifil Artisan Challenge: February 2021' },
  { title: 'Aurifil Artisan Challenge: November 2020' },
  { title: 'Aurifil Artisan Challenge: September 2020' },
  { title: 'Aurifil Artisan Challenge: August 2020' },
  { title: 'Step One: Don’t Be an Ass. Step Two: Make Quilts.' },
  { title: 'QuiltCon 2020: Trip Report', width: 768, height: 929 },
  { title: 'Aurifil Artisan Challenge: January 2020' },
  {
    title: 'Aurifil Artisan Challenge: December 2019',
    width: 2000,
    height: 1333
  },
  {
    title: 'Aurifil Artisan Challenge: November 2019',
    width: 2000,
    height: 1333
  },
  { title: 'Aurifil Artisan Challenge: September 2019' },
  { title: 'Aurifil Artisan Challenge: August 2019' },
  { title: 'Aurifil now in the Color Wheel' },
  { title: 'Quilt: May 2019: Pantone Challenge' },
  { title: 'Quilt: April 2019 (Chainmail Fish Scale)' },
  { title: 'QuiltCon 2019: Trip Report' },
  { title: 'Quilt: February 2019' },
  { title: 'basic color theory' },
  { title: 'Solids Sets Wordcloud', height: 640, width: 640 },
  { title: 'Donut Quilt: August 2018' },
  { title: 'How Long Did That Take You To Make' },
  { title: 'Quilt: August 2018' },
  {
    title: 'Working as an Independent Quilt Entrepreneuer',
    width: 1150,
    height: 529
  },
  { title: 'Quilt: June 2019' },
  { title: 'Skinny Strip Piecing: My Process' },
  { title: 'how do I do it all?' },
  { title: 'I Ran an Instagram Giveaway… And I Probably Won’t Do it Again' },
  { title: 'Mini Courthouse Step Blocks', width: 640, height: 323 },
  { title: 'Photoshop for Quilt Design', width: 640, height: 370 },
  { title: 'Skinny Courthouse Steps Block Tutorial', width: 640, height: 399 },
  { title: 'best in show at quiltcon 2018' },
  { title: 'Modern Quilts: Designs of the New Century' },
  { title: 'updated photos of recent finishes' }
]
