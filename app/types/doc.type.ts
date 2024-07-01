
export type Document = {
    "companyId": string,
    "createAt": string, 
    "description": string, 
    "document": string, 
    "expiration": string, 
    "id": string, 
    "status": "FINISH" | "EXPIRED" | "PEDING", 
    "tag": string | null, 
    "updateAt": string, 
    "url": string | null
}