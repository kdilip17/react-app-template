import {
  ExternalClient,
  InstanceOptions,
  IOContext
} from '@vtex/api'

export class MasterDataCustom extends ExternalClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(`http://${ctx.account}.vtexcommercestable.com.br/api/`, ctx, {
      ...options,
      headers: {
        ...options?.headers,
        ...{ Accept: 'application/vnd.vtex.ds.v10+json' },
        ...(ctx.adminUserAuthToken
          ? { VtexIdclientAutCookie: ctx.adminUserAuthToken }
          : null),
        ...(ctx.storeUserAuthToken
          ? { VtexIdclientAutCookie: ctx.storeUserAuthToken }
          : null),
      },
    })
  }

  public async createSellerRequest(entityName: string, data: any, headers: any) {
    return await this.http.postRaw(`/dataentities/${entityName}/documents`,JSON.stringify(data),headers)
  }

  public async searchDocuments(requestObj: any) {
    let result = await this.http.getRaw(`/dataentities/${requestObj?.acronym}/search`,{
      headers: {...requestObj?.headers,...paginationArgsToHeaders(requestObj?._pagination)},
      params : {
          _fields : requestObj?._fields,
          _where : requestObj?._where,
          _schema: requestObj?._schema,
          _sort: requestObj?._sort
      }
    }
    ).catch((_e)=>{
      console.log(_e);
    });
    // console.log('search result=====')
    // console.log(result)
    return result
  }

}

function paginationArgsToHeaders({ page, pageSize }: PaginationArgs) {
if (page < 1) {
  throw new Error('Smallest page value is 1')
}

const startIndex = (page - 1) * pageSize
const endIndex = startIndex + pageSize

return {
  'REST-Range': `resources=${startIndex}-${endIndex}`,
}
}

interface PaginationArgs {
page: number
pageSize: number
}

