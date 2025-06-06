"use client"
import React, { useState,useEffect,useContext, useRef } from 'react'
import styles from './checkout.module.css'
import { IoMdClose } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { GlobalContext } from '../../../GlobalContext';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { MdVerified } from "react-icons/md";
import Image from 'next/image';
import { debounce } from "lodash"; // For debouncing

const page = () => {
    const [openCheck,setOpenCheck]=useState(false)
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [pincode, setPincode] = useState("")
    const [verified, setVerified] = useState(false)
    const [coupon, setCoupon] = useState("")
    const [couponAmount, setCouponAmount] = useState(null)
    const [offerAmount, setOfferAmount] = useState(0)
    const [otp,setOtp]=useState("")
    const [errors, setErrors] = useState({
      firstname: false,
      lastname: false,
      email: false,
      phone: false,
      address: false,
      city: false,
      state: false,
      pincode: false,
  });
const [payMethod, setPayMethod] = useState("payu")
const [orderType, setOrderType] = useState("Prepaid")
    const [shippingCost, setShippingCost] = useState(0)
    function normalizePhoneNumber(phoneNumber) {
      let cleanNumber = phoneNumber.replace(/\D/g, '');
      if (cleanNumber.startsWith('91') && cleanNumber.length > 10) {
          cleanNumber = cleanNumber.substring(2);
      } else if (cleanNumber.startsWith('0') && cleanNumber.length > 10) {
          cleanNumber = cleanNumber.substring(1);
      }
      return cleanNumber;
    }
    
    const checkClose=()=>{
        setOpenCheck(false)
    }
    const checkOpen=()=>{

      const newErrors = {
        firstname: firstname === "",
        lastname: lastname === "",
        email: email === "",
        phone: phone === "",
        address: address === "",
        city: city === "",
        state: state === "",
        pincode: pincode === "",
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(error => error)) {
        toast.error("Please Fill All the Information");
    } else if (verified === false) {
        toast.error("Please verify Phone Number");
    } else {
        setOpenCheck(true);
    }
    }
    const { myCarts, setMyCart } = useContext(GlobalContext);
    const [cartItems, setCartItems] = useState([]);
    const [orderItems, setOrderItems] = useState([]);


    const [totalAmount,setTotalAmount]=useState(null)
    const [offerNOtotalAmount,setOfferNoTotalAmount]=useState(0)


  useEffect (()=> {
    setCartItems(JSON.parse(localStorage.getItem("cartState")) || [])
    const orderItems = cartItems?.map(({ prdt, id, ...rest }) => rest);
    setOrderItems(orderItems)
},[])
const [offertotalAmount,setoffertotalAmount]=useState(0)
const [prepaidDisc,setprepaidDisc]=useState(0)
useEffect(()=>{
  let sum=0;
  let offer=0;
  let coupo=0;
  let subt=0;
  let offerno=0;
  let saleItems=0;
  let totaloffer=0;
    
  for(let index=0; index < cartItems?.length; index++){
    
      sum =sum+(Number(cartItems[index]?.quantity) *cartItems[index]?.price)
      if(cartItems[index]?.isSale){
        saleItems+=cartItems[index]?.quantity
        totaloffer+=cartItems[index]?.quantity * cartItems[index]?.price
        if(saleItems>=3){
          offer=totaloffer*0.25
          coupo =(totaloffer-totaloffer*0.25)
        }
        else{
          offer=totaloffer*0.20
          coupo =(totaloffer-totaloffer*0.20)
        }
        
      }
      else{
        subt=subt+(Number(cartItems[index]?.quantity) *(cartItems[index]?.price*0.1))
        offerno=offerno+(Number(cartItems[index]?.quantity) *(cartItems[index]?.price))
        coupo =coupo+(Number(cartItems[index]?.quantity) *cartItems[index]?.price)
      }
  }
  setTotalAmount(sum)
  setprepaidDisc(subt)
  setOfferAmount(offer)
  setOfferNoTotalAmount(offerno)
  setoffertotalAmount(coupo)
  if(orderType==="COD"){
    setCouponAmount(0)
  }
  else{
  setCouponAmount(subt)
  }
  const orderItems = cartItems?.map(({ prdt, id, ...rest }) => rest);
  setOrderItems(orderItems)
},[cartItems,myCarts,orderType])
console.log(offertotalAmount)
useEffect (()=> {
    setCartItems(JSON.parse(localStorage.getItem("cartState")) || [])
},[myCarts])

const increaseQty = (item) => {

    const updatedCart = cartItems?.map((cartItem) => {
      if (
        cartItem.id === item.id && // Match by product ID
        cartItem.color === item.color && // Match by color
        cartItem.size === item.size // Match by size
      ) {
        // Find the stock for the matching variant
        const matchingVariant = cartItem.prdt.variants.find(
          (variant) =>
            variant.color === cartItem.color &&
            variant.size === cartItem.size
        );
  
        // Check if matchingVariant exists and if quantity is less than stock
        if (matchingVariant && cartItem.quantity < matchingVariant.quantity) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1, // Increase quantity
          };
        }
      }
      return cartItem;
    });
  
    setMyCart(updatedCart); // Update the cart state
    localStorage.setItem("cartState", JSON.stringify(updatedCart)); // Persist the updated cart
  };
  
  
  const decreaseQty = (item) => {
    const updatedCart = cartItems
      ?.map((cartItem) => {
        if (
          cartItem.id === item.id && // Match by product ID
          cartItem.color === item.color && // Match by color
          cartItem.size === item.size // Match by size
        ) {
          const newQuantity = cartItem.quantity - 1; // Decrease quantity by 1
          return newQuantity > 0
            ? { ...cartItem, quantity: newQuantity } // Update item with new quantity
            : null; // If quantity becomes 0, mark it for removal
        }
        return cartItem; // Leave other items unchanged
      })
      .filter((cartItem) => cartItem !== null); // Remove items marked as null
  
    setCartItems(updatedCart); // Update the cart state
    setMyCart(updatedCart); // Update global cart state
    localStorage.setItem("cartState", JSON.stringify(updatedCart)); // Persist updated cart to local storage
  };

  useEffect(()=>{
    localStorage.setItem("shippingInfo",JSON.stringify({
      firstname,
      lastname,
      email,
      phone:normalizePhoneNumber(phone),
      city,
      address,
      state,
      pincode
    }))

  },[firstname,lastname,phone,email,city,address,pincode,state])
  useEffect(()=>{
    const address = localStorage.getItem("shippingInfo");
    if (!address) {
      localStorage.setItem("shippingInfo", JSON.stringify([])); // Initialize as an empty array
    }
  },[])
  const [address1,setAddress1]=useState()
  useEffect(()=>{
    setAddress1(JSON.parse(localStorage.getItem("shippingInfo")))
  },[])
  useEffect(() => {
    if (!firstname && !lastname && !email && !address && !phone && !city && !state && !pincode) {
        setFirstname(address1?.firstname || "")
        setLastname(address1?.lastname || "")
        setEmail(address1?.email || "")
        setAddress(address1?.address || "")
        setCity(address1?.city || "")
        setState(address1?.state || "")
        setPincode(address1?.pincode || "")
    }
}, [address1, firstname, lastname, email, address, city, state, pincode])

const codClick = () => {
  setShippingCost(200)
  setOrderType("COD")
  setPayMethod("cod")
  toast.error("Oops, you are missing top deals by selecting COD")
}
const payuClick = () => {
  setShippingCost(0)
  setOrderType("Prepaid")
  setPayMethod("payu")
}
const phonepeClick = () => {
  setShippingCost(0)
  setOrderType("Prepaid")
  setPayMethod("phonepe")
}

const finalAmount = shippingCost + totalAmount - couponAmount - offerAmount


const applyCoupon = async() => {
  try {
      const response = await fetch("/api/coupon/apply-coupon", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              name: coupon,
              totalAmount:offerNOtotalAmount,
              customerType: "all", // replace as needed
              cartItemCount: cartItems?.length,
              customerEmail: email,
          }),
      });

      const data = await response.json();
      if (response.ok) {
          setCouponAmount(parseInt(data.discountAmount));
          if (data.discountType === "freeShip") {
              setShippingCost(0);
          }
          toast.success("Coupon Code Applied");
      } else {
          toast.error("Invalid Coupon");
      }
  } catch (error) {
      console.error("Error applying coupon:", error);
      toast.error("Failed to apply coupon.");
  }
};

const [isRead, setIsread] = useState(false)
const initialTime = 60;

