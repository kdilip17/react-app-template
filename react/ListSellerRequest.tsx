import React, { FC, useState, useEffect } from 'react'
import { useLazyQuery } from 'react-apollo';
import GET_SELLER_LIST from './queries/getSellerList.gql'
import styles from './list-seller.css'

import { format } from 'date-fns'
import {
  Input,
  IconSearch,
  Pagination,
  FilterBar,
  DatePicker,
  Button
} from 'vtex.styleguide'

const DatePickerRangeObject = ({ value, onChange }: any) => {

  return (
    <div className="flex flex-column w-100">
      <br />
      <DatePicker
        label="from"
        value={(value && value.from)}
        onChange={(date: any) => {
          onChange({ ...(value || {}), from: date })
        }}

        locale="en-US"
      />
      <br />
      <DatePicker
        label="to"
        value={(value && value.to)}
        onChange={(date: any) => {
          onChange({ ...(value || {}), to: date })
        }}
        locale="en-US"
      />
    </div>
  )
}

const SimpleInputObject = ({ value, onChange }: any) => {
  return <Input value={value || ''} onChange={(e: any) => onChange(e.target.value)} />
}


const ListSellerRequest: FC = () => {
  const [showToast] = useState(false);
  const skeletonLoaderArray = new Array(10).fill(0);
  const today = new Date();
  const prior = new Date(new Date().setDate(today.getDate() - 30));
  const tableLimit = 5
  const [sellerObj, setSellerObj] = useState([]);
  const [searchStateVal, setSearchStateVal] = useState("");
  const [searchObj, setSearchObj] = useState<any>(null);
  const [paginationObj, setPaginationObj] = useState({
    currentItemFrom: 1,
    currentItemTo: tableLimit,
    totalItems: 0,
    tableLength: 0,
    pageNo: 1
  })
  const [loadingSellerList, setLoadingSellerList] = useState(true)
  const [statements, setStatementObj] = useState([
    {
      "subject": "creationDate",
      "verb": "between",
      "object": {
        "from": prior,
        "to": today
      },
      "error": null
    }
  ])

  let [getSellerList, { data: sellerList }] = useLazyQuery(GET_SELLER_LIST, {
    fetchPolicy: 'cache-and-network',
    ssr: true
  })

  useEffect(() => {
    setLoadingSellerList(true)
    const newSearchObj: any = {}
    if (statements.length > 0) {
      const reducedStatment = statements.reduce((acc: any, cur: any) => {
        if (cur.subject === 'creationDate') {
          acc['creationDate'] = {
            fromDate: cur?.object?.from,
            toDate: cur?.object?.to,
            type: "date"
          }
          return acc
        }
        if (cur.subject === 'Name') {
          acc['Name'] = {
            searchVal: cur?.object,
            verbValue: cur?.verb,
            type: "string"
          }
          return acc
        }
      }, newSearchObj)
      newSearchObj['searchKey'] = searchStateVal;
      setSearchObj(reducedStatment)
    } else {
      setSearchObj({
        'creationDate': null,
        'Name': null,
        'searchKey': searchStateVal
      })
    }
  }, [statements, searchStateVal])

  useEffect(() => {
    // console.log(searchObj, paginationObj)
    if (searchObj && paginationObj) {
      getSellerList({
        variables: {
          search: JSON.stringify(searchObj),
          pagination: JSON.stringify({
            pageNo: paginationObj.pageNo,
            tableLimit: tableLimit
          })
        }
      })
    }
  }, [searchObj, paginationObj, searchStateVal])


  useEffect(() => {
    if (sellerList?.getSellerList) {
      setSellerObj(sellerList?.getSellerList?.list ? sellerList?.getSellerList?.list : [])
      let updateObj = { ...paginationObj };
      updateObj.totalItems = sellerList?.getSellerList?.count
      setPaginationObj(updateObj);
      setLoadingSellerList(false)
    }


  }, [sellerList?.getSellerList?.list])

  const handleSearch = (e: any) => {
    const searchVal = e.target.value;
    setSearchStateVal(searchVal);
    setPaginationObj({
      currentItemFrom: 1,
      currentItemTo: tableLimit,
      totalItems: sellerObj.length,
      tableLength: tableLimit,
      pageNo: 1
    });
  }

  const handleNextClick = () => {
    setLoadingSellerList(true)
    let updateObj = { ...paginationObj };
    updateObj.pageNo = paginationObj.pageNo + 1;
    updateObj.currentItemFrom = paginationObj.currentItemTo + 1;
    updateObj.currentItemTo = tableLimit * updateObj.pageNo;
    setPaginationObj(updateObj);
  }

  const handlePrevClick = () => {
    setLoadingSellerList(true)
    let updateObj = { ...paginationObj };
    if (paginationObj.pageNo === 1) return
    updateObj.pageNo = paginationObj.pageNo - 1;
    updateObj.currentItemFrom = paginationObj.currentItemFrom - tableLimit;
    updateObj.currentItemTo = paginationObj.currentItemFrom - 1;
    setPaginationObj(updateObj);
  }

  const getSimpleVerbs = () => {
    return [
      {
        label: 'is',
        value: '=',
        object: (props: any) => <SimpleInputObject {...props} />,
      },
      {
        label: 'is not',
        value: '!=',
        object: (props: any) => <SimpleInputObject {...props} />,
      },
      {
        label: 'contains',
        value: 'contains',
        object: (props: any) => <SimpleInputObject {...props} />,
      },
    ]
  }

  const renderSimpleFilterLabel = (statement: any) => {
    if (!statement || !statement.object) {
      // you should treat empty object cases only for alwaysVisibleFilters
      return 'Any'
    }
    return `${statement.verb === '='
      ? 'is'
      : statement.verb === '!='
        ? 'is not'
        : 'contains'
      } ${statement.object}`
  }

  const formatDate = (val: any) => {
    return format(new Date(val), "MM/dd/yyyy - hh:mm a")
  }

  return (
    <div>

      <div className='ticket-container'>

        <div>
          <header className="flex content-center justify-between bb b--silver h-25 pa3 mt4">
            <h1 className="sans-serif f4 lh-title-ns tracked-tight-l fw2">Seller Request List</h1>
          </header>
        </div>
        <div className="flex">
          <div className="w-40 ml5 fl mt5">
            <Input
              value={searchStateVal}
              onChange={handleSearch}
              prefix={<IconSearch />}
            />
          </div>
          <div className="w-100 mr5">

            {sellerObj.length > 0 && <Pagination
              onNextClick={handleNextClick}
              onPrevClick={handlePrevClick}
              currentItemFrom={paginationObj.currentItemFrom}
              currentItemTo={paginationObj.currentItemTo}
              textOf="of"
              totalItems={paginationObj.totalItems}
            />}
          </div>
        </div>
        <div className="ma4">
          <FilterBar
            alwaysVisibleFilters={['Name', 'creationDate']}
            statements={statements}
            onChangeStatements={(statements: any) => setStatementObj(statements)}
            clearAllFiltersButtonLabel="Clear Filters"
            options={{

              Name: {
                label: 'Name',
                renderFilterLabel: renderSimpleFilterLabel,
                verbs: getSimpleVerbs(),
              },

              creationDate: {
                label: 'Creation Date',
                renderFilterLabel: (statement: any) => {
                  if (!statement || !statement.object) return 'All'
                  return `${statement.verb === 'between'
                    ? `between ${statement.object.from} and ${statement.object.to}`
                    : `is ${statement.object}`
                    }`

                },
                verbs: [
                  {
                    // label: 'is between',
                    value: 'between',
                    object: (props: any) => <DatePickerRangeObject {...props} />,
                  },
                ],
              }
            }}
          />
        </div>
        <div className="ma5">
          <table className={styles['table-container']}>
            <thead className={styles['thead-container']}>
              <tr className={styles['thead-row']}>
                <td className={styles['thead-col']}>Seller ID</td>
                <td className={styles['thead-col']}> Seller Name</td>
                <td className={styles['thead-col']}>Email</td>
                <td className={styles['thead-col']}>User Name</td>
                <td className={styles['thead-col']}>Created Date</td>
                {/* <td className={styles['thead-col']}>Seller Type</td> */}
                <td className={styles['thead-col']}>Invite</td>
              </tr>
            </thead>
            <tbody className={styles['tbody-container']}>
              {loadingSellerList ? skeletonLoaderArray.map((_: any, index: number) => {
                return (
                  <tr key={index} className={styles['tbody-row']}>
                    <td className={styles['td-col1']}><div className={styles['td-content']}></div></td>
                    <td className={styles['td-col2']}><div className={styles['td-content']}></div></td>
                    <td className={styles['td-col2']}><div className={styles['td-content']}></div></td>
                    <td className={styles['td-col4']}><div className={styles['td-content']}></div></td>
                    <td className={styles['td-col3']}><div className={styles['td-content']}></div></td>
                    {/* <td className={styles['td-col4']}><div className={styles['td-content']}></div></td> */}
                    <td className={styles['td-col3']}><div className={styles['td-content']}></div></td>
                  </tr>
                )
              }) :
                (sellerObj.length == 0 && !loadingSellerList) ?
                  <tr>
                    <td colSpan={7} className={styles['no-records-col']}>
                      No records found.
                    </td>
                  </tr>
                  : sellerObj?.map((item: any, index) => {
                    return (
                      <tr key={index} className={styles['tbody-row']}>
                        <td className={styles['td-col4']}>{item?.SellerId}</td>
                        <td className={styles['td-col4']}>{item?.Name}</td>
                        <td className={styles['td-col2']}>{item?.Email}</td>
                        <td className={styles['td-col4']}>{item?.UserName}</td>
                        <td className={styles['td-col4']}>{formatDate(item?.creationDate)}</td>
                        {/* <td className={styles['td-col3']}>{item?.SellerType}</td> */}
                        <td className={styles['td-col3']}>{item?.IsActive ? <Button
                          variation="primary"
                          size="small"
                          onClick={handleSearch}
                        >Invite</Button> : <Button
                          variation="primary"
                          size="small"
                          onClick={handleSearch}
                        >Resend Invite</Button>}</td>
                      </tr>
                    )
                  })
              }
            </tbody>
          </table>
        </div>
      </div>
      {showToast}
    </div>
  )
}
export default ListSellerRequest
