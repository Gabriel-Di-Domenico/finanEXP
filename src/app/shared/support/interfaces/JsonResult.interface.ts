export default interface JsonResult {
    contentType?: string
    serializerSettings?: object
    statusCode?: number
    value: string
}