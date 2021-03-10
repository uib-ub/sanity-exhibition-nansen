export const siteSettings = `
  "siteSettings": *[_id == "site-settings"][0] {
    ...,
    mainNavigation->{
      items[]{
        ...,
        "route": landingPageRoute->.slug.current
      }
    },
    footer->{
      ...,
      navMenu->
    }
  }
`
