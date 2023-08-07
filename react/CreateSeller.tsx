import React, { FC, useState, useEffect } from 'react'
import { IconArrowBack, Button, Spinner, Input, Checkbox } from 'vtex.styleguide'
import { useQuery } from "react-apollo";
// useMutation
// import CREATE_SELLER_ON_MARKETPLACE from './queries/createSellerOnMarketplace.gql'
import GET_SELLER_LIST from './queries/getSellerList.gql'
import style from './create-seller.css'

const CreateSeller: FC = () => {
  const { data: sellerList } = useQuery(GET_SELLER_LIST, {
    ssr: false
  })
  const loadingPost = false
  const [state, setState] = useState({
    SellerId: '',
    Name: '',
    Email: '',
    Description: '',
    ExchangeReturnPolicy: '',
    DeliveryPolicy: '',
    UseHybridPaymentOptions: true,
    UserName: '',
    Password: '',
    SecutityPrivacyPolicy: '',
    CNPJ: '',
    CSCIdentification: '',
    ArchiveId: '', // Integer
    UrlLogo: '',
    ProductCommissionPercentage: '', // Integer
    FreightCommissionPercentage: '', // Integer
    CategoryCommissionPercentage: '',
    FulfillmentEndpoint: '',
    CatalogSystemEndpoint: '',
    IsActive: true,
    MerchantName: '',
    FulfillmentSellerId: '', // Integer
    SellerType: 1,
    IsBetterScope: true,
    TrustPolicy: 'Default',
    error: false,
    errorMessage: 'This field is mandatory'
  })

  const onChangeHandler = (event: any) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  // useEffect(() => {
  //   // eslint-disable-next-line no-console
  //   console.log(formData)
  // }, [formData])
  useEffect(() => {
    if (sellerList) {
      // eslint-disable-next-line no-console
      console.log(state)
      // console.log(sellerList, 'seller list ==============')
    }
  }, [sellerList])

  // const [createSellerOnMarketplace, { loading: loadingPost }] = useMutation(
  //   CREATE_SELLER_ON_MARKETPLACE
  // )

  const onSubmitHandler = (event: any) => {
    event.preventDefault()
    // eslint-disable-next-line no-console
    console.table(state)

    // let isValid = validateForm()
    // if(isValid) {
    //     alert("Submitted")
    // }

    // createSellerOnMarketplace({
    //   variables: {
    //     seller: {
    //       SellerId: 'autosellerapi',
    //       Name: 'dilipkumarapi',
    //       Email: 'dilip.kumar+5@borngroup.com',
    //       Description: '',
    //       ExchangeReturnPolicy: '',
    //       DeliveryPolicy: '',
    //       UseHybridPaymentOptions: true,
    //       UserName: 'dilipkumar',
    //       Password: 'testuser101',
    //       SecutityPrivacyPolicy: '',
    //       CNPJ: '12345678912345',
    //       CSCIdentification: 'autosellerapi',
    //       ArchiveId: '1',
    //       UrlLogo: '',
    //       ProductCommissionPercentage: 2,
    //       FreightCommissionPercentage: 0,
    //       FulfillmentEndpoint:
    //         'http://fulfillment.vtexcommerce.com.br/api/fulfillment?an=bornb2b',
    //       CatalogSystemEndpoint: '',
    //       IsActive: true,
    //       FulfillmentSellerId: '',
    //       SellerType: 1,
    //       IsBetterScope: false,
    //     } as unknown,
    //   },
    // })
  }

  return (
    <>
      <div className="pa8">
        <div className="pb5 bb b--silver flex w-100">
          <div className="f3 w-60">Create Seller</div>
          <div className="w-40 mt3">
            <div>
              <a href="/admin" target="_parent" className={style['link-text']}>
                <div className={style['link-text-section']}>
                  <div className="mr3">
                    <IconArrowBack size="20" color="#08c" />
                  </div>
                  <div className="f6">Back to dashboard</div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className={style['content-container']}>
          {/* <div className="ml5 mb5 pt2 f5 field">Enter SellerID</div> */}
          {/* suffix={<IconSearch />} onChange={handleSearch} */}
          <div className="ml5 mb2 w-75">
            <Input
              type="text"
              placeholder="Enter Seller ID"
              name="SellerId"
              label="Seller ID"
              size="regular"
              onChange={onChangeHandler}
            />
          </div>

          <div className="ml5 mb2 w-75">
            <Input
              type="text"
              placeholder="Enter Seller Name"
              name="Name"
              label="Seller Name"
              size="regular"
              onChange={onChangeHandler}
            />
          </div>

          <div className="ml5 mb2 w-75">
            <Input
              type="text"
              placeholder="Enter Seller Email"
              name="Email"
              label="Seller Email"
              size="regular"
              onChange={onChangeHandler}
            />
          </div>

          <div className="ml5 mb2 w-75">
            <Input
              type="Textarea"
              placeholder="Enter Description"
              name="Description"
              label="Description"
              size="regular"
              onChange={onChangeHandler}
            />
          </div>

          <div className="ml5 mb2 w-75">
            <Input
              type="text"
              placeholder="Enter Exchange Return Policy"
              name="ExchangeReturnPolicy"
              label="Exchange Return Policy"
              size="regular"
              onChange={onChangeHandler}
            />
          </div>

          <div className="ml5 mb2 w-75">
            <Input
              type="text"
              placeholder="Enter Delivery Policy"
              name="DeliveryPolicy"
              label="Delivery Policy"
              size="regular"
              onChange={onChangeHandler}
            />
          </div>

          <div className="ml5 mt4 mb4 w-25">
            <Checkbox
              checked={state.UseHybridPaymentOptions}
              label="Use Hybrid Payment Options"
              name="UseHybridPaymentOptions"
              onChange={() => setState({ ...state, 'UseHybridPaymentOptions': !state.UseHybridPaymentOptions })}
              value={state.IsActive}
            />
          </div>

          <div className="ml5 mb2 w-75">
            <Input
              type="text"
              placeholder="Enter User Name"
              name="UserName"
              label="User Name"
              size="regular"
              onChange={onChangeHandler}
            />
          </div>

          <div className="ml5 mb2 w-75">
            <Input
              type="text"
              placeholder="Enter Password"
              name="Password"
              label="Password"
              size="regular"
              onChange={onChangeHandler}
            />
          </div>

          <div className="ml5 mb2 w-75">
            <Input
              type="text"
              placeholder="Enter Secutity Privacy Policy"
              name="SecutityPrivacyPolicy"
              label="Secutity Privacy Policy"
              size="regular"
              onChange={onChangeHandler}
            />
          </div>

          <div className="ml5 mb2 w-75">
            <Input
              type="text"
              placeholder="Enter CNPJ"
              name="CNPJ"
              label="CNPJ"
              size="regular"
              onChange={onChangeHandler}
            />
          </div>

          <div className="ml5 mb2 w-75">
            <Input
              type="text"
              placeholder="Enter CSC Identification"
              name="CSCIdentification"
              label="CSC Identification"
              size="regular"
              onChange={onChangeHandler}
            />
          </div>

          <div className="ml5 mb2 w-75">
            <Input
              type="number"
              placeholder="Enter Archive Id"
              name="ArchiveId"
              label="Archive Id"
              size="regular"
              onChange={onChangeHandler}
            />
          </div>

          <div className="ml5 mb2 w-75">
            <Input
              type="text"
              placeholder="Enter Url Logo"
              name="UrlLogo"
              label="Url Logo"
              size="regular"
              onChange={onChangeHandler}
            />
          </div>

          <div className="ml5 mb2 w-75">
            <Input
              type="number"
              step="0.1"
              min="0"
              max="20"
              placeholder="Enter Product Commission Percentage"
              name="ProductCommissionPercentage"
              label="Product Commission Percentage"
              size="regular"
              onChange={onChangeHandler}
            />
          </div>

          <div className="ml5 mb2 w-75">
            <Input
              type="number"
              step="0.1"
              min="0"
              max="20"
              placeholder="Enter Freight Commission Percentage"
              name="FreightCommissionPercentage"
              label="Freight Commission Percentage"
              size="regular"
              onChange={onChangeHandler}
            />
          </div>

          <div className="ml5 mb2 w-75">
            <Input
              type="number"
              step="0.1"
              min="0"
              max="20"
              placeholder="Enter Category Commission Percentage"
              name="CategoryCommissionPercentage"
              label="Category Commission Percentage"
              size="regular"
              onChange={onChangeHandler}
            />
          </div>

          <div className="ml5 mb2 w-75">
            <Input
              type="text"
              placeholder="Enter Fulfillment Endpoint"
              name="FulfillmentEndpoint"
              label="Fulfillment Endpoint"
              size="regular"
              onChange={onChangeHandler}
            />
          </div>

          <div className="ml5 mb2 w-75">
            <Input
              type="text"
              placeholder="Enter CatalogSystemEndpoint"
              name="CatalogSystemEndpoint"
              label="Catalog System Endpoint"
              size="regular"
              onChange={onChangeHandler}
            />
          </div>

          <div className="ml5 mt4 mb4 w-25">
            <Checkbox
              checked={state.IsActive}
              label="Active"
              name="IsActive"
              onChange={() => setState({ ...state, 'IsActive': !state.IsActive })}
              value={state.IsActive}
            />
          </div>

          <div className="ml5 mb2 w-75">
            <Input
              type="text"
              placeholder="Enter Merchant Name"
              name="MerchantName"
              label="Merchant Name"
              size="regular"
              onChange={onChangeHandler}
            />
          </div>

          <div className="ml5 mb2 w-75">
            <Input
              type="text"
              placeholder="Enter Fulfillment SellerId"
              name="FulfillmentSellerId"
              label="Fulfillment SellerId"
              size="regular"
              onChange={onChangeHandler}
            />
          </div>

          <div className="ml5 mb2 w-75">
            <Input
              type="number"
              placeholder="Enter Seller Type"
              name="SellerType"
              label="Seller Type"
              size="regular"
              onChange={onChangeHandler}
            />
          </div>

          <div className="ml5 mt4 mb4 w-25">
            <Checkbox
              checked={state.IsBetterScope}
              label="Is Better Scope"
              name="IsBetterScope"
              onChange={() => setState({ ...state, 'IsBetterScope': !state.IsBetterScope })}
              value={state.IsActive}
            />
          </div>

          <div className="ml5 mb2 w-75">
            <Input
              type="text"
              placeholder="Enter Trust Policy"
              name="TrustPolicy"
              label="Trust Policy"
              size="regular"
              onChange={onChangeHandler}
            />
          </div>

          <div className="ml5 p5 mb5 flex">
            <div>
              <Button
                variation="danger"
                size="small"
                onClick={onSubmitHandler}
              >
                Create
              </Button>
            </div>
            {loadingPost && (
              <div className="ml5 mt3">
                <Spinner size="20" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateSeller
