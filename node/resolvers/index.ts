import { Apps } from '@vtex/api'
// import { VBASE_BUCKET, VBASE_SETTINGS_FILE } from '../constants'
import { GraphQLError } from 'graphql'
import { Seller } from '@vtex/clients'

const getAppId = (): string => {
  return process.env.VTEX_APP_ID ?? ''
}

export const SCHEMA_VERSION = 'v0.5'
export const sellerRequestsEntityName = "seller_request_entity"
const schemaSellerRequests = {
  properties: {
    SellerId : {
      type: 'string',
      title: 'Seller Id',
    },
    Name : {
      type: 'string',
      title: 'Name',
    },
    Email : {
      type: 'string',
      title: 'Email',
    },
    Description : {
      type: 'string',
      title: 'Description',
    },
    ExchangeReturnPolicy : {
      type: 'string',
      title: 'Exchange Return Policy',
    },
    DeliveryPolicy : {
      type: 'string',
      title: 'Delivery Policy',
    },
    UseHybridPaymentOptions : {
      type: 'boolean',
      title: 'Use Hybrid Payment Options',
    },
    UserName : {
      type : 'string',
      title: 'User Name'
    },
    Password : {
      type : 'string',
      title: 'Password'
    },
    SecutityPrivacyPolicy : {
      type : 'string',
      title: 'Secutity Privacy Policy'
    },
    CNPJ : {
      type : 'string',
      title: 'CNPJ'
    },
    CSCIdentification : {
      type : 'string',
      title: 'CSC Identification'
    },
    ArchiveId : {
      type : 'integer',
      title: 'Archive Id'
    },
    UrlLogo : {
      type : 'string',
      title: 'Url Logo'
    },
    ProductCommissionPercentage : {
      type : 'integer',
      title: 'Product Commission Percentage'
    },
    FreightCommissionPercentage : {
      type : 'integer',
      title: 'Freight Commission Percentage'
    },
    FulfillmentEndpoint : {
      type : 'string',
      title: 'Fulfillment Endpoint'
    },
    CatalogSystemEndpoint : {
      type : 'string',
      title: 'CatalogSystemEndpoint'
    },
    IsActive : {
      type : 'boolean',
      title : 'Is Active'
    },
    Invited : {
      type : 'boolean',
      title : 'Invited'
    },
    noOfInvites : {
      type : 'integer',
      title: 'Number of Invites sent'
    },
    FulfillmentSellerId : {
      type : 'integer',
      title: 'Fulfillment SellerId'
    },
    SellerType : {
      type : 'integer',
      title: 'Seller Type'
    },
    IsBetterScope : {
      type : 'boolean',
      title: 'Is BetterScope'
    },
    creationDate : {
      type: 'string',
      title: 'Creation Date'
    }
  },
  'v-indexed': ['SellerId','Name','Email','UserName','creationDate'],
  'v-default-fields': ['SellerId','Name','Email','Description','ExchangeReturnPolicy','UseHybridPaymentOptions','UserName','SecutityPrivacyPolicy','FulfillmentEndpoint','IsActive','Invited', 'FulfillmentSellerId', 'SellerType', 'Invited', 'creationDate'],
  'v-cache': false,
  'v-immediate-indexing': true,
}

const routes = {
  baseUrl: (account: string) =>
    `http://${account}.vtexcommercestable.com.br/api`,
  sellerRequestsEntity: (account: string) =>
  `${routes.baseUrl(account)}/dataentities/${sellerRequestsEntityName}`,

  saveSellerRequestDetails: (account: string) =>
      `${routes.sellerRequestsEntity(account)}/schemas/${SCHEMA_VERSION}`,
  saveSellerRequest: (account: string) =>
      `${routes.sellerRequestsEntity(account)}/documents`,
  getSchemas: (account: string) =>
          `${routes.sellerRequestsEntity(account)}/schemas`,
  deleteSellerRequestSchema: (account: string) =>
      `${routes.sellerRequestsEntity(account)}/schemas/${SCHEMA_VERSION}`
}


