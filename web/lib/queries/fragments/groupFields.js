import {activityStreamFields} from './activityStreamFields'

export const groupFields = `
  _id,
  _type,
  label,
  hasType[]->{
    ...
  },
  image {
    ...
  },
  referredToBy[] {
    ...
  },
  activityStream[]{
    ${activityStreamFields}
  },
  "hasMember": *[_type in ["Actor", "Group"] && references(^._id)]{ 
    _id,
    _type,
    label
  },
  "mentionedIn": *[_type in ["HumanMadeObject"] && references(^._id)]{ 
    _id,
    _type,
    label,
    preferredIdentifier,
    hasType[]->{
      _id,
      label
    },
    image,
    "description": referredToBy[]{
      ...
    },
    hasCurrentOwner[0]->{
      _id,
      label,
      image
    },
    "creation": activityStream[]{
      _type in ["Production", "BeginningOfExistence"] => ^{
        "creators": contributionAssignedBy[]{
          "name": assignedActor->.label,
        	"_id": assignedActor->._id
        },
				timespan
      }
    },
    "aspectRatio": image.asset->.metadata.dimensions.aspectRatio,
  }
`
