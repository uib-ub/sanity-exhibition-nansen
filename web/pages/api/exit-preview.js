const basePath = process.env.NEXT_PUBLIC_BASE_PATH

export default async function exit(_, res) {
  // Exit the current user from "Preview Mode". This function accepts no args.
  res.clearPreviewData()

  // Redirect the user back to the index page.
  res.writeHead(307, { Location: basePath })
  res.end()
}
