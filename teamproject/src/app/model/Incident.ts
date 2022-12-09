export interface Incident{
    filter(arg0: (i: any) => boolean): Incident;
    caseNo: number,
    category: string,
    created: string,
    updated: string,
    status: string
}