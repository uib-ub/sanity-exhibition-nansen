import Sections from '../Sections/Sections'

/* Used for preview */
export default function Page(data) {
  return (
    <>
      {data.content && <Sections sections={data.content} />}
    </>
  )
}
