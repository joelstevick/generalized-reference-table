export interface OmbObjectGroup {
    description: string;
}
export interface OmbObjectCode {
    code: string;
    description: string;
    ombObjectGroup: OmbObjectGroup;
    createdBy: number;
    updatedBy: number;
}

export const ombocs = [
  { code: "73.0", description: "Travel", ombObjectGroup: { description: "Travel" }, createdBy: 111111, updatedBy: 111111 },
  { code: "71.0", description: "Training", ombObjectGroup: { description: "Training" }, createdBy: 333333, updatedBy: 333333 },
  { code: "11.2", description: "Pay", ombObjectGroup: { description: "Pay and Benefits" }, createdBy: 111111, updatedBy: 111111 },
  { code: "11.3", description: "Benefits", ombObjectGroup: { description: "Pay and Benefits" }, createdBy: 111111, updatedBy: 111111 },
  { code: "55.0", description: "IT", ombObjectGroup: { description: "IT" }, createdBy: 111111, updatedBy: 333333 },
  { code: "49.0", description: "Enterprise", ombObjectGroup: { description: "Enterprise" }, createdBy: 111111, updatedBy: 111111 },
  { code: "51.0", description: "Facilities", ombObjectGroup: { description: "Facilities" }, createdBy: 333333, updatedBy: 333333 },
  { code: "14.1", description: "Food", ombObjectGroup: { description: "Resources" }, createdBy: 333333, updatedBy: 333333 },
  { code: "14.2", description: "Water", ombObjectGroup: { description: "Resources" }, createdBy: 333333, updatedBy: 333333 },
  { code: "14.3", description: "Stuff", ombObjectGroup: { description: "Resources" }, createdBy: 333333, updatedBy: 111111 },
  { code: "14.4", description: "Crude Oil", ombObjectGroup: { description: "Resources" }, createdBy: 333333, updatedBy: 333333 },
  { code: "89.0", description: "Health", ombObjectGroup: { description: "Health" }, createdBy: 111111, updatedBy: 111111 },
]

export const ombObjectCodes = (pageOptions: {start: number, end: number}, filterOptions, sortOptions) => {
  return ombocs.slice(pageOptions.start, pageOptions.end)
}