const defaultHeaders = (authToken: string) => ({
  'Content-Type': 'application/json',
  Accept: 'application/vnd.vtex.ds.v10+json',
  VtexIdclientAutCookie: authToken,
  'Proxy-Authorization': authToken
})
export const resolvers = {
  Query: {
    config: async (_: any, __: any, ctx: any) => {
      const {
        vtex: { account, authToken },
        clients: { hub },
      } = ctx
      const apps = new Apps(ctx.vtex)
      const app: string = getAppId()
      let settings = await apps.getAppSettings(app)
      // console.log(settings)
      const defaultSettings = {
        schema: false,
        title: 'Seller Request',
        anonymous: false,
        search: true,
        moderation: false
      }
      // const url1 = `http://${account}.vtexcommercestable.com.br/api/dataentities/${sellerRequestsEntityName}/schemas/${SCHEMA_VERSION}`
      // console.log(url1, '==')
      // const headers = defaultHeaders(authToken)
      // const schemas = await hub.get(url1, headers)
      // // console.log(schemas.data)
      // try {
      //   let url = `http://${account}.vtexcommercestable.com.br/api/dataentities/${sellerRequestsEntityName}/schemas/${SCHEMA_VERSION}`
      //   // const headers = defaultHeaders(authToken)\
      //   console.log(url)
      //   const deleteResponse = await hub.delete(url)
      //   console.log(deleteResponse)
      // } catch (error) {
      //   console.log(error)
      // }


      // console.log(settings)
      if(!settings.title) {
        settings = defaultSettings
      }

      let schemaError = false
      if (!settings.schema || settings.schemaVersion !== SCHEMA_VERSION) {

        try {
          const url = routes.saveSellerRequestDetails(account)
          const headers = defaultHeaders(authToken)
          await hub.put(url, schemaSellerRequests, headers)

        } catch (e) {
          // console.log(e)
          if(e.response.status >= 400) {
            schemaError = true
          }
        }

        settings.schema = !schemaError
        settings.schemaVersion = !schemaError ? SCHEMA_VERSION : null

        // console.log(settings, '==3')
        await apps.saveAppSettings(app, settings)
      }

      return settings
    },
    // TODO: remove this
    // getSellerListOld: async (_: void, __: void, ctx: Context) => {
    //   // console.log('getSellerList=====called===')
    //   const {
    //     clients: { vbase },
    //     vtex: { logger },
    //   } = ctx

    //   try {
    //     let sellerDetails = await vbase.getJSON(VBASE_BUCKET, VBASE_SETTINGS_FILE, true)
    //     console.log(sellerDetails)
    //     return [sellerDetails]
    //   } catch (error) {
    //     logger.error({
    //       message: 'getsellerDetail-getVbaseError',
    //       error,
    //     })
    //     return {}
    //   }
    // },
    getSellerList : async (_: any, args : any, ctx: Context) => {
      const {
        clients: {
          masterDataCustom
        },
        vtex:{authToken}
      } = ctx
      const headers = defaultHeaders(authToken)
      const pagination = JSON.parse(args?.pagination)
      const query : string= buildQuery(args?.search)
      let requestObj: any = {
         acronym : sellerRequestsEntityName,
        _fields: `Id,DocumentId,SellerId,Name,Email,UserName,creationDate,SellerType,IsActive`,
        _pagination : { page: pagination?.pageNo,pageSize: pagination?.tableLimit },
        _schema : SCHEMA_VERSION,
        _sort : "creationDate DESC",
        headers : headers
      }
      console.log(requestObj)
      if(query && query != ""){
        requestObj['_where'] = query
      }
      // let sellerDetails = await vbase.getJSON(VBASE_BUCKET, VBASE_SETTINGS_FILE, true)
      // console.log(sellerDetails)
      // console.log('getSellerList=====requestObj===')
      // console.log(requestObj)
      const result : any = await masterDataCustom.searchDocuments(requestObj)
      return {
        list : result?.data,
        count: result.headers['rest-content-range']?.split("/")[1]
      }
    }
  },
  Mutation: {
    createSellerRequests: async (
      _: void,
      { seller }: { seller: Seller },
      ctx: Context
    ) => {
      const {
        clients: {
          masterdata
        },
        vtex: { logger },
      } = ctx

      if (!seller) throw new GraphQLError('Input not provided')

      try {
        // const url = routes.getSchemas(account)
        // console.log(url)
        // const headers = defaultHeaders(authToken)
        // const schemas = await hub.get(url, headers)
        // console.log(schemas.data[0].schema)
        console.log('seller input=============')
        console.log(seller)
        const sellerResponse: any = await masterdata.createDocument({
          dataEntity: sellerRequestsEntityName,
          fields : seller,
          schema: SCHEMA_VERSION
        })
        // const sellerResponse: any = await masterDataCustom.createSellerRequest(sellerRequestsEntityName, seller, defaultHeaders(authToken))
        // await vbase.saveJSON(VBASE_BUCKET, VBASE_SETTINGS_FILE, seller)
        // const url = routes.saveSellerRequest(account)
        // const headers = defaultHeaders(authToken)
        // let sellerResponse: any = await hub.post(url, seller, headers)
        // TODO: remove seller response and add status and message
        // Add another form key to upload any file with limit save in vbase on formsubmit
        console.log(sellerResponse)
        return {
          Id: sellerResponse?.Id,
          message: 'Seller Request created successfully'
        }
      } catch (error) {
        console.log('failed=====================')
        console.log(JSON.stringify(error.response.data))
        logger.error({
          message: 'sellerRequests-saveVbaseError',
          error,
        })

        throw new GraphQLError('Failed to save seller request')
      }
    }
  }
}
const buildQuery = (args: string) =>{
  const argsAsObj = JSON.parse(args)
  const query = Object.keys(argsAsObj).reduce((acc: any,cur: any) =>{
      if(argsAsObj[cur]?.type === "date" && argsAsObj[cur]){
        acc = acc != "" ? acc + " AND (" + `${cur} between ${argsAsObj[cur].fromDate} AND ${argsAsObj[cur].toDate})`
        : `(${cur} between ${argsAsObj[cur].fromDate} AND ${argsAsObj[cur].toDate})`

      }else if(argsAsObj[cur]?.type === "string" && argsAsObj[cur]){
        if(argsAsObj[cur].verbValue === "="){
          acc = acc != "" ? acc + " AND " + `${cur} = \"${argsAsObj[cur].searchVal}\"` : `${cur} = ${argsAsObj[cur].searchVal}`
        }
        else if(argsAsObj[cur].verbValue === "!=")
        {
          acc = acc != "" ? acc + " AND " + `${cur} <> \"${argsAsObj[cur].searchVal}\"` : `${cur} <> ${argsAsObj[cur].searchVal}`
        }
        else{
          acc = acc != "" ? acc + " AND " + `${cur} = *${argsAsObj[cur].searchVal}*` : `${cur} = *${argsAsObj[cur].searchVal}*`
        }

      }else if(cur === "searchKey" && argsAsObj["searchKey"] != ""){
        acc = acc != "" ? acc + " AND " + `orderId = *${argsAsObj["searchKey"]}*` : `orderId = *${argsAsObj["searchKey"]}*`
      }
      return acc
  },"")
  return query;
}
