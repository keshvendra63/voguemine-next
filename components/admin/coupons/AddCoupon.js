import React, { useContext, useEffect, useState } from 'react'
import styles from './coupon.module.css'
import toast from 'react-hot-toast'
import { GlobalContext } from '../../../GlobalContext'
import axios from 'axios'
const AddCoupon = ({couponId}) => {
    const [user,setUser]=useState("")
    const {setPrdtOpens}=useContext(GlobalContext)
    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem("user")))
    },[])

    const [discountName,setDiscountName]=useState("")
    const [discountType,setDiscountType]=useState("order")
    const [expiry,setExpiry]=useState("")
    const [customerType,setCustomerType]=useState("all")
    const [discountAmount,setDiscountAmount]=useState("null")
    const [status,setStatus]=useState("draft")
    const [minItem,setMinItem]=useState(0)
    const [customerEmail,setCustomerEmail]=useState("")
    const [minNone,setMinNone]=useState("none")
    const [mailNone,setMailNone]=useState("none")
    const [priceNone,setPriceNone]=useState("block")
    const [myotp,setMyOtp]=useState('')

useEffect(()=>{
    if(couponId===""){
        setDiscountType("order")
        setDiscountName("")
        setExpiry("")
        setCustomerType("all")
        setDiscountAmount("null")
        setStatus("draft")
        setMinItem(0)
        setCustomerEmail("")
    }
    else{
        const getCoupon=async()=>{
            try{
                const response=await fetch(`/api/coupon/get-coupon?id=${couponId}`)
                const data=await response.json()
                if(response.ok){
                    setDiscountType(data.discounttype)
        setDiscountName(data.name)
        setExpiry(data.expiry)
        setCustomerType(data.customertype)
        setDiscountAmount(data.discount)
        setStatus(data.status)
        setMinItem(data.minItem)
        setCustomerEmail(data.cEmail)
                }
            }catch(err){
                console.log(err)
            }
        }
        getCoupon()
    }
},[couponId])


    const generateOtp = () => {
      return Math.floor(10000000 + Math.random() * 90000000);
    };
    
    const [vId,setVId]=useState("")
    
        const sendOtp = async () => {            
            // Prepare the request options for sending OTP
            try {
              const response = await fetch(`https://cpaas.messagecentral.com/verification/v3/send?countryCode=91&customerId=C-99F4F3D347BF4E0&flowType=SMS&mobileNumber=9811363760`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'authToken': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDLTk5RjRGM0QzNDdCRjRFMCIsImlhdCI6MTc0MjAyNDAzOSwiZXhwIjoxODk5NzA0MDM5fQ.Z2KJKH-m3IGnAMZe14q9H65iT-CD5eG5kos0KEDz8-5uftZQkuKG_0-jrj13k4F6QGAmHwOPoctbF3WPTg4dVA'
                }
              });
          
              if (response.ok) {
                const data = await response.json();
                setVId(data.data.verificationId);
                toast.success("OTP sent successfully");
        
                // Start the countdown timer
              } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Failed to send OTP");
              }
            } catch (error) {
              toast.error("An error occurred while sending OTP");
              console.error(error);
            }
          }
    
  
     useEffect(()=>{
      if(discountType==="buyX"){
        setMinNone("block")
        setPriceNone("block")
      }
      if(discountType==="freeShip"){
        setMinNone("none")
        setPriceNone("none")
      }
      if(discountType==="order"){
        setMinNone("none")
        setPriceNone("block")
      }
  
     },[discountType])
     useEffect(()=>{
      if(customerType==="all"){
        setMailNone("none")
      }
      if(customerType==="specific"){
        setMailNone("block")
      }
  
     },[customerType])
  const createNewDiscount=()=>{
    if(discountName==="" || expiry===""){
      toast.error("Please Fill All the Details")
    }
    else if(discountType==="buyX"){
      if(minItem===""){
        toast.error("Please Fill All the Details")
      }
    }
    else if(customerType==="specific"){
      if(customerEmail===""){
        toast.error("Please Fill All the Details")
      }
    }
    else{
      sendOtp()  
      
    }
  }
  
  const verifyOtp = async() => {
    const response = await fetch(`https://cpaas.messagecentral.com/verification/v3/validateOtp?countryCode=91&mobileNumber=9811363760&verificationId=${vId}&customerId=C-99F4F3D347BF4E0&code=${myotp}`, {
      method: 'GET',
      headers: {
        'authToken': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDLTk5RjRGM0QzNDdCRjRFMCIsImlhdCI6MTc0MjAyNDAzOSwiZXhwIjoxODk5NzA0MDM5fQ.Z2KJKH-m3IGnAMZe14q9H65iT-CD5eG5kos0KEDz8-5uftZQkuKG_0-jrj13k4F6QGAmHwOPoctbF3WPTg4dVA'
      }
    });

    if (response.ok) {
      const data = await response.json();
      if (data.data.verificationStatus=="VERIFICATION_COMPLETED") {
        if(couponId===""){
try{
const response=await fetch(`/api/coupon/create-coupon?token=${user?.token}`,{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({
        name: discountName,
        expiry: expiry,
        discount: discountAmount,
        discounttype: discountType,
        customertype: customerType,
        status: status,
        minItem: minItem,
        cEmail: customerEmail,
      })
})
if(response.ok){
    localStorage.removeItem('otp')
    toast.success('Coupon created successfully');

    const createHistory=async()=>{
        try{
          const response=await fetch("/api/history/create-history",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: user?.firstname,
                title: discountName,
                sku: discountAmount,
                productchange: 'Discount Created',
                time: new Date()
              }),
        })
        if(response.ok){
          setPrdtOpens(false)
        }
        
        }catch(error){
          console.log(error)
        }
        }
        createHistory()


}
}
catch(err){
    console.log(err)
}
        }
        else{
            try{
                const response=await fetch(`/api/coupon/update-coupon?id=${couponId}&token=${user?.token}`,{
                    method:"PUT",
                    headers:{"Content-type":"application/json"},
                    body:JSON.stringify({
                        name: discountName,
                        expiry: expiry,
                        discount: discountAmount,
                        discounttype: discountType,
                        customertype: customerType,
                        status: status,
                        minItem: minItem,
                        cEmail: customerEmail,
                      })
                })
                if(response.ok){
                    localStorage.removeItem('otp')
                    toast.success('Coupon Updated successfully');

                    const createHistory=async()=>{
                        try{
                          const response=await fetch("/api/history/create-history",{
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                name: user?.firstname,
                                title: discountName,
                                sku: discountAmount,
                                productchange: 'Discount Updated',
                                time: new Date()
                              }),
                        })
                        if(response.ok){
                          setPrdtOpens(false)
                        }
                        
                        }catch(error){
                          console.log(error)
                        }
                        }
                        createHistory()
                
                
                }
                else{
                  toast.error("something went wrong")
                }
                }
                catch(err){
                    console.log(err)
                } 
        }

    } else {
      toast.error('Invalid OTP');
    }
  }
  };
  const formattedExpiry = expiry.split("T")[0];

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const isoDate = new Date(selectedDate).toISOString();
    setExpiry(isoDate);
  };
  
  
  return (
    <div className={styles.coupon}>
       <div className={styles.couponHead}>
        <p>Create Coupon</p>
        <div className={styles.right}>
        <button onClick={createNewDiscount}>Send OTP</button>
        <button onClick={verifyOtp}>Verify</button>

        </div>

      </div>
      <div className={styles.couponMake}>
          <div className={styles.centerDiv}>
          <div className={styles.couponType}>
            <p>Select Coupon Type</p>
            <select name="" id="" value={discountType} onChange={(e)=>setDiscountType(e.target.value)}>
              <option value="order">Order Discount</option>
              <option value="buyX">Buy X Get Y</option>
              <option value="freeShip">Free Shipping</option>
            </select>
          </div>
          <div className={styles.name} style={{display:minNone}}>
            <p>Define X Value</p>
            <input type="number" placeholder='Min Items / Min Amount' value={minItem} onChange={(e)=>setMinItem(e.target.value)}/>
          </div>
          <div className={styles.name}>
            <p>Coupon Name</p>
            <input type="text" placeholder='Name' value={discountName} onChange={(e)=>setDiscountName(e.target.value)}/>
          </div>
          <div className={styles.expiry}>
            <p>Select Coupon Expiry</p>
            <input type="date" name="" id="" value={formattedExpiry} onChange={handleDateChange}/>
          </div>
          <div className={styles.couponStatus}>
            <p>What will be the status of this Coupon?</p>
            <select name="" id="" value={status} onChange={(e)=>setStatus(e.target.value)}>
              <option value="draft">Draft</option>
              <option value="active">Active</option>
            </select>
          </div>
          <div className={styles.price} style={{display:priceNone}}>
            <p>Please Input Discount Amount</p>
            <p className={styles.alert}>For percent enter like 10%, for amount like 1999</p>
            <input type="text" placeholder='10% or 2499' value={discountAmount} onChange={(e)=>setDiscountAmount(e.target.value)}/>
          </div>
          <div className={styles.ctype}>
            <p>To whom do you want to give this coupon?</p>
            <select name="" id="" value={customerType} onChange={(e)=>setCustomerType(e.target.value)}>
              <option value="all">All Customers</option>
              <option value="specific">Specific Customer</option>
            </select>
          </div>
          <div className={styles.cmail} style={{display:mailNone}}>
            <p>Please Enter Customer Email</p>
            <input type="email" name="" id="" placeholder='xyz@gmail.com' value={customerEmail} onChange={(e)=>setCustomerEmail(e.target.value)}/>
          </div>
          <div className={styles.otp}>
            <p>Please Enter OTP</p>
            <input type="text" name="" id="" placeholder='OTP here' value={myotp} onChange={(e)=>setMyOtp(e.target.value)}/>
          </div>
          </div>
      </div>
    </div>
  )
}

export default AddCoupon
