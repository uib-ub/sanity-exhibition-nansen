import S from '@sanity/desk-tool/structure-builder'
// import PreviewIFrame from '../../src/components/previewIFrame'
import {FaSitemap, FaRoute} from 'react-icons/fa'
import {MdMenu} from 'react-icons/md'
import {FcHome, FcTemplate} from 'react-icons/fc'
import {RiSideBarFill} from 'react-icons/ri'
import {AiFillAlert} from 'react-icons/ai'

export default S.listItem()
  .title('Sidebygger')
  .icon(FaSitemap)
  .child(
    S.list()
      .title('Sidebygger')
      .items([
        S.documentListItem()
          .title('Frontpage')
          .schemaType('Page')
          .icon(FcHome)
          .child(S.document().schemaType('Page').documentId('frontpage')),
        S.listItem()
          .title('Sider')
          .icon(FcTemplate)
          .schemaType('Page')
          .child(
            S.documentList('Page')
              .title('Sider')
              .menuItems(S.documentTypeList('Page').getMenuItems())
              .filter('_type == "Page" && !(_id match "**frontpage")'),
          ),
        S.listItem()
          .title('Navigasjonsmenyer')
          .icon(MdMenu)
          .schemaType('NavigationMenu')
          .child(S.documentTypeList('NavigationMenu').title('Navigasjonsmenyer')),
        S.listItem()
          .title('Innholdsfortegnelser')
          .icon(RiSideBarFill)
          .schemaType('Toc')
          .child(
            S.documentTypeList('Toc')
              .title('Innholdsfortegnelser')
              .child(
                (documentId) => S.document().documentId(documentId).schemaType('Toc'),
                // .views([S.view.form(), PreviewIFrame()])
              ),
          ),
        S.listItem()
          .title('Stier')
          .icon(FaRoute)
          .schemaType('Route')
          .child(
            S.documentTypeList('Route')
              .title('Stier')
              .child(
                (documentId) => S.document().documentId(documentId).schemaType('Route'),
                // .views([S.view.form(), PreviewIFrame()])
              ),
          ),
        S.listItem()
          .title('Varsler')
          .icon(AiFillAlert)
          .schemaType('Alert')
          .child(
            S.documentList('Alert')
              .title('Varsler')
              .menuItems(S.documentTypeList('Alert').getMenuItems())
              .filter('_type == "Alert"'),
          ),
      ]),
  )
