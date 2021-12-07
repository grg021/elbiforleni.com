export default {
    name: 'business',
    title: 'Business',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Business Name',
        type: 'string'
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96
        }
      },
      {
        name: 'contact',
        title: 'Business Contact Number',
        type: 'string'
      },
      {
        name: 'adresss',
        title: 'Business Address',
        type: 'string'
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true
        }
      },
      {
        name: 'type',
        title: 'Business Type',
        type: 'array',
        of: [{type: 'reference', to: {type: 'businessType'}}]
      },
      {
        name: 'specialty',
        title: 'Specialty',
        type: 'string'
      },
      {
        name: 'onlinePage',
        title: 'Online Page',
        type: 'url'
      },
      {
        name: 'location',
        title: 'Location',
        type: 'geopoint'
      },
      {
        name: 'owner',
        title: 'Owner',
        type: 'string'
      },
      {
        name: 'ownerContact',
        title: 'Owner Contact Info',
        type: 'string'
      },
      {
        name: 'allowContact',
        title: 'Can be contacted',
        type: 'boolean'
      },
    ],
    preview: {
      select: {
        title: 'name',
        media: 'image'
      }
    }
  }