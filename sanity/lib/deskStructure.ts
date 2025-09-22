import { StructureBuilder } from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

const getOrderableDocumentList = (type: string, title: string, S: StructureBuilder, context: any) => {
  return orderableDocumentListDeskItem({ type, title, S, context })
}

const getDocumentTypeListItem = (type: string, title: string, S: StructureBuilder) => {
  return S.documentTypeListItem(type).title(title)
}

export const structure = (S: StructureBuilder, context: any) => {
  return S.list()
    .title('Content')
    .items([
      getOrderableDocumentList('project', 'Projects', S, context),
      // getDocumentTypeListItem('info', 'Info', S),
       S.listItem()
        .title('Footer Info')
        .icon(() => '?')
        .child(
          S.document()
            .schemaType('info')
            .documentId('infoSingleton') // fixed ID for singleton
        ),
      getOrderableDocumentList('jobs', 'Jobs', S, context),
      getDocumentTypeListItem('roles', 'Roles', S),
      getDocumentTypeListItem('tags', 'Tags', S),
      getDocumentTypeListItem('collabs', 'Collaborations', S),
    ])
}

