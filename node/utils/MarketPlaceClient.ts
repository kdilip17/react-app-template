import { JanusClient, InstanceOptions, IOContext } from '@vtex/api'

export class MarketPlaceClient extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        ...options?.headers,
        ...(context.adminUserAuthToken
          ? { VtexIdclientAutCookie: context.adminUserAuthToken }
          : null),
          "X-VTEX-Use-Https": "true",
      },
    })
  }

  public async inviteSellerLead(data: any): Promise<any> {
    return this.http.post(`/api/seller-register/pvt/seller-leads`, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      }
    })
  }
}
