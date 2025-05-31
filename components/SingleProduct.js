"use client"
import React,{ useEffect, useState,useContext, useRef, useMemo } from 'react'
import styles from '../src/app/products/[pid]/singleProduct.module.css'
import { IoIosStar } from "react-icons/io";
import { CiRuler } from "react-icons/ci";
import toast from 'react-hot-toast';
import { GlobalContext } from "../GlobalContext";
import Image from 'next/image';
import BasicTabs from './ProductDescTabs';
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const SingleProduct = ({product}) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [color, setColor] = useState(product?.variants[0]?.color || "");
const [size, setSize] = useState("");
const [quantity, setQuantity] = useState(1);
const [mainImage, setMainImage] = useState(product?.images[0]?.url || null);
const [pquantity, setPquantity] = useState(null);
const {myCarts,setMyCart } = useContext(GlobalContext);
const [cart, setCart] = useState([]);
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [msg, setMsg] = useState("")
const [star, setStar] = useState(5)
useEffect(()=>{
  setCart(JSON.parse(localStorage.getItem("cartState")) || []) 
  setColor((product?.variants[0]?.color || "").trim() )
  },[])
  useEffect(()=>{
setColor((product?.variants[0]?.color || "").trim())
  },[product])

useEffect(()=>{
setCart(JSON.parse(localStorage.getItem("cartState")) || [])
},[myCarts])
const commentPost = async() => {
  if (name === "" || email === "" || msg === "") {
    toast.error("Please Fill all the Fields")
  }
  else {
    try{
      const sendRate=await fetch("/api/products/rate-product",{
        method:"PUT",
        body:JSON.stringify({ name: name, email: email, comment: msg, star: star, prodId: product?._id })
      })
      if(sendRate.ok){
        setMsg("")
        setName("")
        setEmail("")
      }

    }catch(err){
      console.log(err)
    }
  }
}


