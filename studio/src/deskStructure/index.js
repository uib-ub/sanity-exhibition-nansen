import S from '@sanity/desk-tool/structure-builder'
import {FaGlasses, FaMapMarkedAlt} from 'react-icons/fa'
import {GiBoltSpellCast} from 'react-icons/gi'
import {TiGroup, TiUser} from 'react-icons/ti'
import {BsFileRichtext} from 'react-icons/bs'
import {FcTimeline} from 'react-icons/fc'
import {MdEvent} from 'react-icons/md'
import blog from './blog'
import pageBuilder from './pageBuilder'
import types from './types'
import management from './management'
import humanMadeObject from './humanMadeObject'
import React from 'react'
import {Spinner, Container, Box} from '@sanity/ui'
import Preview from 'part:@sanity/base/preview'
import QueryContainer from 'part:@sanity/base/query-container';
import schema from 'part:@sanity/base/schema';

const hiddenDocTypes = (listItem) =>
  ![
    'HumanMadeObject',
    'Collection',
    'Actor',
    'Group',
    'Period',
    'Event',
    'Activity',
    'LinguisticObject',
    'Report',
    'Acquisition',
    'Move',
    'DesignOrProcedure',
    'Timeline',
    'Exhibition',
    'Project',
    'SiteSettings',
    'Place',
    'SystemCategory',
    'Concept',
    'Material',
    'Work',
    'VisualItem',
    'Language',
    'ObjectType',
    'PlaceType',
    'EventType',
    'ExhibitionType',
    'ActorType',
    'GroupType',
    'TextType',
    'WorkType',
    'Technique',
    'StorageType',
    'SectionType',
    'ReportType',
    'MeasurementUnit',
    'IdentifierType',
    'DimensionType',
    'ConditionType',
    'ActivityType',
    'AcquisitionType',
    'AppelationType',
    'Role',
    'NavigationMenu',
    'navigationItem',
    'Alert',
    'Page',
    'Post',
    'Route',
    'Toc',
    'Storage',
    'LinguisticDocument',
    'media.tag',
  ].includes(listItem.getId())



const Incoming = ({ document }) => (
  <Container>
    <Box padding={[3, 3, 4, 5]}>
      <QueryContainer
        query="*[references($id)]"
        params={{ id: document.displayed._id }}
      >
        {({ result, loading }) =>
          loading ? (
            <Spinner center message="Loading items…" />
          ) : (
            result && (
              <div>
                {result.documents.map(document => (
                  <Box padding="2" key={document._id}>
                    <Preview value={document} type={schema.get(document._type)} />
                  </Box>
                ))}
              </div>
            )
          )
        }
      </QueryContainer>
    </Box>
  </Container>
);

export const getDefaultDocumentNode = () => {
  // Give all documents the JSON preview, 
  // as well as the default form view
  return S.document().views([
    S.view.form(),
    S.view.component(Incoming).title('Innkommende')
  ])
}


