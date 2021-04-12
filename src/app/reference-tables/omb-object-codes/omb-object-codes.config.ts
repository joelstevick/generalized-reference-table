import { BehaviorSubject, Subject } from "rxjs";
import * as FileSaver from 'file-saver';
import { findAll, getOmbObjectCodesDb, setOmbObjectCodesDb } from "src/app/db/omb-object-codes.db";
import { OmbObjectCodeDeleteComponent } from "src/app/reference-tables/omb-object-codes/modals/omb-object-code-delete/omb-object-code-delete.component";
import { OmbObjectCodeFormComponent } from "./modals/omb-object-code-form/omb-object-code-form.component";
export const ombObjectCodesConfig = {
    // private
    // stores required BehaviorSubject instances
    _context: {
        pageRecords$: new BehaviorSubject<any[]>([]),
        filterChanged$: new Subject()
    },
    // this is how data is retrieved from the (graphql) database
    _getOmbObjectCodes: function (pageOptions, filterOptions) {
        return findAll(pageOptions, filterOptions);
    },
    // public api
    // this function is called from the paginator when navigation events are signalled by the table
    loadPage: function (pageOptions, filterOptions) {
        const records: any[] = this._getOmbObjectCodes(pageOptions, filterOptions);

        this._context.pageRecords$.next(records);
    },
    // stream that the table component listens-on
    pageRecords$: function () {
        return this._context.pageRecords$.asObservable();
    },
    // ag-grid column metadata
    columnDefs: [
        {
            headerName: 'Code',
            field: 'code'
        },
        {
            headerName: 'Description',
            field: 'description'
        },
        {
            headerName: 'OMB Object Group',
            field: 'ombObjectGroup',
            valueFormatter: (params) => params.value ? params.value.description : null
        },
        {
            headerName: 'Created By',
            field: 'createdBy'
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
                handler: function () {
                  const data = JSON.stringify(getOmbObjectCodesDb())
                  const blob = new Blob([data], {
                    type: "text/plain;charset=utf-8"
                  });
                  FileSaver.saveAs(blob, "ombobjectcodes")
                },
            },
            create: {
                label: `Add`,
                handler: function (code) {
                    getOmbObjectCodesDb().push({
                        id: getOmbObjectCodesDb().length + 1,
                        code,
                        description: '',
                        ombObjectGroup: {
                            description: '',
                        },
                        createdBy: 111,
                        updatedBy: 111,
                    });

                    ombObjectCodesConfig.loadPage(null, null)
                }
            },
            update: {
              key: 'code',
              handler: function (id, code) {
                let updatedOmbocs = getOmbObjectCodesDb().map(omboc => {
                  if (omboc.id === id) {
                    omboc.code = code
                  }
                  return omboc
                })
                setOmbObjectCodesDb(updatedOmbocs)
                ombObjectCodesConfig.loadPage({start: 0, end: 10}, null)
              }
            },
            delete: {
                label: 'Delete OMB Object Code',
                handler: function (id) {
                    let ombocs = getOmbObjectCodesDb().filter(omboc => omboc.id !== id)
                    setOmbObjectCodesDb(ombocs)
                    ombObjectCodesConfig.loadPage({start: 0, end: 10}, null)
                }
            }
        },
        modals: {
          delete: OmbObjectCodeDeleteComponent,
          form: OmbObjectCodeFormComponent
        }
    }
}