const viewContentFired = useRef(false);

    useEffect(() => {
        if (product?._id && !viewContentFired.current) {
            window.fbq('track', 'ViewContent', {
                content_name: `${product?.title}`,
                content_category: product?.collectionName || 'Product',
                content_ids: `${product?._id}`,
                content_type: 'product',
                value: product?.price,
                currency: 'INR',
            });
          
            const addToCartEvent=async()=>{
              try{
                const response=await fetch(`/api/chart/post-event?event=View Product`,{
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
            viewContentFired.current = true; // Set the flag to true after firing the event
        }
    }, [product?._id]);

    useEffect(() => {
        if (product?.variants) {
          const firstAvailableVariant = product?.variants?.find(variant => variant.quantity > 0);
          if (firstAvailableVariant) {
            setSize((firstAvailableVariant.size).trim());
          }
        }
        
      }, [color,product]);
const [sold,setSold]=useState(false)
  useEffect(() => {
    if (product?.variants) {
      if(size && color){
        const isSoldOut = product?.variants?.find(variant => (variant.color).trim()===color.trim() && (variant.size).trim()===size.trim() && variant.quantity > 0);
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
  }, [color,size,product]);


      const findVariant = (color, size) => {
        return product?.variants.find(variant => (variant.color).trim() === color.trim() && (variant.size).trim() === size.trim());
      };

const [existingCart,setExisitingCart]=useState(false)
const [existQty,setExistQty]=useState(null)
useEffect(() => {
    const existingItem = cart?.length>0 && cart?.find(
      (item) => item?.id === product._id && (item?.color).trim() === color.trim() && (item?.size).trim() === size.trim()
    );
    if (existingItem) {
      setExisitingCart(true);
      setExistQty(existingItem?.quantity);
    } else {
      setExisitingCart(false);
      setExistQty(null);
    }
  }, [myCarts, size, color, product]);
  useEffect(() => {
    const matchingVariant = findVariant(color, size);
    setPquantity(matchingVariant?.quantity)
    setQuantity(1)
  }, [size])

  const increaseQuantity=()=>{
      if(pquantity>quantity){
        setQuantity(quantity+1)
      }
  }
  const decreaseQuantity=()=>{
    if(quantity>1){
      setQuantity(quantity-1)
    }
  }

  const handleAddToCart = () => {
    if (size === "") {
      toast.error("Please Select Size");
    } else {
      if (existingCart) {
        // If product exists in cart, update the quantity
        const updatedCart = cart?.map((item) =>
          item.id === product._id && item.color === color && item.size === size
            ? { ...item, quantity: item.quantity + quantity } // Add new quantity to the existing one
            : item
        );
        setCart(updatedCart);
        setMyCart(updatedCart)
        localStorage.setItem("cartState", JSON.stringify(updatedCart));
        toast.success("Cart Quantity Updated");
      } else {
        // If product does not exist in cart, add it
        const updatedCart = [
          ...cart,
          { id: product._id, product:product?._id, color, size, quantity,price:product.price,sku:product?.sku,prdt:product,isSale:product?.isSale },
        ];
        setCart(updatedCart);
        setMyCart(updatedCart)
        localStorage.setItem("cartState", JSON.stringify(updatedCart));
        toast.success("Product Added to Cart");
        window.fbq('track', 'AddToCart', {
          content_name:`${product?.title}`,
          content_category: 'Product',
          content_ids:`${product?._id}`,
          content_type: 'product',
          value:product?.price,
          currency: 'INR'
      });
      }
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
    }
  };

  // Handle removing product from cart
  const handleRemoveFromCart = () => {
    const updatedCart = cart?.filter(
      (item) =>
        !(item.id === product._id && item.size === size && item.color === color)
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

      
  const modifyCloudinaryUrl = (url) => {
    const urlParts = url?.split('/upload/');
    return urlParts && `${urlParts[0]}/upload/c_limit,h_1000,f_auto,q_auto/${urlParts[1]}`;
  };  




  const isVideo = (url) => {
    return url.match(/\.(mp4|webm|ogg)$/i); // Check if the URL ends with a video extension
};
const multiplier = useMemo(() => {
  return parseFloat((Math.random() * (3 - 2) + 2).toFixed(1));
}, []);
const [originalPrice, setOriginalPrice] = useState(0);
const [discountPercent, setDiscountPercent] = useState(0);

useEffect(() => {
  if (product?.price) {
    const calculatedOriginalPrice = parseInt(product.price * multiplier);
    const calculatedDiscount = Math.round(((calculatedOriginalPrice - product.price) / calculatedOriginalPrice) * 100);

    setOriginalPrice(calculatedOriginalPrice);
    setDiscountPercent(calculatedDiscount);
  }
}, [product?.price, multiplier]);

const [currentIndex, setCurrentIndex] = useState(0);
const mediaList = product?.images || [];

const handlePrev = () => {
  if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
};

const handleNext = () => {
  if (currentIndex < mediaList.length - 1) setCurrentIndex(currentIndex + 1);
};
    return (
      <>
        <div className={styles.singleProduct}>
            <div className={styles.left}>
            <div className={styles.carouselWrapper}>
    <div className={styles.carouselContainer}>
      <button
        onClick={handlePrev}
        className={styles.navButton1}
        disabled={currentIndex === 0}
      >
        <IoChevronBack size={24} />
      </button>

      <div className={styles.mediaSlide} key={mediaList[currentIndex]?.url}>
        {isVideo(mediaList[currentIndex]?.url) ? (
          <video
            width="100%"
            height="auto"
            controls
            playsInline
            className={styles.video}
          >
            <source src={mediaList[currentIndex]?.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={modifyCloudinaryUrl(mediaList[currentIndex]?.url)}
            alt={product?.title}
            width={1000}
            height={600}
            className={styles.image}
            placeholder='blur'
            blurDataURL="data:image/jpeg;base64,..."
            
          />
        )}
      </div>

      <button
        onClick={handleNext}
        className={styles.navButton2}
        disabled={currentIndex === mediaList.length - 1}
      >
        <IoChevronForward size={24} />
      </button>
    </div>
  </div>
                
            </div>
            <div className={styles.right}>
                <h1>{product?.title}</h1>
                <p className={styles.productBrand}>{product?.collectionName}</p>
                <ul className={styles.stars}>
                    <li><IoIosStar /></li>
                    <li><IoIosStar /></li>
                    <li><IoIosStar /></li>
                    <li><IoIosStar /></li>
                    <li><IoIosStar /></li>
                </ul>
                <div className={styles.prices}>
                  <p>Rs. {product?.price}</p>
                  <p>Rs. {originalPrice}</p>
                  <p>{discountPercent}% OFF</p>
                  </div>
               
                <p className={styles.color}>Color: {product?.variants[0]?.color}</p>
                {
      existingCart?
      <p style={{marginBottom:'15px',fontWeight:500,letterSpacing:"1px",color:"red"}}>Already In Cart</p>
      :""
    }
                <div className={styles.sizeOptions}>
                  <p className={styles.color}>Size :</p>
                <ul>
                      {product?.variants
.map((variant, index) => (
  <li
    key={index}
    style={{
      display:variant.quantity === 0 ? "none" : "block",
      textDecorationThickness: variant.quantity === 0 ? '1px' : 'auto',
      pointerEvents: variant.quantity === 0 ? 'none' : 'auto', // Disable pointer events if quantity is 0
      color:size.trim()===(variant?.size).trim()?"black":"black",border:size.trim()===(variant?.size).trim()?"1px solid black":"1px solid rgb(202, 202, 202)"
    }}
    onClick={(e)=>setSize((variant?.size).trim())}
  >
    {variant.size}
  </li>
))}
                      </ul>
                    {/* <FormControl>
      <FormLabel>Size</FormLabel>
      <RadioGroup
        defaultValue="female"
        name="controlled-radio-buttons-group"
        value={size}
        onChange={(e)=>setSize((e.target.value).trim())}
        sx={{ my: 1 }}
      >
         {
                            product?.variants?.map((item,index)=>{
                            return <Radio key={index} value={item?.size} label={item?.size} disabled={item?.quantity>0?false:true}/>
                            })
                          }
                          
      </RadioGroup>
    </FormControl> */}
                  <div className={styles.addToCartDiv}>
    <div className={styles.qtyWrapper}>
  <button
    className={styles.qtyBtn}
    onClick={decreaseQuantity}
  >
    −
  </button>
  <span className={styles.qtyDisplay}>{quantity}</span>
  <button
    className={styles.qtyBtn}
    onClick={increaseQuantity}
  >
    +
  </button>
</div>

    {
      existingCart?
      <button onClick={handleRemoveFromCart}>Remove From Cart</button>
      :
<button onClick={handleAddToCart}>Add to Cart</button>

                          }
    
    
    {/* {
  existingCart && existQty >= (pquantity || 0) ? (
    <button onClick={handleRemoveFromCart}>Remove From Cart</button>
  ) : (
    <button onClick={handleAddToCart}>Add to Cart</button>
  )
} */}
                  </div>
                </div>
                <div className={styles.offers}>
                <p><span><CiRuler /></span> <span>Size Chart</span></p>
                </div>
                  <BasicTabs desc={product?.description} ratings={product?.ratings}/>
            </div>
        </div>
        <div className={styles.ratings}>
                <div className={styles.rating} style={{margin:'5rem 8vw'}}>
                  <p style={{marginBottom:'1rem'}}>Rate Product</p>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
                  <div className={styles.msg}>
                    <textarea name="" id="" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder='Enter Message'></textarea>
                  </div>
                  <button onClick={commentPost}>Post</button>
                </div>
                </div>
       
      </>
    )
}

export default SingleProduct
