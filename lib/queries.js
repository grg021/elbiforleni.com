const eventFields = `
  _id,
  title,
  location,
  publishedAt,
  "slug": slug.current,
  "author": author->{name},
  "category": categories[0]->{title},
  _updatedAt,
  _createdAt
`

export const indexQuery = `
*[_type == "event"] | order(date desc, _updatedAt desc) {
  ${eventFields}
}`

export const eventQuery = `
{
  "events": *[_type == "event"] | order(publishedAt desc) {
    ${eventFields}
  },
  "futureEvents": *[_type == "event" && publishedAt > now()] | order(publishedAt desc) {
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