const [timeLeft, setTimeLeft] = useState(initialTime);
const [intervalId, setIntervalId] = useState(null);

const [otpOpen,setOtpOpen]=useState(false)
// const sendOtp = async () => {
//   if (phone?.length < 10) {
//     toast.error("Please Enter a Valid Phone Number");
//   } else if (phone === "9826333937") {
//     toast.error("You are not eligible");
//   } else {
//     setOtpOpen(true);
    
//     // Prepare the request options for sending OTP
//     try {
//       const response = await fetch(`https://cpaas.messagecentral.com/verification/v3/send?countryCode=91&customerId=C-99F4F3D347BF4E0&flowType=SMS&mobileNumber=${normalizePhoneNumber(phone)}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'authToken': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDLTk5RjRGM0QzNDdCRjRFMCIsImlhdCI6MTc0MjAyNDAzOSwiZXhwIjoxODk5NzA0MDM5fQ.Z2KJKH-m3IGnAMZe14q9H65iT-CD5eG5kos0KEDz8-5uftZQkuKG_0-jrj13k4F6QGAmHwOPoctbF3WPTg4dVA'
//         }
//       });
  
//       if (response.ok) {
//         const data = await response.json();
//         setVId(data.data.verificationId);
//         setTimeLeft(initialTime);
//         toast.success("OTP sent successfully");

//         // Start the countdown timer
//         if (intervalId) clearInterval(intervalId);
//         const id = setInterval(() => {
//           setTimeLeft((prevTime) => {
//             if (prevTime <= 1) {
//               clearInterval(id);
//               return 0;
//             }
//             return prevTime - 1;
//           });
//         }, 1000);
//         setIntervalId(id);
//       } else {
//         const errorData = await response.json();
//         toast.error(errorData.message || "Failed to send OTP");
//       }
//     } catch (error) {
//       toast.error("An error occurred while sending OTP");
//       console.error(error);
//     }
//   }
// };

