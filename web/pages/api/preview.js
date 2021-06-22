import { getPreviewHumanMadeObjectByID } from '../../lib/api'
import { publicDocumentTypes } from '../../lib/queries'

export default async function preview(req, res) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (
    req.query.secret !== process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Check if the post with the given `slug` exists
  const post = await getPreviewHumanMadeObjectByID(req.query.slug)
  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  /* Page is only for preview, so we add it to a new array with publicDocumentTypes */
  const types = ['Page', ...publicDocumentTypes]
  const id = post.slug?.current ?? post._id
  const path = types.includes(post._type) ? '/id/' : '/'

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `${path}${id}` })
  res.end()
}
