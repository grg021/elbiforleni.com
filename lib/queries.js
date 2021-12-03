const eventFields = `
  _id,
  title,
  location,
  publishedAt,
  "slug": slug.current,
  "author": author->{name},
  _updatedAt,
  _createdAt
`

export const indexQuery = `
*[_type == "event"] | order(date desc, _updatedAt desc) {
  ${eventFields}
}`

export const eventQuery = `
{
  "event": *[_type == "event" && slug.current == $slug] | order(_updatedAt desc) | [0] {
    content,
    ${eventFields}
  },
  "moreEvents": *[_type == "event" && slug.current != $slug] | order(date desc, _updatedAt desc) | [0...2] {
    content,
    ${eventFields}
  }
}`

export const eventSlugsQuery = `
*[_type == "event" && defined(slug.current)][].slug.current
`

export const eventBySlugQuery = `
*[_type == "event" && slug.current == $slug][0] {
  ${eventFields}
}
`
