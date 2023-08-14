import { IOClients } from '@vtex/api'
import { Catalog } from '@vtex/clients'
import RequestHub from '../utils/Hub'
import { MasterDataCustom } from '../utils/MasterDataCustom'
import { MarketPlaceClient } from '../utils/MarketPlaceClient'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get hub() {
    return this.getOrSet('hub', RequestHub)
  }
  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }
  public get masterDataCustom(){
    return this.getOrSet('masterDataCustom', MasterDataCustom)
  }
  public get marketPlaceClient() {
    return this.getOrSet('marketPlaceClient', MarketPlaceClient)
  }
}
