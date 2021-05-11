import groq from "groq";

export const siteSettings = groq`
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
        "route": coalesce(landingPageRoute->.slug.current, route)      
      }
    },
    footer->{
      ...,
      navMenu->{
        items[]{
          ...,
          "route": coalesce(landingPageRoute->.slug.current, route)
        }
      }
    }
  }
`
