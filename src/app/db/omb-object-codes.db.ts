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

export const ombObjectCodes: OmbObjectCode[] = [
    { code: "73.0", description: "Travel", ombObjectGroup: { description: "Travel" }, createdBy: 111111, updatedBy: 111111 },
    { code: "71.0", description: "Training", ombObjectGroup: { description: "Training" }, createdBy: 333333, updatedBy: 333333 },
    { code: "11.2", description: "Pay", ombObjectGroup: { description: "Pay and Benefits" }, createdBy: 111111, updatedBy: 111111 }
]
