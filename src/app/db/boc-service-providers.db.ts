export interface BocServiceProvider {
    id: number;
    number: number;
    suffix: string;
    name: string;
    longName: string;
    keyWords: string;
    narrative: string;
    createdBy: number;
    updatedBy: number;
}

let bocServiceProviders: BocServiceProvider[] =
    [
        { id: 1, number: 1, suffix: "_STAFF", name: "STAFF", longName: "Staff Employee", keyWords: "Current Employee, Staff, Retired Employee, Separated Employee", narrative: "Payments or obligations is designated by a staff employee.", createdBy: 111111, updatedBy: 333333 },
        { id: 2, number: 2, suffix: "_CONTR", name: "CONTR", longName: "Industrial Contractor", keyWords: "Contractor, Commercial Entity, Private Entity", narrative: "Payments or obligations is designated by a private or commercial entity.", createdBy: 111111, updatedBy: 111111 }
    ]

export function getBocServiceProviderDb() {
  return bocServiceProviders
}

export function setBocServiceProviderDb(newBocServiceProviders) {
  bocServiceProviders = newBocServiceProviders
}
