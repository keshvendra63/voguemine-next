"use client"
import React,{useEffect,useState,useContext} from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { GlobalContext } from "../GlobalContext";
import toast from 'react-hot-toast';

const ProductCard = ({item}) => {
    const [cartSize,setCartSize]=useState("")
    const [cartColor,setCartColor]=useState(item?.variants[0]?.color || "")
    const {myCarts,setMyCart } = useContext(GlobalContext);
    const [alreadyAdded, setAlreadyAdded] =useState(false)
    const [sold,setSold]=useState(false)
    useEffect(()=>{
setCartColor((item?.variants[0]?.color || "").trim())
    },[item])
  const [cart, setCart] = useState([]);
  useEffect(() => {
    if (item?.variants) {
      const firstAvailableVariant = item?.variants?.find(variant => variant.quantity > 0);
      if (firstAvailableVariant) {
        setCartSize((firstAvailableVariant.size).trim());

      }
    }
  }, [cartColor,item]);
  useEffect(() => {
    if (item?.variants) {
      if(cartSize && cartColor){
        const isSoldOut = item?.variants?.find(variant => (variant.color).trim()===cartColor.trim() && (variant.size).trim()===cartSize.trim() && variant.quantity > 0);
      if (isSoldOut) {
        setSold(false)
      }
      else{
        setSold(true)

      }

      }
      else{
        setSold(true)
      }
      
    }
  }, [cartColor,cartSize,item]);


  useEffect(()=>{
    setCart(JSON.parse(localStorage.getItem("cartState")) || [])
    },[])
  useEffect(()=>{
  setCart(JSON.parse(localStorage.getItem("cartState")) || [])
  },[myCarts])
  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cartState")) || [];
    const updatedCart = [...existingCart, {id:item?._id,color:cartColor,size:cartSize,quantity:1,product:item?._id,price:item?.price,sku:item?.sku,prdt:item,isSale:item?.isSale}];
    localStorage.setItem("cartState", JSON.stringify(updatedCart));
    setMyCart(updatedCart)
    setCart(updatedCart)
    toast.success("Product Added to Cart")
    window.fbq('track', 'AddToCart', {
      content_name:`${item?.title}`,
      content_category: 'Product',
      content_ids:`${item?._id}`,
      content_type: 'product',
      value:item?.price,
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
  //         eventName: 'AddToCart',
  //         eventData: {
  //           content_name:`${item?.title}`,
  //     content_category: 'Product',
  //     content_ids:`${item?._id}`,
  //     content_type: 'product',
  //     value:item?.price,
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
      const response=await fetch(`/api/chart/post-event?event=Add To Cart`,{
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
  };

  const handleRemoveFromCart = () => {
    const updatedCart = cart?.filter(
      (items) =>
        !(items.id === item._id && items.size === cartSize && items.color === cartColor)
    );
    setCart(updatedCart);
    const addToCartEvent=async()=>{
      try{
        const response=await fetch(`/api/chart/post-event?event=Remove From Cart`,{
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
    setMyCart(updatedCart)
    localStorage.setItem("cartState", JSON.stringify(updatedCart));
    toast.success("Removed from Cart");
  };

  useEffect(() => {
    if (!cartColor || !cartSize) {
      // If color or size is not selected, set alreadyAdded to false
      setAlreadyAdded(false);
      return;
    }
  
    const matchingCartItem = cart?.find(items => {
      return items?.id === item?._id && (items?.color).trim() === cartColor.trim() && (items?.size).trim() === cartSize.trim();
    });
    if (matchingCartItem) {
      // If a matching cart item is found, set alreadyAdded to true
      setAlreadyAdded(true);
    } else {
      // If no matching cart item is found, set alreadyAdded to false
      setAlreadyAdded(false);
    }
  }, [cartColor, cartSize, item,cart,myCarts]);

  const modifyCloudinaryUrl = (url) => {
    const urlParts = url?.split('/upload/');
    return urlParts && `${urlParts[0]}/upload/c_limit,h_1000,f_auto,q_50/${urlParts[1]}`;
  };
  return (
    <div className="collectionPrdt">
                    {/* img src={} alt="" className={styles.collectionImage} fill/> */}
                    {
                        alreadyAdded?
                        <p className="alreadyAdded">In Cart</p>
                        :
                        ""
                    }
                    
                    <Link href={`/products/${item?.handle}`}>
                    <Image
src={modifyCloudinaryUrl(item?.images[0]?.url || item?.images[1]?.url)}
alt={item?.title}
className="collectionImage"
placeholder='blur'
blurDataURL="data:image/jpeg;base64,..."
width={1024}
height={270}
/></Link>
                    
                  <div className="prdtInfo">
                      <p className="prdtName">{item?.title}</p>
                      <p className="prdtSku">{item?.sku}</p>

                      <ul>
                      {item?.variants
.map((variant, index) => (
  <li
    key={index}
    style={{
      opacity:variant.quantity === 0 ? "0.3" : "1",
      textDecoration:variant.quantity === 0 ? "line-through" : "none",
      textDecorationThickness: variant.quantity === 0 ? '1px' : 'auto',
      pointerEvents: variant.quantity === 0 ? 'none' : 'auto', // Disable pointer events if quantity is 0
      color:cartSize.trim()===(variant?.size).trim()?"black":"black",border:cartSize.trim()===(variant?.size).trim()?"1px solid black":"1px solid rgb(202, 202, 202)"
    }}
    onClick={(e)=>setCartSize((variant?.size).trim())}
  >
    {variant.size}
  </li>
))}
                      </ul>
                      <div className="prdtPrices">
                          <p><span >Rs. {item?.price}</span><span>Rs. {parseInt(item?.price*2.5)}</span></p>

                          {
                            sold && alreadyAdded?
                          <button onClick={handleRemoveFromCart}>Remove From Cart</button>
                          :sold && !alreadyAdded?
                          <button className="soldBtn" disabled={true}>SOLD OUT</button>
                          :!sold && alreadyAdded?
                          <button onClick={handleRemoveFromCart}>Remove From Cart</button>
:!sold && !alreadyAdded?
<button onClick={addToCart}>Add to Cart</button>
:
""

                            
                          }
                      </div>
                  </div>
              </div>
  )
}

export default ProductCard
