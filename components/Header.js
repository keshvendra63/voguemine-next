"use client";
import React, { useState ,useEffect,useContext, useRef} from "react";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { PiShoppingBagThin } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import logo from '../images/vlogo.png';
import styles from "./header.module.css";
import { CiInstagram } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { PiWhatsappLogoLight } from "react-icons/pi";
import Link from "next/link";
import { GlobalContext } from "../GlobalContext";
import toast from "react-hot-toast";
import { words } from "./Words";
import axios from "axios";

const Header = () => {
  const [ham, setHam] = useState(false);
 const [searchValue,setSearchValue]=useState("")
 const searchInputRef = useRef(null); // Create a ref for the search input
  const { myCarts, setMyCart } = useContext(GlobalContext);
  const [cartItems, setCartItems] = useState([]);
  

  const openHam = () => {
    setHam(true);
  };
  const closeHam = () => {
    setHam(false);
    

  };
  const closeHam1 = () => {
    setHam(false);
  };
  const [search, setSearch] = useState(false);
  useEffect(() => {
    if (search === "block" && searchInputRef.current) {
      searchInputRef?.current?.focus(); // Focus on the search input after it's displayed
    }
  }, [search]);
  const toggleSearch = () => {
    setSearch((prev) => !prev);
  };

  const [results, setResults] = useState([]);
useEffect(() => {
  if (searchValue?.length > 1) {
    // Filter the words that contain the input value
    const filteredWords = words
      .filter((item) => item?.name?.toLowerCase()?.includes(searchValue?.toLowerCase()))
      .slice(0, 30);

    setResults(filteredWords); // Store the filtered words in state
  } else {
    setResults([]); // Clear results when input is less than 2 characters
  }
}, [searchValue]);


const handleKeyDown = (event) => {
  if (event?.key === 'Enter') { 
    window.location.href=`/search?search=${searchValue}`
      setSearch(false)
      setSearchValue("")
  }
  
};
const searchValueClick = (value) => { 
    window.location.href=`/search?search=${value}`
    setSearch(false)
    setSearchValue("")

};
  const [carts,setCarts]=useState(false)

  const toggleCart = () => {
    setCarts((prev) => !prev);
  };
  const [totalAmount,setTotalAmount]=useState(null)
  useEffect (()=> {
    setCartItems(JSON.parse(localStorage.getItem("cartState")) || [])
},[])
useEffect(()=>{
  let sum=0;
    
  for(let index=0; index < cartItems?.length; index++){
    if(cartItems[index]?.isSale){
      sum =sum+(Number(cartItems[index]?.quantity) *((cartItems[index]?.price)-(cartItems[index]?.price*0.2)))
    }
    else{
      sum =sum+(Number(cartItems[index]?.quantity) *cartItems[index]?.price)
    }
  }
  setTotalAmount(sum)
  if(myCarts?.length>0){
    setCarts(true)

  }
},[cartItems,myCarts])
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
  const updatedCart = cartItems?.map((cartItem) => {
      if (
        cartItem.id === item.id && // Match by product ID
        cartItem.color === item.color && // Match by color
        cartItem.size === item.size // Match by size
      ) {
        return {
          ...cartItem,
          quantity: Math.max(cartItem.quantity - 1, 1), // Decrease quantity, ensure it doesn't go below 1
        };
      }
      return cartItem;
    })
    .filter((cartItem) => cartItem.quantity > 0); // Optional: Remove items with quantity 0 (if desired)
setCartItems(updatedCart)
  setMyCart(updatedCart); // Update the cart state
  localStorage.setItem("cartState", JSON.stringify(updatedCart)); // Persist the updated cart
};

