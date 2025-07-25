import React,{useEffect,useState,useContext} from 'react'
import styles from '../orders/orders.module.css'
import { MdDeleteForever } from "react-icons/md";
import { LuView } from "react-icons/lu";
import Image from 'next/image';
import { GlobalContext } from '../../../GlobalContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import LoadingBar from "react-top-loading-bar"; // Import LoadingBar
import { IoMdClose } from 'react-icons/io';
import SingleAbandoned from './SingleAbandoned';

const Abandoned = () => {
     const [progress, setProgress] = useState(0); // Progress state for LoadingBar
      const [user,setUser] =useState({})
      const {prdtOpens,setPrdtOpens} = useContext(GlobalContext);
        useEffect(() => {
          setUser(JSON.parse(localStorage.getItem("user")))
        }, [])
        const searchParams = useSearchParams();
          const pathname = usePathname();
          const router = useRouter()
    // const queryParams = new URLSearchParams(location.search);
    let page = parseInt(searchParams.get('page')) || 1;
    const [orderState,setOrderState]=useState([])
      useEffect(()=>{
        const searchParams = new URLSearchParams();
        searchParams.set('pageName',"abandoned");
        router.push(`${pathname}?${searchParams.toString()}`, { scroll: true });
          },[])
  useEffect(() => {
    if(prdtOpens===false){
    const getOrders = async () => {
      try {
        const response = await fetch(`/api/abandoned/getallabandoneds?page=${page}`)
        const data = await response.json()
        if (response.ok) {
          setOrderState(data.orders)
        }
        else {
          console.log("Unable to fetch orders")
        }
      }
      catch (err) {
        console.log(err)

      }
    }
    getOrders()
  }
  }, [page,prdtOpens])

  const updateURL = (updateParams) => {
    const searchParams = new URLSearchParams();

    if (updateParams.page !== "") {
      searchParams.set('page', updateParams.page);
    }
    searchParams.set('pageName',"abandoned");

    setProgress(30);
    router.push(`${pathname}?${searchParams.toString()}`, { scroll: true });
    setTimeout(() => setProgress(100), 500);

  };


    const nextPage=()=>{
      page++;
      updateURL({ page });
      }
      const prevPage=()=>{
        if (page > 1) {
          page--;
          updateURL({ page });
        }
      }
      const deleteAban=(item)=>{
        if (window.confirm("Do you want to Delete this Abandoned")) {
            const deletedAban=async()=>{
                try{
                  const response=await fetch(`/api/abandoned/delete-abandoned?id=${item?._id}&token=${user?.token}`,{
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                })
                  const data=await response.json()
                if(data.status===200){
                    const createHistory=async()=>{
                        try{
                          const response=await fetch("/api/history/create-history",{
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({name:user?.firstname,title:item?.orderNumber,sku:item?.shippingInfo?.firstname,productchange:"Delete the Abandoned",time:new Date()}),
                        })
                        if(response.ok){
                          setPrdtOpens(false)
                        }
                        
                        }catch(error){
                          console.log(error)
                        }
                        }
                    createHistory()
                    toast.success("Abandoned Deleted Successfully")
                    const getOrders = async () => {
                        try {
                          const response = await fetch(`/api/abandoned/getallabandoneds?page=${page}`)
                          const data = await response.json()
                          if (response.ok) {
                            setOrderState(data.orders)
                          }
                          else {
                            console.log("Unable to fetch orders")

                          }
                        }
                        catch (err) {
                          console.log(err)

                        }
                      }
                      getOrders()
              
                  }
                  else{
                    toast.error("Unable to Delete Abandoned")
                  }
                
                }catch(error){
                  console.log(error)
                }
              }
              deletedAban()

         }
      }
      const modifyCloudinaryUrl = (url) => {
        const urlParts = url?.split('/upload/');
        return urlParts && `${urlParts[0]}/upload/c_limit,h_1000,f_auto,q_50/${urlParts[1]}`;
      };


const [abandonedId,setabandonedId]=useState("")
// const [addPrdt,setAddPrdt]=useState(false)


const closeAban=()=>{
  setabandonedId("")
  setPrdtOpens(false)
}

const openAban=(val)=>{
  setabandonedId(val)
  setPrdtOpens(true)

}      


  return (
    <div className={styles.orders}>
        <LoadingBar
        color="black"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
         <div className={styles.addprdt} style={{display:prdtOpens?"flex":"none"}}>
  <IoMdClose className={styles.close} onClick={closeAban}/>
  <div className={styles.addprdtbody}>
   <SingleAbandoned getAbandonedId={abandonedId}/>
  </div>
  </div>
<div className={styles.head}>
        <p className={styles.heading}>Abandoneds</p>
        <p></p>
      </div>
<div className={styles.scrollWrapper}>
  <div className={styles.prdtTable}>
    <ul>
      <li>IMAGE</li>
      <li>NUMBER</li>
      <li>CALLED</li>
      <li>STATUS</li>
      <li>AMOUNT</li>
      <li>DATE</li>
      <li>ACTIONS</li>
    </ul>

    {
      orderState?.slice()?.reverse()?.map((item, index) => {
        return (
          <div className={styles.prdtOrders} key={index}>
            <div onClick={() => openAban(item?._id)} className={styles.orderImg}>
              <Image 
                src={modifyCloudinaryUrl(item?.orderItems[0]?.product?.images?.[0]?.url)} 
                alt={item?.orderNumber} 
                width={250} 
                height={200} 
              />
            </div>

            <p className={styles.number}>
              <span>#{item?.orderNumber}</span>
            </p>

            <div className={styles.customerInfo}>
              <p className={styles.name}>{item?.shippingInfo?.firstname} {item?.shippingInfo?.lastname}</p>
              <p className={styles.address}>{item?.shippingInfo?.city}</p>
              <p className={styles.address}>{item?.shippingInfo?.state}</p>
              <p className={styles.phone}>+91 {item?.shippingInfo?.phone}</p>
            </div>

            <p className={styles.status}>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                {item?.orderCalled === "Called" ? (
                  <span style={{ width: '10px', height: '16px', backgroundColor: 'green', borderRadius: '50%', marginLeft: '7px' }}></span>
                ) : item?.orderCalled === "notpicked" ? (
                  <span style={{ width: '10px', height: '16px', backgroundColor: 'red', borderRadius: '50%', marginLeft: '7px' }}></span>
                ) : null}
              </span>
            </p>

            <p className={styles.amount}>
              <span>&#8377;{item?.finalAmount}</span>
              <span>{item?.orderItems?.length} Items</span>
            </p>

            <p className={styles.time}>
              {new Date(item?.createdAt).toLocaleString('en-GB', { hour12: true })}
            </p>

            <div className={styles.marks}>
              <p className={`${styles.ok} ${styles.oks}`} onClick={() => openAban(item?._id)}>
                <abbr title='View'><LuView className={styles.ico1} /></abbr>
              </p>
              <p className={`${styles.ok1} ${styles.oks}`} onClick={() => deleteAban(item)}>
                <abbr title='Delete'><MdDeleteForever className={styles.ico2} /></abbr>
              </p>
            </div>
          </div>
        )
      })
    }
  </div>
</div>
              <div className={styles.paginate}>
        <button onClick={prevPage} disabled={page === 1 ? true : false} style={{ backgroundColor: page === 1 ? 'rgba(219, 224, 255, 1)' : '', cursor: page === 1 ? 'context-menu' : '' }}>
          Prev
        </button>
        <p>{page}</p>
        <button
          onClick={nextPage}
          disabled={orderState?.length < 50 ? true : false}
          style={{ backgroundColor: orderState?.length < 50 ? 'rgba(219, 224, 255, 1)' : '', cursor: orderState?.length < 50 ? 'context-menu' : '' }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Abandoned
