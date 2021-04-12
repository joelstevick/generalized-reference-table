import { BehaviorSubject, Subject } from "rxjs";
import * as FileSaver from 'file-saver';
import { getBocServiceProviderDb, setBocServiceProviderDb } from "src/app/db/boc-service-providers.db";
import { BocServiceProviderDeleteComponent } from "src/app/reference-tables/boc-service-providers/modals/boc-service-provider-delete/boc-service-provider-delete.component";
import { BocServiceProviderFormComponent } from "./modals/boc-service-provider-form/boc-service-provider-form.component";

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
        filterEnabled: false,
        buttons: {
            download: {
                label: 'Download to Excel',
                handler: function () {
                    const data = JSON.stringify(getBocServiceProviderDb())
                    const blob = new Blob([data], {
                        type: "text/plain;charset=utf-8"
                    });
                    FileSaver.saveAs(blob, "bocserviceproviders")
                },
            },
            create: {
                label: `Add`,
                handler: function (suffix) {
                    getBocServiceProviderDb().push({
                        id: getBocServiceProviderDb().length + 1,
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
            update: {
                key: 'suffix',
                handler: function (id, suffix) {
                    let updatedBocs = getBocServiceProviderDb().map(boc => {
                        if (boc.id === id) {
                            boc.suffix = suffix
                        }
                        return boc
                    })
                    setBocServiceProviderDb(updatedBocs)
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

      },
      modals: {
        delete: BocServiceProviderDeleteComponent,
        form: BocServiceProviderFormComponent
      }
    }
}
