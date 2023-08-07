import { Seller } from '@vtex/clients'

export const createSellerOnMarketplace = async (
  _: unknown,
  body: SellerGraphqlVars,
  ctx: Context
) => {
  // eslint-disable-next-line no-console
  console.log('=============input===', body)
  const {
    clients: { catalog },
  } = ctx

  const token = 'ADMIN_TOKEN'

  const { seller } = body
  const response = await catalog.createSeller(seller, token)
  // eslint-disable-next-line no-console
  console.log('=============response===', response)
  return response
}

export const getSellerList = async (_: unknown, __: unknown, ctx: Context) => {
  const {
    clients: { catalog },
  } = ctx
  const list = await catalog.getSellerList()
  console.log('inside getseller list================', list.length)
  return list
}

interface SellerGraphqlVars {
  seller: Seller
}
