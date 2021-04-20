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
export const activityStreamFields = `
{
  ...,
  timespan[]{
    ...,
    "orderDate": coalesce(date, beginOfTheBegin)
  },
  tookPlaceAt[]->{
    _id,
    label
  },
  _type == "Birth" => {
    "broughtIntoLife": ^{
      _id,
      label,
    },
  },
  _type == "Death" => {
    "deathOf": ^{
      _id,
      label,
    },
  },
  _type == "Joining" => {
    "joined": ^{
      _id,
      label,
    },
    joinedWith->{
      _id,
      label
    }
  },
  _type == "Leaving" => {
    "separated": ^{
      _id,
      label
    },
    separatedFrom->{
      _id,
      label
    }
  }
}
`