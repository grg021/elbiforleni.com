import client from '../../client'
import groq from 'groq'

const Event = ({event}) => {

  const { title = 'Missing title', name = 'Missing name', categories, location } = event
  console.log(location)
  return (
    <article>
      <h1 className={'text-3xl'}>{title}</h1>
      <span className={'text-sm text-gray-400'}>By {name}</span>
      {categories && (
        <ul>
          Posted in
          {categories.map(category => <li key={category}>{category}</li>)}
        </ul>
      )}
    </article>
  )
}

const query = groq`*[_type == "event" && slug.current == $slug][0]{
  title,
  location,
  "name": author->name,
  "categories": categories[]->title
}`

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "event" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug) => ({params: {slug}})),
    fallback: true,
  }
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params
  const event = await client.fetch(query, { slug })
  return {
    props: {
      event
    }
  }
}

export default Event