const sendOtp = async () => {
  if (phone?.length < 10) {
    toast.error("Please Enter a Valid Phone Number");
  } else if (phone === "9826333937") {
    toast.error("You are not eligible");
  } else {
    setOtpOpen(true);
    
    // Prepare the request options for sending OTP
    try {
      const res = await fetch(`/api/twilio/send-otp?phone=${normalizePhoneNumber(phone)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      const data = await res.json();
      if (data.success){
        setTimeLeft(initialTime);
        toast.success("OTP sent successfully");
        // Start the countdown timer
        if (intervalId) clearInterval(intervalId);
        const id = setInterval(() => {
          setTimeLeft((prevTime) => {
            if (prevTime <= 1) {
              clearInterval(id);
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
        setIntervalId(id);
      } else {
        toast.error("Failed to send OTP");
      }
    } catch (error) {
      toast.error("An error occurred while sending OTP");
      console.log(error);
    }
  }
};

const formatTime = () => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};

// const verifyOtp = async () => {
//   const code = otp; // The OTP entered by the user
//   // Prepare the request options for verifying OTP
//   try {
//     const response = await fetch(`https://cpaas.messagecentral.com/verification/v3/validateOtp?countryCode=91&mobileNumber=${normalizePhoneNumber(phone)}&verificationId=${vId}&customerId=C-99F4F3D347BF4E0&code=${code}`, {
//       method: 'GET',
//       headers: {
//         'authToken': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDLTk5RjRGM0QzNDdCRjRFMCIsImlhdCI6MTc0MjAyNDAzOSwiZXhwIjoxODk5NzA0MDM5fQ.Z2KJKH-m3IGnAMZe14q9H65iT-CD5eG5kos0KEDz8-5uftZQkuKG_0-jrj13k4F6QGAmHwOPoctbF3WPTg4dVA'
//       }
//     });

//     if (response.ok) {
//       const data = await response.json();
//       if (data.data.verificationStatus=="VERIFICATION_COMPLETED") { // Adjust this condition based on the actual response structure
//         setVerified(true);
//         toast.success("VERIFIED");
//         setIsread(true);
//         setOtpOpen(false);
//       } else {
//         setVerified(false);
//         setIsread(false);
//         toast.error("Wrong OTP");
//       }
//     } else {
//       const errorData = await response.json();
//       toast.error(errorData.message || "Error verifying OTP");
//     }
//   } catch (error) {
//     toast.error("Error verifying OTP");
//     console.error(error);
//   }
// };
const verifyOtp = async () => {
  const code = otp; // The OTP entered by the user
  // Prepare the request options for verifying OTP
  try {
    const res = await fetch(`/api/twilio/verify-otp?phone=${normalizePhoneNumber(phone)}&code=${code}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (data.success) {
        setVerified(true);
        toast.success("VERIFIED");
        setIsread(true);
        setOtpOpen(false);
    
    } else {
      const errorData = await response.json();
      toast.error(errorData.message || "Error verifying OTP");
    }
  } catch (error) {
    toast.error("Error verifying OTP");
    console.log(error);
  }
};

const [paySpin,setPaySpin]=useState(false)

const completeOrder = () => {
  const newErrors = {
    firstname: firstname === "",
    lastname: lastname === "",
    email: email === "",
    phone: phone === "",
    address: address === "",
    city: city === "",
    state: state === "",
    pincode: pincode === "",
};
setErrors(newErrors);
if (Object.values(newErrors).some(error => error)) {
    toast.error("Please Fill All the Information");
} else if (verified === false) {
    toast.error("Please verify Phone Number");
}  else {
  setPaySpin(true)
  localStorage.setItem("address", JSON.stringify({
      firstname: firstname,
      lastname: lastname,
      email: email,
      address: address,
      phone: normalizePhoneNumber(phone),
      city: city,
      state: state,
      pincode: pincode,
      isVarified: verified
  }))
  if (cartItems?.length >= 1) {
      setTimeout(() => {
          checkOutHandler()
      }, 300)
      window.fbq('track', 'InitiateCheckout', {
        content_ids:cartItems?.map((item) => item?.id),
        content_type: 'product',
        value:finalAmount,
        currency: 'INR'
    });
    // const handleAddToCartEvent = async () => {
    //   try {
    //     const response = await fetch('/api/meta', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         eventName: 'InitiateCheckout',
    //         eventData: {
    //           content_ids:cartItems?.map((item) => item?.id),
    //     content_type: 'product',
    //     value:finalAmount,
    //     currency: 'INR'
    //         },
    //       }),
    //     });
    
    //     const result = await response.json();
    //     console.log('Event sent successfully:', result);
    //   } catch (error) {
    //     console.error('Error sending event:', error);
    //   }
    // };
    // handleAddToCartEvent()
    const addToCartEvent=async()=>{
      try{
        const response=await fetch(`/api/chart/post-event?event=Initiate Checkout`,{
          method:"POST",
          headers:{
            "Content-type":"application/json"
          }
        })
  
      }catch(err){
        console.log(err)
      }
    }
    addToCartEvent()
  }
}

 
}


const createOrder = async (orderData) => {
  try {
    setPaySpin(true); // Assuming `setPaySpin` is a state setter for loading indicator
    const response = await fetch("/api/order/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      window.location.href = `/thankyou?orderNumber=${data.orderNumber}&firstname=${data.firstname}&amount=${data.amount}`;
      
    } else {
      alert(data.error || "Order creation failed. Please try again.");
    }
  } catch (error) {
    console.error("Error creating order:", error.message);

    alert(error.message || "Something went wrong. Please try again later.");
  } finally {
    // Ensure loading spinner is stopped after the process is complete
    setPaySpin(false);
  }
};



const generateUniqueId = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
  const dateTimeString = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
  const randomElement = Math.random().toString(36).substring(2, 10);
  const uniqueId = `${dateTimeString}-${randomElement}`;
  return uniqueId;
};

const [uniqueId, setUniqueId] = useState('');
const [transactionId, setTransactionId] = useState(null)
const [hash, setHash] = useState(null)
useEffect(() => {
  const id = generateUniqueId();
  setUniqueId(id);
  setTransactionId(id)
}, []);

const phonePePayment = async ({amount, number, merchantTransactionId,shippingInfo, orderItems, totalPrice, finalAmount, shippingCost, orderType, discount, paymentInfo, tag, isPartial}) => {
  try {
    // Payload for the POST request
    const payload = {
      amount,
      number,
      merchantTransactionId,
      shippingInfo, orderItems, totalPrice, finalAmount, shippingCost, orderType, discount, paymentInfo, tag, isPartial
    };

    // Send POST request to initiate payment
    const response = await fetch("/api/phonepe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(payload)
    });

    const data = await response.json();
console.log(data,response)
    if (response.ok && data.success) {
      // Redirect to the payment URL
      const paymentUrl = data.url; // Corrected to use the `url` from the `data` object
      window.location.href = paymentUrl; // Redirect user to PhonePe payment page
    } else {
      console.error("Payment initiation failed:", data.error || "Unknown error");
      alert(data.error || "Payment initiation failed. Please try again.");
    }
  } catch (error) {
    console.error("Error in payment initiation:", error.message);
    alert("An error occurred while processing the payment. Please try again.");
  }
};


const getHash =async () => {
  try {
    // Payload for the POST request
    const payload = {
      transactionId:uniqueId,
      firstname,
      email,
      phone, 
      orderItems:orderItems, 
      totalPrice:totalAmount, 
      finalAmount, 
      shippingCost, 
      discount:couponAmount + offerAmount
    };

    // Send POST request to initiate payment
    const response = await fetch("/api/payu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(payload)
    });

    const data = await response.json();
    console.log(data,response)

    if (response.ok && data.success) {
      // Redirect to the payment URL
      setHash(data.hash)
      setTransactionId(data.transactionId)
    } else {
      console.error("Payment initiation failed:", data.error || "Unknown error");
      alert(data.error || "Payment initiation failed. Please try again.");
    }
  } catch (error) {
    console.error("Error in payment initiation:", error.message);
    alert("An error occurred while processing the payment. Please try again.");
  }
}

const [payUOpen,setPayUOpen]=useState(false)

const checkOutHandler =() => {
  if (orderType === "COD") {
      const data = {
          orderCreationId: "COD", 
          razorpayPaymentId: "COD",
          razorpayOrderId: "COD", 
      };
      createOrder({ totalPrice: totalAmount, finalAmount: finalAmount, shippingCost: shippingCost, orderType: orderType, discount: couponAmount + offerAmount, orderItems: orderItems, paymentInfo: data, shippingInfo: JSON.parse(localStorage.getItem("address")), tag: "Voguemine", isPartial: false })
  }

  else {
      if (payMethod === "phonepe") {
          const data = {
              orderCreationId: "Prepaid", // Set a placeholder value for order creation ID for COD orders
              razorpayPaymentId: uniqueId, // Set a placeholder value for Razorpay payment ID for COD orders
              razorpayOrderId: "Phonepe", // Set a placeholder value for Razorpay order ID for COD orders
          };
         phonePePayment({amount:finalAmount, number:phone, merchantTransactionId:uniqueId, totalPrice: totalAmount, finalAmount: finalAmount, shippingCost: shippingCost, orderType: orderType, discount: couponAmount + offerAmount, orderItems: orderItems, paymentInfo: data, shippingInfo:{firstname,lastname,email,phone,address,city,state,pincode}, tag: "Voguemine", isPartial: false })
      }
      if (payMethod === "payu") {
          getHash()
          setPayUOpen(true)
          setPaySpin(false)
         
      }
    }
    }


    const modifyCloudinaryUrl = (url) => {
      const urlParts = url?.split('/upload/');
      return urlParts && `${urlParts[0]}/upload/c_limit,h_1000,f_auto,q_50/${urlParts[1]}`;
    };    

    const payUdata={totalPrice: totalAmount, finalAmount: finalAmount, shippingCost: shippingCost, orderType: orderType, discount: couponAmount + offerAmount, orderItems: orderItems, paymentInfo: {
      orderCreationId: "Prepaid", // Set a placeholder value for order creation ID for COD orders
      razorpayPaymentId: `${transactionId}`, // Set a placeholder value for Razorpay payment ID for COD orders
      razorpayOrderId: "PayU", // Set a placeholder value for Razorpay order ID for COD orders
  }, shippingInfo:{firstname,lastname,email,phone,address,city,state,pincode}, tag: "Voguemine", isPartial: false }

  const abandoneddata={totalPrice: totalAmount, finalAmount: finalAmount, shippingCost: shippingCost, orderType: orderType, discount: couponAmount + offerAmount, orderItems: orderItems, paymentInfo: {
    orderCreationId: "COD", // Set a placeholder value for order creation ID for COD orders
    razorpayPaymentId: `COD`, // Set a placeholder value for Razorpay payment ID for COD orders
    razorpayOrderId: "COD", // Set a placeholder value for Razorpay order ID for COD orders
}, shippingInfo:{firstname,lastname,email,phone,address,city,state,pincode}, tag: "Voguemine", isPartial: false }
const [hasAbandonedBeenCreated, setHasAbandonedBeenCreated] = useState(false);

const createAbandonedCart = async () => {
  try {
    const response = await fetch("/api/abandoned/create-abandoned", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(abandoneddata),
    });
    if (response.ok) {
      console.log("Abandoned cart created successfully");
    } else {
      console.error("Failed to create abandoned cart");
    }
  } catch (error) {
    console.error("Error creating abandoned cart:", error);
  }
};

const debouncedCreateAbandoned = debounce(() => {
  // Trigger if firstname and phone are filled, and hasn't already triggered
  if (
    firstname !== "" &&
    phone?.length === 10 &&
    !hasAbandonedBeenCreated
  ) {
    if (cartItems?.length > 0) {
      createAbandonedCart();
      setHasAbandonedBeenCreated(true); // Mark as triggered
    }
  }
}, 2000);

useEffect(() => {
  debouncedCreateAbandoned();
  return () => {
    debouncedCreateAbandoned.cancel();
  };
}, [firstname, phone, cartItems]);

  return (
    <>
    {
        cartItems?.length>0?
        <div className={styles.checkout}>
        <div className={styles.overlay} style={{display:openCheck?"block":"none"}}></div>
        <div className={styles.otpVerify} style={{display:otpOpen?"flex":"none"}}>
       <div>
        <p className={styles.timeClose} onClick={(e)=>setOtpOpen(false)}><IoMdClose/></p>
       {
        timeLeft > 0 ? <p>Try Again in: {formatTime()}</p> :
            ""}
        <input type="number" value={otp} placeholder='Enter OTP' onChange={(e) => setOtp(e.target.value)} maxLength={6} />
        {
        timeLeft > 0 ? <button  onClick={verifyOtp}>Verify</button>
            :
            <button onClick={sendOtp} >SEND AGAIN</button>

    }
   
       </div>
        </div>
        <div className={styles.paySpin} style={{display:paySpin?"flex":"none"}}>
          <img src="https://global.discourse-cdn.com/sitepoint/original/3X/e/3/e352b26bbfa8b233050087d6cb32667da3ff809c.gif" alt="checkout" />
        </div>
        <div className={styles.payUForm} style={{display:payUOpen?"flex":"none"}}>
          <div className={styles.payUWhite}>
          <div className={styles.payuHead}>
            <p>Your Payment Details</p>
            <p><IoMdClose/></p>
          </div>
          <div className={styles.payUDetails}>
            <p><span>FirstName:</span><span>{firstname}</span></p>
            <p><span>Email:</span><span>{email}</span></p>
            <p><span>Phone:</span><span>{phone}</span></p>
            <p><span>Amount:</span><span>{finalAmount}</span></p>
          </div>
          <div className={styles.payUPayNow}>
          <form action="https://secure.payu.in/_payment" method="post">
  <input type="hidden" name="key" value="UMp7He" />
  <input type="hidden" name="txnid" value={transactionId || ""} />
  <input type="hidden" name="productinfo" value={phone || ""} />
  <input type="hidden" name="amount" value={finalAmount || ""} />
  <input type="hidden" name="email" value={email || ""} />
  <input type="hidden" name="firstname" value={firstname || ""} />
  <input type="hidden" name="lastname" value={lastname || ""} />
  <input
    type="hidden"
    name="surl"
    value={`https://voguemine.com/api/payu/success?orderData=${encodeURIComponent(
  JSON.stringify({payUdata})
)}`}
  />
  <input type="hidden" name="furl" value="https://voguemine.com/api/payu/failed" />
  <input type="hidden" name="phone" value={phone || ""} />
  <input type="hidden" name="udf1" value={"details1"} />
  <input type="hidden" name="udf2" value={"details2"} />
  <input type="hidden" name="udf3" value={"details3"} />
  <input type="hidden" name="udf4" value={"details4"} />
  <input type="hidden" name="udf5" value={"details5"} />
  <input type="hidden" name="hash" value={hash || ""} />
  <div className="sbmt">
    <button type="submit" onClick={(e)=>setPaySpin(true)}>Pay Now</button>
  </div>
</form>

                            </div>
          </div>
        </div>
      <div className={styles.checkoutLeft}>
        <p className={styles.checkoutHeads}>Checkout Information</p>
            <div className={styles.personalInfo}>
                <p>Personal Information</p>
                <div className={errors.firstname ? styles.error : ""}>
                    <input type="text" placeholder='First Name*' value={firstname} onChange={(e) => {setFirstname(e.target.value);setErrors({ ...errors, firstname: false });}} />
                </div>
                <div className={errors.lastname ? styles.error : ""}>
                    <input type="text" placeholder='Last Name*' value={lastname} onChange={(e) => {setLastname(e.target.value);setErrors({ ...errors, lastname: false });}} />
                </div>
                <div className={`${styles.otpInput} ${errors.phone ? styles.error : ""}`}>
                    <input type="number" placeholder='Phone Number*' value={phone} readOnly={isRead} onChange={(e) => {setPhone(e.target.value);setErrors({ ...errors, phone: false });}} />
                    {
                      verified?
                      <p style={{color:"green",marginTop:'15px'}}><MdVerified/></p>
                      :
                    <button onClick={sendOtp}>Send Otp</button>
}
                </div>
            </div>
            <div className={styles.personalInfo}>
                <p>Delivery Information</p>
                <div className={errors.email ? styles.error : ""}>
                    <input type="email" placeholder='Email*' value={email} onChange={(e) => {setEmail(e.target.value);setErrors({ ...errors, email: false });}} />
                </div>
                <div className={errors.address ? styles.error : ""}>
                    <input type="text" placeholder='Address*' value={address} onChange={(e) => {setAddress(e.target.value);setErrors({ ...errors, address: false });}} />
                </div>
                <div className={errors.city ? styles.error : ""}>
                    <input type="text" placeholder='City*' value={city} onChange={(e) => {setCity(e.target.value);setErrors({ ...errors, city: false });}} />
                </div>
                <div className={errors.state ? styles.error : ""}>
                <select name="state" placeholder="State*" value={state} onChange={(e) => {setState(e.target.value);setErrors({ ...errors, state: false });}} >
                        <option value="">State</option>
                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                        <option value="Daman and Diu">Daman and Diu</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Orissa">Orissa</option>
                        <option value="Pondicherry">Pondicherry</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttaranchal">Uttaranchal</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="West Bengal">West Bengal</option>
                    </select>
                </div>
                <div className={errors.pincode ? styles.error : ""}>
                    <input type="number" placeholder='Pincode*' value={pincode} onChange={(e) => {setPincode(e.target.value);setErrors({ ...errors, pincode: false });}} />
                </div>
            </div>
            <div className={styles.continue} onClick={checkOpen}><button>Continue</button></div>
      </div>
      <div className={styles.checkoutRight} style={{bottom:openCheck?0:"-100%"}}>
        <p className={styles.closeCheck} onClick={checkClose} style={{display:openCheck?"flex":"none"}}><IoMdClose/></p>
        <p className={styles.checkoutHeads}>Order Summary</p>
        {
            cartItems?.map((item,index)=>{
return  <div className={styles.checkoutItems} key={index}>
<div className={styles.checkoutItem}>
    <Image src={modifyCloudinaryUrl(item?.prdt?.images[0]?.url)} alt={item?.prdt?.title} width={500} height={100} style={{height:'100%'}} placeholder='blur' blurDataURL="data:image/jpeg;base64,..."/>
    <div className={styles.checkoutItemInfo}>
        <p className={styles.prdtName}>
        {item?.prdt?.title}        
        </p>
        <p className={styles.variant}>
            <span>{item?.color}</span>
            <span>/</span>
            <span>{item?.size}</span>
        </p>
        <div>
        <div className={styles.qty}>
            <div>
            <span onClick={(e)=>decreaseQty(item)}>-</span>
            <span>{item?.quantity}</span>
            <span onClick={(e)=>increaseQty(item)}>+</span>
            </div>
            {
                          item?.isSale?
                          <p style={{display:'flex',alignItems:'center',fontSize:'17px',justifyContent:"flex-end",width:"100%"}}><span style={{color:'gray',fontSize:'13px',textDecoration:'line-through',marginRight:'5px',border:"none",width:"100%"}}>Rs. {item?.price}</span><span style={{border:"none",width:"100%"}}>Rs. {((item?.price)-(item?.price*0.2))}</span></p>
:
<p>Rs. {item?.price}</p>

                        }
        </div>
        </div>
    </div>
</div>
</div>
            })
        }
        <div className={styles.coupon}>
          <p className={styles.paymentHead}>Apply Coupon</p>
          <div>
          <input type="text" placeholder='Enter Coupon Code' value={coupon} onChange={(e)=>setCoupon(e.target.value)}/>
          <button onClick={applyCoupon}>Apply</button>
          </div>
        </div>
       
        <div className={styles.paymentMethods}>
            <p className={styles.paymentHead}>Payment Options</p>
            <div className={`${styles.paymentOption} ${payMethod==="cod"?styles.active:""}`} onClick={codClick}>
                <div><img src="https://png.pngtree.com/png-clipart/20210530/original/pngtree-badge-of-cash-on-delivery-vector-illustration-png-image-png-image_6339704.png" alt="COD" />
                <p>Cash On Delivery</p></div>
                <p>Rs. {parseInt(totalAmount + 200 - offerAmount)}</p>
            </div>
            <div className={`${styles.paymentOption} ${payMethod==="payu"?styles.active:""}`} onClick={payuClick}>
                <div>
                <img src="https://1000logos.net/wp-content/uploads/2023/03/PayU-logo.jpg" alt="payu online payments" />
                <p>PayU Online Payments</p>
                </div>
                <p>Rs. {parseInt(totalAmount - prepaidDisc - offerAmount)}</p>
            </div>
           <div className={`${styles.paymentOption} ${payMethod==="phonepe"?styles.active:""}`} onClick={phonepeClick}>
                <div>
                <img src="https://seeklogo.com/images/P/phonepe-logo-B9E7D6F75F-seeklogo.com.png" alt="phonepe online payments" />
                <p>PhonePe Online Payments</p>
                </div>
                <p>Rs. {parseInt(totalAmount - prepaidDisc - offerAmount)}</p>
            </div>
        </div>
        <div className={styles.checkoutTotal}>
            <ul>
                <li>Subtotal</li>
                <li>Shipping</li>
                <li>Discount</li>
                <li>Total</li>
            </ul>
            <ul>
                <li>Rs. {totalAmount}</li>
                <li>Rs. {shippingCost}</li>
                <li>-Rs. {parseInt(couponAmount)}</li>
                <li>Rs. {parseInt(finalAmount)}</li>
            </ul>
        </div>
        <div className={styles.address}>
            <p>{firstname} {lastname}</p>
            <p>{address} , {city}</p>
            <p>{state}, {pincode}</p>
            <p>{phone}</p>
            <p onClick={checkClose}><CiEdit/></p>
        </div>
        <div className={styles.checkoutBtn} style={{bottom:openCheck?0:"-100%"}}>
            <button onClick={completeOrder}>Checkout (Rs. {finalAmount})</button>
        </div>
      </div>
    </div>
    :
    <div style={{margin:"70px 1rem",display:"flex",justifyContent:"center",alignItems:"center",height:"80vh",width:"100%",flexDirection:"column",textAlign:"center"}}>
        <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="empty cart" style={{width:"200px",aspectRatio:'1/1',marginBottom:"20px"}}/>
        <p style={{color:"black",fontWeight:'600',fontSize:"25px",marginBottom:"20px"}}>Nothing In Your Cart for Checkout</p>
        <Link href="/"><button style={{padding:"8px 20px",backgroundColor:"black",color:"white",border:"none",letterSpacing:"1px",fontSize:"17px",fontWeight:"500",cursor:"pointer"}}>Let's Add Something</button></Link>
    </div>
    }
    </>
    
  )
}

export default page
