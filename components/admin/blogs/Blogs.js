import React, { useContext, useState,useEffect } from 'react'
import styles from './blogs.module.css'
import { GlobalContext } from '../../../GlobalContext'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { IoMdClose } from 'react-icons/io'
import AddBlog from './AddBlog'
const Blogs = () => {
      const [blogsState,setblogsState]=useState([])
      const {prdtOpens,setPrdtOpens}=useContext(GlobalContext)
      const getBlogs=async()=>{
    try{
    const response=await fetch("/api/blogs/get-blogs")
    const data=await response.json()
    if(response.ok){
        setblogsState(data)
    }
    else{
      console.log("Unable to fetch Blogs")
    }
    }
    catch(err){
      console.log(err)
    }
      }
      const pathname = usePathname();
                const router = useRouter()
          // const queryParams = new URLSearchParams(location.search);
            useEffect(()=>{
              const searchParams = new URLSearchParams();
              searchParams.set('pageName',"blogs");
              router.push(`${pathname}?${searchParams.toString()}`, { scroll: true });
                },[])
      useEffect(()=>{
        if(prdtOpens===false){
            getBlogs()
    
        }
      },[prdtOpens])
    
    
        const [blogId, setblogId] = useState("")
    
      const closeBlog = () => {
        setblogId("")
        setPrdtOpens(false)
    }
    const openBlog = (val) => {
      setblogId(val)
        setPrdtOpens(true)
    }
    
    const newBlog = () => {
      setblogId("")
        setPrdtOpens(true)
    }

    const modifyCloudinaryUrl = (url) => {
        const urlParts = url?.split('/upload/');
        return urlParts && `${urlParts[0]}/upload/c_limit,h_1000,f_auto,q_auto/${urlParts[1]}`;
      };
      
    
  return (
      <div className={styles.blog}>
      <div className={styles.addblog} style={{ display: prdtOpens ? "flex" : "none" }}>
                <IoMdClose className={styles.close} onClick={closeBlog} />
                <div className={styles.addblogbody}>
                    <AddBlog blogId={blogId} />
                </div>
            </div>
      <div className={styles.blogHead}>
        <p>Blogs</p>
        <button onClick={newBlog}>Add Blog</button>
      </div>
      <div className={styles.blogList}>
      {
          blogsState?.slice()?.reverse()?.map((item,index)=>{
            return(
              <div className={styles.blogCard} onClick={()=>openBlog(item?._id)} key={index}>
                  <Image src={modifyCloudinaryUrl(item?.images[0]?.url)} alt={item?.title} width={500} height={500}/>
                      <p className={styles.name}>{item?.title}</p>
                      <p className={styles.date}>{new Date(item?.createdAt).toLocaleDateString('en-GB')}</p>
                      <p className={styles.status}>{item?.state}</p>
                  </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Blogs
