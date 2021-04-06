import { BehaviorSubject, Subject } from "rxjs";
import { getBocServiceProviderDb, setBocServiceProviderDb } from "src/app/db/boc-service-providers.db";

const hide = (hidden: boolean) => {
    return hidden
}

export const bocServiceProvidersConfig = {
    // private
    // stores required BehaviorSubject instances
    _context: {
        pageRecords$: new BehaviorSubject<any[]>([]),
        filterChanged$: new Subject()
    },
     // this is how data is retrieved from the (graphql) database
    _getBocServiceProviders: function (pageOptions, filterOptions, sortOptions) {
        return getBocServiceProviderDb();
    },
    // public api
    // this function is called from the paginator when navigation events are signalled by the table
    loadPage: function (pageOptions, filterOptions, sortOptions) {
        const records: any[] = this._getBocServiceProviders(pageOptions, filterOptions, sortOptions);

        this._context.pageRecords$.next(records);
    },
    // stream that the table component listens-on
    pageRecords$: function () {
        return this._context.pageRecords$.asObservable();
    },
    pagination: false,
    // ag-grid column metadata
    columnDefs: [
        {
            field: 'id',
            hide: hide(true)
        },
        {
            headerName: 'Number',
            field: 'number'
        },
        {
            headerName: 'Suffix',
            field: 'suffix'
        },
        {
            headerName: 'Name',
            field: 'name'
        },
        {
            headerName: 'Long Name',
            field: 'longName'
        },
        {
            headerName: 'Key Words',
            field: 'keyWords'
        },
        {
            headerName: 'Narrative',
            field: 'narrative'
        },
        {
            headerName: 'Created By',
            field: 'createdBy',
            hide: hide(true)
        },
        {
            headerName: 'Updated By',
            field: 'updatedBy'
        },
    ],
    // user interface controls
    ui: {
      buttons: {
          download: {
              label: 'Download to Excel',
              handler: function (args) {
                  console.log(this.label, args);
              },
          },
          createUpdate: {
              label: `Add`,
              handler: function (suffix) {
                getBocServiceProviderDb().push({
                      id: null,
                      number: null,
                      suffix,
                      name: '',
                      longName: '',
                      keyWords: '',
                      narrative: '',
                      createdBy: 111,
                      updatedBy: 111,
                  });
                  bocServiceProvidersConfig.loadPage(null, null, null)
              }
          },
          delete: {
              label: 'Delete BOC Service Provider',
              handler: function (id) {
                let bocServiceProviders = getBocServiceProviderDb().filter(boc => boc.id !== id)
                setBocServiceProviderDb(bocServiceProviders)
                bocServiceProvidersConfig.loadPage(null, null, null)
              }
          }
      }
    }
}
