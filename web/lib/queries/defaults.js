export const siteSettings = `
  "siteSettings": *[_id == "site-settings"][0] {
    ...,
    publisher[]->{
      _id,
      label,
      image
    },
    mainNavigation->{
      items[]{
        ...,
        "route": landingPageRoute->.slug.current
      }
    },
    footer->{
      ...,
      navMenu->{
        items[]{
          ...,
          "route": landingPageRoute->.slug.current
        }
      }
    }
  }
`
