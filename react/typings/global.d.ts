declare global {
  interface SellerInput {
    SellerId: string
    Name: string
    Email: string
    Description: string
    ExchangeReturnPolicy: string
    DeliveryPolicy: string
    UseHybridPaymentOptions: boolean
    UserName: string
    Password: string
    SecutityPrivacyPolicy: string
    CNPJ: string
    CSCIdentification: string
    ArchiveId: number
    UrlLogo: string
    ProductCommissionPercentage: number
    FreightCommissionPercentage: number
    FulfillmentEndpoint: string
    CatalogSystemEndpoint: string
    IsActive: boolean
    Invited: boolean
    noOfInvites: number
    FulfillmentSellerId: number
    SellerType: number
    IsBetterScope: boolean
  }

  interface SellerInviteInput {
    id: string
    noOfInvites: number
    invited: boolean
  }
}

export {}
