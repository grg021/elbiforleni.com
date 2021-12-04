const eventFields = `
  _id,
  title,
  location,
  publishedAt,
  "slug": slug.current,
  "author": author->{name,contact},
  "category": categories[0]->{title},
  _updatedAt,
  _createdAt
`

const postFields = `
  _id,
  title,
  body,
  mainImage,
  publishedAt,
  "slug": slug.current,
  "author": author->{name,contact},
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
  "futureEvents": *[_type == "event" && publishedAt > now()] | order(publishedAt asc) {
    ${eventFields}
  },
  "posts": *[_type == "post"][0..3] | order(publishedAt asc) {
    ${postFields}
  },
}`

export const eventSlugsQuery = `
*[_type == "event" && defined(slug.current)][].slug.current
`

export const eventBySlugQuery = `
*[_type == "event" && slug.current == $slug][0] {
  ${postFields}
}
`

export const postSlugsQuery = `
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`