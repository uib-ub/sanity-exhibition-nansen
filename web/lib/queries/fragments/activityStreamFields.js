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
  _type == "reference" => @->{
    ...
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
