import { BehaviorSubject, Subject } from "rxjs";
import { ombObjectCodes } from "src/app/db";

export const ombObjectCodesConfig = {
    // private
    // stores required BehaviorSubject instances
    _context: {
        pageRecords$: new BehaviorSubject<any[]>([]),
        filterChanged$: new Subject()
    },
    // this is how data is retrieved from the (graphql) database
    _getOmbObjectCodes: function (pageOptions, filterOptions, sortOptions) {
        return ombObjectCodes(pageOptions, filterOptions, sortOptions);
    },
    // public api
    // this function is called from the paginator when navigation events are signalled by the table
    loadPage: function (pageOptions, filterOptions, sortOptions) {
        const records: any[] = this._getOmbObjectCodes(pageOptions, filterOptions, sortOptions);

        this._context.pageRecords$.next(records);
    },
    // stream that the table component listens-on
    pageRecords$: function () {
        return this._context.pageRecords$.asObservable();
    },
    // ag-grid column metadata
    columnDefs: async () => {
        return [
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
        ]
    },
    ui: {
        buttons: [
            {
                id: 'download',
                label: 'Download to Excel',
                handler: function (args) {
                    console.log(this.id, args);
                },
            },
            {
                id: 'create-update',
                label: `Add`,
                handler: function (args) {
                    console.log(this.id, args);
                }
            },
            {
                id: 'delete',
                label: 'Delete',
                handler: function (args) {
                    console.log(this.id, args);
                }
            }

        ]

    }
}