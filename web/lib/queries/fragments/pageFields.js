export const pageFields = `
  ...,
  navMenu->{
    ...,
    items[]{
      ...,
      "route": landingPageRoute->.slug.current
    }
  },
  content[] {
    ...,
    _type == 'MiradorGallery' => @{
      ...,
      items[] {
        "manifest": coalesce(manifestRef->.subjectOfManifest, manifestUrl),
        canvasUrl,
      },
    },
    _type == 'SingleObject' => @{
      ...,
      item-> {
        "manifest": coalesce(subjectOfManifest, manifestUrl),
        canvasUrl,
      }
    }
    _type == 'Grid' => @{
      ...,
      items[] {
        ...,
        "route": landingPageRoute->.slug.current
      }
    }
  }
`
