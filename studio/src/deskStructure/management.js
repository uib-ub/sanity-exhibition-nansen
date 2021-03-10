import S from '@sanity/desk-tool/structure-builder'
import {GiCrackedGlass} from 'react-icons/'
import {FaGifts, FaProjectDiagram} from 'react-icons/fa'
import {ImLibrary} from 'react-icons/im'

// import PreviewIFrame from '../../src/components/previewIFrame'

const management = S.listItem()
  .title('Samlingsadm.')
  .icon(ImLibrary)
  .child(
    S.list()
      .title('Samlingsadm.')
      .items([
        S.documentTypeListItem('Collection').title('Samlinger'),
        S.listItem()
          .title('Akkvisisjoner')
          .icon(FaGifts)
          .child(
            S.list()
              .title('Akkvisisjoner')
              .items([
                S.listItem()
                  .title('Akkvisisjoner etter type')
                  .icon(FaGifts)
                  .child(
                    // List out all categories
                    S.documentTypeList('AcquisitionType')
                      .title('Akkvisisjoner etter type')
                      .filter('_type == "AcquisitionType"')
                      .child((catId) =>
                        // List out project documents where the _id for the selected
                        // category appear as a _ref in the project’s categories array
                        S.documentList()
                          .schemaType('Acquisition')
                          .title('Akkvisisjoner')
                          .filter('_type == "Acquisition" && $catId in hasType[]._ref')
                          .params({catId}),
                      ),
                  ),
                S.listItem().title('Upubliserte akkvisisjoner').icon(FaGifts).child(
                  // List out all categories
                  S.documentTypeList('Acquisition')
                    .title('Upubliserte akkvisisjoner')
                    .filter('_type == "Acquisition" && accessState == "secret"'),
                ),
                S.listItem().title('Til gjennomgang').icon(FaGifts).child(
                  // List out all categories
                  S.documentTypeList('Acquisition')
                    .title('Til gjennomgang')
                    .filter('_type == "Acquisition" && editorialState == "review"'),
                ),
                S.listItem()
                  .title('Alle akkvisisjoner')
                  .icon(FaGifts)
                  .child(
                    S.documentList()
                      .title('Alle akkvisisjoner')
                      .schemaType('Acquisition')
                      .filter('_type == "Acquisition"'),
                  ),
              ]),
          ),
        S.documentTypeListItem('DesignOrProcedure').title('Design eller prosedyre'),
        S.listItem()
          .title('Rapport')
          .icon(GiCrackedGlass)
          .child(
            S.list()
              .title('Rapport')
              .items([
                S.listItem()
                  .title('Rapport etter type')
                  .icon(GiCrackedGlass)
                  .child(
                    // List out all categories
                    S.documentTypeList('ReportType')
                      .title('Rapport etter type')
                      .filter('_type == "ReportType"')
                      .child((catId) =>
                        // List out project documents where the _id for the selected
                        // category appear as a _ref in the project’s categories array
                        S.documentList()
                          .schemaType('Report')
                          .title('Rapport')
                          .filter('_type == "Report" && $catId in hasType[]._ref')
                          .params({catId}),
                      ),
                  ),
                S.listItem().title('Upubliserte rapporter').icon(GiCrackedGlass).child(
                  // List out all categories
                  S.documentTypeList('Report')
                    .title('Upubliserte rapporter')
                    .filter('_type == "Report" && accessState == "secret"'),
                ),
                S.listItem().title('Til gjennomgang').icon(GiCrackedGlass).child(
                  // List out all categories
                  S.documentTypeList('Report')
                    .title('Til gjennomgang')
                    .filter('_type == "Report" && editorialState == "review"'),
                ),
                S.listItem()
                  .title('Alle rapporter')
                  .icon(GiCrackedGlass)
                  .child(
                    S.documentList()
                      .title('Alle rapporter')
                      .schemaType('Report')
                      .filter('_type == "Report"'),
                  ),
              ]),
          ),
        S.documentTypeListItem('Storage').title('Lagrinsenheter'),
        S.listItem()
          .title('Prosjekter')
          .icon(FaProjectDiagram)
          .child(
            S.list()
              .title('Prosjekter')
              .items([
                S.listItem().title('Active projects').icon(FaProjectDiagram).child(
                  // List out all categories
                  S.documentTypeList('Project')
                    .title('Active projects')
                    .filter('_type == "Project" && active'),
                ),
                S.listItem().title('Completed projects').icon(FaProjectDiagram).child(
                  // List out all categories
                  S.documentTypeList('Project')
                    .title('Completed projects')
                    .filter('_type == "Project" && !active'),
                ),
                S.listItem()
                  .title('Alle projects')
                  .icon(FaProjectDiagram)
                  .child(
                    S.documentList()
                      .title('Alle projects')
                      .schemaType('Project')
                      .filter('_type == "Project"'),
                  ),
              ]),
          ),
      ]),
  )

export default management
