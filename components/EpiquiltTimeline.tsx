import * as React from 'react'
import TimelineEvents from 'components/TimelineEvents'

function EqpiquiltTimeline() {
  return <TimelineEvents timeline={timelineData} />
}

var timelineData = [
  {
    title:
      'March, 2016 – Present: Made a lot of 1″ strip pieced quilts (ongoing)',
    date: 'March 23, 2016',
    text: 'After making my first quilt with 1″ strips in early 2016, I continued to iterate on designs featuring 1″ strips. It is piecing that I feel very comfortable with.',
    image: 'epitimeline1.jpg',
    width: 1150,
    height: 848
  },
  {
    title: 'Nov, 2017: Experimentation with generative quilt design',
    date: 'November 1, 2017',
    text: 'I’m a big fan of Libs Elliott and her introduction of technology to quilting.I began experimenting with automated quilt design via JavaScript in late 2017, applying my ~10 years of experience as a web software engineer to quilting.The code driving my initial designs was different than Libs’ work, but I would classify the resulting quilts as a derivative of it.',
    image: 'epitimeline2.jpg',
    width: 640,
    height: 640
  },
  {
    title: 'Sept, 2018: Participated in the Michael Miller Challenge',
    date: 'September 1, 2018',
    text: 'I didn’t have much of structured plan for this quilt, other than to fill in strips(1 / 4″) in an improv style around a defined negative space created shape.Let’s just say I started the quilt not loving the fabric, but it grew on me as it came together.',
    image: 'epitimeline3.jpg',
    width: 1200,
    height: 960
  },
  {
    title: 'Oct, 2018: Purchased a longarm',
    date: 'October 1, 2018',
    text: 'And I proceeded to practice on said longarm with a few quilts.The longarm opened the door for me to work on larger quilts, as I had machine quilted all of my quilts on my domestic machine(s) up to this point(and only hired a longarmer once!).',
    image: 'epitimeline4.jpg',
    width: 298,
    height: 223
  },
  {
    title:
      'Oct, 2018: Merged technique of generative quilt design with Michael Miller improv quilt strategy',
    date: 'November 1, 2018',
    text: 'I wanted to figure out a way to mimic my strategy for my improv Michael Miller challenge quilt via code, and add in logic to introduce a color gradient working with a specific solids set.That’s what I did in this quilt, finished in October of 2018.',
    image: 'epitimeline5.jpg',
    width: 640,
    height: 799
  },
  {
    title: 'Feb, 2019: Combined negative space with generative code',
    date: 'December 1, 2018',
    text: 'Combining the generative algorithm with negative space(and experimenting with various ratios of said negative space), I created a design for this quilt suitable for longarm quilting.The quilt design measured 82″ x 82″ without a border.',
    image: 'epitimeline6.jpg',
    width: 750,
    height: 756
  }
]

export default EqpiquiltTimeline
