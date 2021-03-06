const eventFields = `
  _id,
  title,
  location,
  publishedAt,
  exactLocation,
  preEventUrl,
  postEventUrl,
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

const memberFields = `
  _id,
  name,
  barangay,
  "slug": slug.current,
  _updatedAt,
  _createdAt
`

export const indexQuery = `
*[_type == "event"] | order(date desc, _updatedAt desc) {
  ${eventFields}
}`

export const eventQuery = `
{
  "events": *[_type == "event"] | order(publishedAt asc) {
    ${eventFields}
  },
  "posts": *[_type == "post"] | order(publishedAt desc) {
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

export const memberQuery = `
{
  "members": *[_type == "member"] | order(publishedAt asc) {
    ${memberFields}
  },
}`

export const memberBySlugQuery = `
*[_type == "member" && slug.current == $slug][0] {
  ${memberFields}
}
`

export const memberSlugsQuery = `
*[_type == "member" && defined(slug.current)][].slug.current
`
