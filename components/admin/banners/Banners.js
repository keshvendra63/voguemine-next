import React, { useEffect, useState } from "react";
import styles from "./banners.module.css";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [images, setImages] = useState([]);
const [user,setUser]=useState("")
useEffect(()=>{
setUser(JSON.parse(localStorage.getItem("user")))
},[])
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(
          `/api/banner/get-banners?id=677bc6e15dab1ba1f11b74a1`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (response.ok) {
          setBanners(data?.banners || []);
        } else {
          console.error("Error fetching banners:", data.error);
        }
      } catch (error) {
        console.error("Error fetching banners:", error.message);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    // Populate the `images` state from the fetched banners
    if (banners?.length > 0) {
      setImages(banners.map((banner) => banner || null));
    }
  }, [banners]);

  const handleImageUpload = (result, index) => {
    const updatedImages = [...images];
    updatedImages[index] = {
      public_id: result.info.public_id,
      asset_id: result.info.asset_id,
      url: result.info.secure_url,
    };
    setImages(updatedImages);
  };

  const handleImageRemove = (index) => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);
  };


  const saveBanners=async()=>{
try{
const response=await fetch(`/api/banner/update-banners?id=677bc6e15dab1ba1f11b74a1&token=${user?.token}`,{
    method:"PUT",
    headers: { "Content-Type": "application/json" },
    body:JSON.stringify(images)
})
if(response.ok){
    toast.success("Banners Updated")
}

}
catch(error){
    console.log(error)
}
  }


  return (
    <div className={styles.banners}>
      <div className={styles.bannerHead}>
        <p>Banners</p>
        <button onClick={saveBanners}>Save</button>
      </div>
      <div className={styles.bannersBody}>
        {images &&
          images.map((item, index) => {
            return (
              <div className={styles.banner} key={index}>
                {item === null ? (
                  <CldUploadWidget
                    signatureEndpoint="/api/upload/upload-img"
                    onSuccess={(result) => handleImageUpload(result, index)}
                  >
                    {({ open }) => {
                      function handleOnClick() {
                        open();
                      }
                      return (
                        <button onClick={handleOnClick} className={styles.uploadBtn}>
                          Upload Image {index + 1}
                        </button>
                      );
                    }}
                  </CldUploadWidget>
                ) : (
                  <div className={styles.bannerPreview}>
                    <IoMdClose
                      className={styles.closeIco}
                      onClick={() => handleImageRemove(index)}
                    />
                    <Image
                      src={item?.url}
                      alt={`Banner ${index + 1}`}
                      width={400}
                      height={400}
                      style={{ height: "100%" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Banners;