export default () =>
  S.list()
    .title('Innhold')
    .items([
      pageBuilder,
      S.divider(),
      humanMadeObject,
      S.listItem()
        .title('Utstillinger')
        .icon(FaGlasses)
        .child(
          S.list()
            .title('Utstillinger')
            .items([
              S.listItem()
                .title('Utstillinger etter type')
                .icon(FaGlasses)
                .child(
                  // List out all categories
                  S.documentTypeList('ExhibitionType')
                    .title('Utstillinger etter type')
                    .filter('_type == "ExhibitionType"')
                    .child((catId) =>
                      // List out project documents where the _id for the selected
                      // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('Exhibition')
                        .title('Utstillinger')
                        .filter('_type == "Exhibition" && $catId in hasType[]._ref')
                        .params({catId}),
                    ),
                ),
              S.listItem().title('Upubliserte utstillinger').icon(FaGlasses).child(
                // List out all categories
                S.documentTypeList('Exhibition')
                  .title('Upubliserte utstillinger')
                  .filter('_type == "Exhibition" && accessState == "secret"'),
              ),
              S.listItem().title('Til gjennomgang').icon(FaGlasses).child(
                // List out all categories
                S.documentTypeList('Exhibition')
                  .title('Til gjennomgang')
                  .filter('_type == "Exhibition" && editorialState == "review"'),
              ),
              S.listItem()
                .title('Alle utstillinger')
                .icon(FaGlasses)
                .child(S.documentTypeList('Exhibition').title('Alle utstillinger')),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Aktører')
        .icon(TiUser)
        .child(
          S.list()
            .title('Aktører')
            .items([
              S.listItem()
                .title('Aktører etter type')
                .icon(TiUser)
                .child(
                  // List out all categories
                  S.documentTypeList('ActorType')
                    .title('Aktører etter type')
                    .filter('_type == "ActorType"')
                    .child((catId) =>
                      // List out project documents where the _id for the selected
                      // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('Actor')
                        .title('Aktører')
                        .filter('_type == "Actor" && $catId in hasType[]._ref')
                        .params({catId}),
                    ),
                ),
              S.listItem().title('Upubliserte poster').icon(TiUser).child(
                // List out all categories
                S.documentTypeList('Actor')
                  .title('Upubliserte objekter')
                  .filter('_type == "Actor" && accessState == "secret"'),
              ),
              S.listItem().title('Til gjennomgang').icon(TiUser).child(
                // List out all categories
                S.documentTypeList('Actor')
                  .title('Til gjennomgang')
                  .filter('_type == "Actor" && editorialState == "review"'),
              ),
              S.listItem()
                .title('Alle Aktører')
                .icon(TiUser)
                .child(S.documentTypeList('Actor').title('Alle Aktører')),
            ]),
        ),
      S.listItem()
        .title('Grupper')
        .icon(TiGroup)
        .child(
          S.list()
            .title('Grupper')
            .items([
              S.listItem()
                .title('Grupper etter type')
                .icon(TiGroup)
                .child(
                  // List out all categories
                  S.documentTypeList('GroupType')
                    .title('Grupper etter type')
                    .filter('_type == "GroupType"')
                    .child((catId) =>
                      // List out project documents where the _id for the selected
                      // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('Group')
                        .title('Grupper')
                        .filter('_type == "Group" && $catId in hasType[]._ref')
                        .params({catId}),
                    ),
                ),
              S.listItem().title('Upubliserte grupper').icon(TiGroup).child(
                // List out all categories
                S.documentTypeList('Group')
                  .title('Upubliserte grupper')
                  .filter('_type == "Group" && accessState == "secret"'),
              ),
              S.listItem().title('Til gjennomgang').icon(TiGroup).child(
                // List out all categories
                S.documentTypeList('Group')
                  .title('Til gjennomgang')
                  .filter('_type == "Group" && editorialState == "review"'),
              ),
              S.listItem()
                .title('Alle grupper')
                .icon(TiGroup)
                .child(S.documentTypeList('Group').title('Alle grupper')),
            ]),
        ),
      S.listItem()
        .title('Steder')
        .icon(FaMapMarkedAlt)
        .child(
          S.list()
            .title('Steder')
            .items([
              S.listItem()
                .title('Steder etter type')
                .icon(FaMapMarkedAlt)
                .child(
                  // List out all categories
                  S.documentTypeList('PlaceType')
                    .title('Steder etter type')
                    .filter('_type == "PlaceType"')
                    .child((catId) =>
                      // List out project documents where the _id for the selected
                      // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('Place')
                        .title('Steder')
                        .filter('_type == "Place" && $catId in hasType[]._ref')
                        .params({catId}),
                    ),
                ),
              S.listItem()
                .title('Alle steder')
                .icon(FaMapMarkedAlt)
                .child(S.documentTypeList('Place').title('Alle steder')),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem('Work').title('Verk'),
      S.documentTypeListItem('VisualItem').title('Visuell ting'),
      S.listItem()
        .title('Tekster')
        .icon(BsFileRichtext)
        .child(
          S.list()
            .title('Tekster')
            .items([
              S.listItem()
                .title('Tekster etter type')
                .icon(FaGlasses)
                .child(
                  // List out all categories
                  S.documentTypeList('TextType')
                    .title('Tekster etter type')
                    .filter('_type == "TextType"')
                    .child((catId) =>
                      // List out project documents where the _id for the selected
                      // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('LinguisticDocument')
                        .title('Tekster')
                        .filter('_type == "LinguisticDocument" && $catId in hasType[]._ref')
                        .params({catId}),
                    ),
                ),
              S.listItem().title('Upubliserte tekster').icon(FaGlasses).child(
                // List out all categories
                S.documentTypeList('LinguisticDocument')
                  .title('Upubliserte tekster')
                  .filter('_type == "LinguisticDocument" && accessState == "secret"'),
              ),
              S.listItem().title('Til gjennomgang').icon(FaGlasses).child(
                // List out all categories
                S.documentTypeList('LinguisticDocument')
                  .title('Til gjennomgang')
                  .filter('_type == "LinguisticDocument" && editorialState == "review"'),
              ),
              S.listItem()
                .title('Alle tekster')
                .icon(FaGlasses)
                .child(S.documentTypeList('LinguisticDocument').title('Alle tekster')),
            ]),
        ),
      S.divider(),
      // TYPE
      types,
      S.documentTypeListItem('Period').title('Perioder'),
      S.listItem()
        .title('Hendelser')
        .icon(MdEvent)
        .child(
          S.list()
            .title('Hendelser')
            .items([
              S.listItem()
                .title('Hendelser etter type')
                .icon(MdEvent)
                .child(
                  // List out all categories
                  S.documentTypeList('EventType')
                    .title('Hendelser etter type')
                    .filter('_type == "EventType"')
                    .child((catId) =>
                      // List out project documents where the _id for the selected
                      // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('Event')
                        .title('Hendelser')
                        .filter('_type == "Event" && $catId in hasType[]._ref')
                        .params({catId}),
                    ),
                ),
              S.listItem()
                .title('Alle hendelser')
                .icon(MdEvent)
                .child(S.documentTypeList('Event').title('Alle hendelser')),
            ]),
        ),
      // ACTIVITY
      S.listItem()
        .title('Aktiviteter')
        .icon(GiBoltSpellCast)
        .child(
          S.list()
            .title('Aktiviteter')
            .items([
              S.listItem()
                .title('Aktiviteter etter type')
                .icon(GiBoltSpellCast)
                .child(
                  // List out all categories
                  S.documentTypeList('ActivityType')
                    .title('Aktiviteter etter type')
                    .filter('_type == "ActivityType"')
                    .child((catId) =>
                      // List out project documents where the _id for the selected
                      // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('Activity')
                        .title('Aktiviteter')
                        .filter('_type == "Activity" && $catId in hasType[]._ref')
                        .params({catId}),
                    ),
                ),
              S.listItem()
                .title('Alle aktiviteter')
                .icon(GiBoltSpellCast)
                .child(S.documentTypeList('Activity').title('Alle aktiviteter')),
            ]),
        ),
      S.divider(),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes),
      blog,
      S.listItem()
        .title('Tidslinjer')
        .icon(FcTimeline)
        .child(
          S.list()
            .title('Tidslinjer')
            .items([
              S.listItem().title('Upubliserte tidslinjer').icon(FcTimeline).child(
                // List out all categories
                S.documentTypeList('Timeline')
                  .title('Upubliserte tidslinjer')
                  .filter('_type == "Timeline" && accessState == "secret"'),
              ),
              S.listItem().title('Til gjennomgang').icon(FcTimeline).child(
                // List out all categories
                S.documentTypeList('Timeline')
                  .title('Til gjennomgang')
                  .filter('_type == "Timeline" && editorialState == "review"'),
              ),
              S.listItem()
                .title('Alle tidslinjer')
                .icon(FcTimeline)
                .child(S.documentTypeList('Timeline').title('Alle tidslinjer')),
            ]),
        ),
      management,
    ])