const handleRemoveFromCart = (val) => {
  const updatedCart = cartItems?.filter(
    (item) =>
      !(item.id === val?.id && item.size === val?.size && item.color === val?.color)
  );
  setCartItems(updatedCart);
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


const checkOutClick=()=>{
  setCarts(false)
  window.fbq('track', 'InitiateCheckout', {
    content_ids:cartItems?.map((item) => item?.id),
    content_type: 'product',
    value:totalAmount,
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
//           content_type: 'product',
//           value:totalAmount,
//           currency: 'INR'
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

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <div className={styles.ham}>
          {!ham ? (
            <RxHamburgerMenu
              className={`${styles.icons}`}
              onClick={openHam}
            />
          ) : (
            <IoMdClose className={`${styles.icons}`} onClick={closeHam1} />
          )}
        </div>
        <Link href="/home" onClick={closeHam}><Image
          src={logo}
          alt="Voguemine logo"
          width={1024} height={35}
          className={styles.logoImg}
        />
        </Link>
      </div>
      <div className={styles.midNav}>
      <div
          className={styles.menuItems}
          style={{ left: !ham ? "-100%" : "0" }}
        >
          <ul>
          <Link href="/home" onClick={closeHam}><li>Home</li></Link>
            <Link href="/men" onClick={closeHam}><li>Men</li></Link>
            <Link href="/women" onClick={closeHam}><li>Women</li></Link>
            <Link href="/kids" onClick={closeHam}><li>Kids</li></Link>
            <Link href="/accessories" onClick={closeHam}><li>Accessories</li></Link>
            <Link href="/blogs" onClick={closeHam}><li>Blogs</li></Link>
            <Link href="/track-order" onClick={closeHam}><li>Orders</li></Link>
          </ul>
          <div className={styles.socialInfo}>
            <div className={styles.socialIcons}>
            <a href='https://www.instagram.com/voguemine_fashion/' style={{textDecoration:"none"}}><CiInstagram className={styles.socialIcon}/></a>
<a href='https://www.facebook.com/vogueminefashion' style={{textDecoration:"none"}}><CiFacebook className={styles.socialIcon}/></a>
<a href='https://wa.me/+919899202079?text=Hello there!' style={{textDecoration:"none"}}><PiWhatsappLogoLight className={styles.socialIcon}/></a>
            </div>
            <p style={{color:'black'}}>© 2024, Voguemine</p>
          </div>
        </div>
      </div>
      
      <div className={styles.rightNav}>
        
        <div className={styles.cartSearch}>
          <div className={styles.search}>
            <CiSearch className={styles.icons} onClick={toggleSearch} />
            <div className={styles.searchInput} style={{right:search?"30px":"-100vw", opacity:search?1:0}}>
              <input type="search" placeholder="Search for Products..." ref={searchInputRef} value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} onKeyDown={handleKeyDown}/>
              <IoMdClose className={styles.searchClose} onClick={toggleSearch}/>
              <div className={styles.searchSugg} style={{display:searchValue?.length>1?"flex":"none"}}>
              <p>Search Suggestions</p>
      <ul>
        {results?.map((item, index) => (
          <li key={index} onClick={(e)=>searchValueClick(item?.value)}><CiSearch className={styles.liIco}/>{item?.name}</li>
        ))}
      </ul>
              </div>
            </div>
          </div>
          <div className={styles.cart}>
            <PiShoppingBagThin className={styles.icons} onClick={toggleCart}/>
            <p className={styles.notif}>
            {cartItems?.length || 0}
            </p>
            <div className={styles.overlay} style={{display:carts?"block":"none"}} onClick={toggleCart}></div>
            <div className={styles.carts} style={{right:carts?0:"-100%"}}>
              <div className={styles.cartHead}>
                <p>CART</p>
                <p onClick={toggleCart}><IoMdClose/></p>
              </div>
              {
                cartItems?.length>0?
<div>
              <div className={styles.cartItems}>
                {
                  cartItems?.length>0 && cartItems?.map((item,index)=>{
                    return <div className={styles.cartItem} key={index}>
                      <Link href={`/products/${item?.prdt?.handle}`}>
                      <Image src={modifyCloudinaryUrl(item?.prdt?.images[0]?.url)} alt={item?.prdt?.title} width={512} height={100} style={{
  height: '100%',
  aspectRatio: '1/1',
  objectFit: 'cover', // Ensures the image fits nicely within the aspect ratio
}}/>
</Link>
                    <div className={styles.cartInfo}>
                      <p className={styles.cartPrdtName}>{item?.prdt?.title}</p>
                      <p className={styles.cartPrdtVariant}><span>{item?.size}</span><span> / </span><span>{item?.color}</span></p>
  
                      <div className={styles.cartQty}>
                        <p><span onClick={(e)=>decreaseQty(item)}>-</span><span>{item?.quantity}</span><span onClick={(e)=>increaseQty(item)}>+</span></p>
                        {
                          item?.isSale?
                        <p style={{display:'flex',alignItems:"center"}}><span style={{color:"gray",fontSize:"11px",textDecoration:"line-through",marginRight:'5px'}}>Rs. {item?.price * item?.quantity}</span><span>Rs. {((item?.price)-(item?.price*0.2)) * item?.quantity}</span></p>
:
<p>Rs. {item?.price * item?.quantity}</p>


                        }
                      </div>
                      <button onClick={(e)=>handleRemoveFromCart(item)}>Remove</button>
  
                    </div>
                  </div>
                  })
                }
                
              </div>
              <div className={styles.cartCheckout} style={{right:carts?0:"-100%"}}>
                <div className={styles.cartTotal}>
                <p>{cartItems?.length} Items</p>
                <p>Total Rs. {parseInt(totalAmount)}</p>
                </div>
                <Link href="/checkout" onClick={checkOutClick}><button>Checkout</button></Link>
                
              </div>
              </div>
                :
                <div style={{margin:"70px 1rem",display:"flex",justifyContent:"center",alignItems:"center",height:"80vh",width:"100%",flexDirection:"column",textAlign:"center"}}>
                <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="" style={{width:"150px",aspectRatio:'1/1',marginBottom:"20px"}}/>
                <p style={{color:"#C3A37D",fontWeight:'600',fontSize:"25px",marginBottom:"20px"}}>Empty Cart</p>
                <Link href="/home" onClick={(e)=>setCarts(false)}><button style={{padding:"8px 20px",backgroundColor:"#C3A37D",color:"white",border:"none",letterSpacing:"1px",fontSize:"17px",fontWeight:"500",cursor:"pointer"}}>Let's Add Something</button></Link>

            </div>

              }
              
              
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
