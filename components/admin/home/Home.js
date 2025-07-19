"use client"
import React, { useState, useEffect, useContext } from 'react'
import styles from './home.module.css'
import { SlCalender } from "react-icons/sl";
import { IoBagHandleOutline } from "react-icons/io5";
import { usePathname, useRouter } from 'next/navigation';

const Home = () => {
  const [maxData, setMaxData] = useState("Month")
  const [eventData, setEventData] = useState("Today")
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set('pageName', "home");
    router.push(`${pathname}?${searchParams.toString()}`, { scroll: true });
  }, [])

  const maxDataChange = (e) => {
    setMaxData(e.target.value)
  }

  // All your existing state variables
  const [totalCount1, setTotalCount1] = useState(0);
  const [totalCount2, setTotalCount2] = useState(0);
  const [totalCount3, setTotalCount3] = useState(0);
  const [totalCount4, setTotalCount4] = useState(0);
  const [totalCount5, setTotalCount5] = useState(0);
  const [totalCount6, setTotalCount6] = useState(0);

  const [startDate, setStartDate] = useState()
  const [ednDate, setEndDate] = useState()
  const [monthlyDataState, setmonthlyDataState] = useState([])
  const [yearlyDataState, setyearlyDataState] = useState([])
  const [todayDataState, settodayDataState] = useState([])
  const [weekDataState, setweekDataState] = useState([])
  const [yesterdayDataState, setyesterdayDataState] = useState([])
  const [monthlyDataEvent, setmonthlyDataEvent] = useState([])
  const [yearlyDataEvent, setyearlyDataEvent] = useState([])
  const [todayDataEvent, settodayDataEvent] = useState([])
  const [weekDataEvent, setweekDataEvent] = useState([])
  const [yesterdayDataEvent, setyesterdayDataEvent] = useState([])
  const [customDataState, setcustomDataState] = useState([])
  const [orderState, setorderState] = useState([])

  // All your existing useEffect hooks for data fetching
  useEffect(() => {
    const getMonthlyData = async () => {
      try {
        const response = await fetch('/api/order/getordersdata')
        const data = await response.json()
        if (response.ok) {
          setmonthlyDataState(data.monthdata)
          setyearlyDataState(data.yeardata)
          setweekDataState(data.weekdata)
          setyesterdayDataState(data.yesterdaydata)
          settodayDataState(data.todaydata)
        } else {
          console.log("Unable to fetch monthly data")
        }
      } catch (err) {
        console.log(err)
      }
    }

    const getDataEvents = async () => {
      try {
        const response = await fetch('/api/chart/get-event')
        const data = await response.json()
        if (response.ok) {
          setmonthlyDataEvent(data.monthdata)
          setyearlyDataEvent(data.yeardata)
          setweekDataEvent(data.weekdata)
          setyesterdayDataEvent(data.yesterdaydata)
          settodayDataEvent(data.todaydata)
        } else {
          console.log("Unable to fetch monthly data")
        }
      } catch (err) {
        console.log(err)
      }
    }

    const getOrders = async () => {
      try {
        const response = await fetch('/api/user/getallorders?limit=10')
        const data = await response.json()
        if (response.ok) {
          setorderState(data.orders)
        } else {
          console.log("Unable to fetch orders")
        }
      } catch (err) {
        console.log(err)
      }
    }

    getMonthlyData()
    getOrders()
    getDataEvents()
  }, [])

  // All your existing useEffect hooks for counting
  useEffect(() => {
    if (todayDataState && todayDataState.length > 0) {
      const countObjects = () => {
        let count = 0;
        todayDataState[0]?.items?.forEach((array) => {
          count += array.length;
        });
        setTotalCount5(count);
      };
      countObjects();
    }
  }, [todayDataState]);

  useEffect(() => {
    if (yearlyDataState && yearlyDataState.length > 0) {
      const countObjects = () => {
        let count = 0;
        yearlyDataState[0]?.items?.forEach((array) => {
          count += array.length;
        });
        setTotalCount4(count);
      };
      countObjects();
    }
  }, [yearlyDataState]);

  useEffect(() => {
    if (customDataState && customDataState.length > 0) {
      const countObjects = () => {
        let count = 0;
        customDataState[0]?.items?.forEach((array) => {
          count += array.length;
        });
        setTotalCount6(count);
      };
      countObjects();
    }
  }, [customDataState]);

  useEffect(() => {
    if (monthlyDataState && monthlyDataState.length > 0) {
      const countObjects = () => {
        let count = 0;
        monthlyDataState?.forEach((item) => {
          item?.items?.forEach((array) => {
            count += array.length;
          })
        });
        setTotalCount3(count);
      };
      countObjects();
    }
  }, [monthlyDataState]);

  useEffect(() => {
    if (weekDataState && weekDataState.length > 0) {
      const countObjects = () => {
        let count = 0;
        weekDataState[0]?.items?.forEach((array) => {
          count += array.length;
        });
        setTotalCount2(count);
      };
      countObjects();
    }
  }, [weekDataState]);

  useEffect(() => {
    if (yesterdayDataState && yesterdayDataState.length > 0) {
      const countObjects = () => {
        let count = 0;
        yesterdayDataState[0]?.items?.forEach((array) => {
          count += array.length;
        });
        setTotalCount1(count);
      };
      countObjects();
    }
  }, [yesterdayDataState]);

  const [tot, setTot] = useState()
  const [inc, setInc] = useState()
  const [ite, setIte] = useState()

  useEffect(() => {
    setTot(yearlyDataState && yearlyDataState[0]?.count)
    setInc(yearlyDataState && yearlyDataState[0]?.amount)
    setIte(totalCount4)
  }, [yearlyDataState, totalCount4])

  const customDateGet = async () => {
    try {
      const response = await fetch(`/api/order/getordersdata/getcustomdata?startDate=${startDate}&endDate=${ednDate}`)
      const data = await response.json()
      if (response.ok) {
        setcustomDataState(data)
      } else {
        console.log("Unable to fetch monthly data")
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setTot(customDataState && customDataState[0]?.totalCount)
    setInc(customDataState && customDataState[0]?.totalIncome)
    setIte(totalCount6)
  }, [customDataState, totalCount6])

  const [m1, setM1] = useState(0)
  const [m2, setM2] = useState(0)

  useEffect(() => {
    let m3 = 0
    let m4 = 0
    monthlyDataState && monthlyDataState?.map((item) => {
      m3 += item?.count
      m4 += item?.amount
    })
    setM1(m3)
    setM2(m4)
  }, [monthlyDataState])

  return (
    <div className={styles.home}>
      <div className={styles.sidebarLayout}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <h3 className={styles.sidebarTitle}>Dashboard</h3>
          <div className={styles.sidebarItem}>
            <SlCalender className={styles.sidebarIcon} />
            <span>Today's Data</span>
          </div>
          <div className={styles.sidebarItem}>
            <IoBagHandleOutline className={styles.sidebarIcon} />
            <span>Monthly View</span>
          </div>
          <div className={styles.sidebarItem}>
            <IoBagHandleOutline className={styles.sidebarIcon} />
            <span>Analytics</span>
          </div>
          <div className={styles.sidebarItem}>
            <IoBagHandleOutline className={styles.sidebarIcon} />
            <span>Orders</span>
          </div>
          <div className={styles.sidebarItem}>
            <IoBagHandleOutline className={styles.sidebarIcon} />
            <span>Events</span>
          </div>
          <div className={styles.sidebarItem}>
            <IoBagHandleOutline className={styles.sidebarIcon} />
            <span>Settings</span>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Stats Row */}
          <div className={styles.statsRow}>
            <div className={`${styles.statCard} ${styles.orange}`}>
              <div className={styles.statValue}>
                ₹{Math.floor(todayDataState && todayDataState[0]?.totalIncome) || 0}
              </div>
              <div className={styles.statLabel}>
                Today's Income • {todayDataState && todayDataState[0]?.totalCount || 0} Orders
              </div>
            </div>

            <div className={`${styles.statCard} ${styles.blue}`}>
              <div className={styles.statValue}>
                ₹{maxData === "Month" ? Math.floor(m2) :
                  maxData === "Year" ? Math.floor(yearlyDataState && yearlyDataState[0]?.amount) :
                    maxData === "Week" ? Math.floor(weekDataState && weekDataState[0]?.totalIncome) :
                      Math.floor(yesterdayDataState && yesterdayDataState[0]?.totalIncome) || 0}
              </div>
              <div className={styles.statLabel}>
                {maxData} Income • {maxData === "Month" ? m1 :
                  maxData === "Year" ? yearlyDataState && yearlyDataState[0]?.count :
                    maxData === "Week" ? weekDataState && weekDataState[0]?.totalCount :
                      yesterdayDataState && yesterdayDataState[0]?.totalCount || 0} Orders
              </div>
              <select className={styles.statSelect} value={maxData} onChange={maxDataChange}>
                <option value="Yesterday">Yesterday</option>
                <option value="Week">This Week</option>
                <option value="Month">This Month</option>
                <option value="Year">This Year</option>
              </select>
            </div>

            <div className={`${styles.statCard} ${styles.red}`}>
              <div className={styles.statValue}>
                ₹{Math.floor(inc) || 0}
              </div>
              <div className={styles.statLabel}>
                Custom Range • {tot || 0} Orders
              </div>
              <div className={styles.customDateInputs}>
                <input
                  type="date"
                  onChange={(e) => setStartDate(e.target.value)}
                  className={styles.dateInput}
                />
                <input
                  type="date"
                  onChange={(e) => setEndDate(e.target.value)}
                  className={styles.dateInput}
                />
                <button onClick={customDateGet} className={styles.applyBtn}>Apply</button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className={styles.bottomSection}>
            {/* Events Section */}
            <div className={styles.eventsWidget}>
              <div className={styles.widgetHeader}>
                <h3>Events Data</h3>
                <select value={eventData} onChange={(e) => setEventData(e.target.value)} className={styles.eventSelect}>
                  <option value="Today">Today</option>
                  <option value="Yesterday">Yesterday</option>
                  <option value="Week">Week</option>
                  <option value="Month">Month</option>
                  <option value="Year">Year</option>
                </select>
              </div>
              <div className={styles.eventsContent}>
                {eventData === "Today" ? todayDataEvent?.map((item, index) => (
                  <div key={index} className={styles.eventItem}>
                    <span>{item?.event}</span>
                    <span>{item?.users}</span>
                  </div>
                )) :
                  eventData === "Yesterday" ? yesterdayDataEvent?.map((item, index) => (
                    <div key={index} className={styles.eventItem}>
                      <span>{item?.event}</span>
                      <span>{item?.users}</span>
                    </div>
                  )) :
                    eventData === "Week" ? weekDataEvent?.map((item, index) => (
                      <div key={index} className={styles.eventItem}>
                        <span>{item?.event}</span>
                        <span>{item?.users}</span>
                      </div>
                    )) :
                      eventData === "Month" ? monthlyDataEvent?.map((item, index) => (
                        <div key={index} className={styles.eventItem}>
                          <span>{item?.event}</span>
                          <span>{item?.users}</span>
                        </div>
                      )) :
                        eventData === "Year" ? yearlyDataEvent?.map((item, index) => (
                          <div key={index} className={styles.eventItem}>
                            <span>{item?.event}</span>
                            <span>{item?.users}</span>
                          </div>
                        )) :
                          <p>No Data</p>
                }
              </div>
            </div>

            {/* Orders Table */}
            <div className={styles.ordersWidget}>
              <h3 className={styles.widgetTitle}>Recent Orders</h3>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Status</th>
                      <th>Amount</th>
                      <th>Items</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderState?.slice(Math.max(orderState?.length - 10, 0))?.reverse()?.map((item, index) => (
                      <tr key={index}>
                        <td className={styles.customerName}>{item?.shippingInfo?.firstname}</td>
                        <td>
                          <span className={`${styles.status} ${item?.orderType === 'COD' ? styles.cod : styles.prepaid}`}>
                            {item?.orderType}
                          </span>
                        </td>
                        <td className={styles.amount}>₹{item?.finalAmount}</td>
                        <td>{item?.orderItems?.length} items</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home