export default function resolveProductionUrl(document) {

  const publicDocumentTypes = [
    'HumanMadeObject',
    'Actor',
    'Page',
    'Route'
  ]

  if(!publicDocumentTypes.includes(document._type)) {
    return null
  }

  const id = document._type === "Route" ? document.slug.current : document._id
  const url = process.env.NODE_ENV === "production"
      ? `https://exhibition-nansen.vercel.app/api/preview?slug=${id}&secret=${process.env.SANITY_STUDIO_PREVIEW_SECRET}`
      : `http://localhost:3000/api/preview?slug=${id}&secret=${process.env.SANITY_STUDIO_PREVIEW_SECRET}`;
  
  return url
}
