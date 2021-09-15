import { publicDocumentTypes } from "../publicDocumentTypes"

// Any random string, must match SANITY_PREVIEW_SECRET in the Next.js .env.local file
const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET

const basePath = `/exhibition/nansen-og-bergenserne`
const remoteUrl = `https://exhibition-nansen.vercel.app`
const localUrl = `http://localhost:3000`

export default function resolveProductionUrl(doc) {
  const baseUrl = window.location.hostname === 'localhost' ? localUrl : remoteUrl

  const previewUrl = new URL(baseUrl)
  const checkType = ["Route", ...publicDocumentTypes]

  if (!checkType.includes(doc._type)) {
    return null
  }

  previewUrl.pathname = `${basePath}/api/preview`
  previewUrl.searchParams.append(`secret`, previewSecret)
  previewUrl.searchParams.append(`slug`, doc._type === "Route" ? doc?.slug?.current : `id/${doc._id}` ?? `/`)

  return previewUrl.toString()
}
