import { IOClients } from '@vtex/api'
import { Catalog, OMS } from '@vtex/clients'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }
  public get oms() {
    return this.getOrSet('oms', OMS)
  }
}
