import React, { useContext, useEffect, useState } from 'react'
import styles from './blogs.module.css'
import toast from 'react-hot-toast'
import { GlobalContext } from '../../../GlobalContext'
import { CldUploadWidget } from 'next-cloudinary'
import { IoMdClose } from 'react-icons/io'
import dynamic from "next/dynamic";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
const htmlToDraft = typeof window === "object" ? require("html-to-draftjs").default : null;
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const AddBlog = ({blogId}) => {
  const [user,setUser]=useState("")
  const [title,setTitle]=useState("")
  const [handle,setHandle]=useState("")
  const [metaTitle,setmetaTitle]=useState("")
  const [metaDesc,setmetaDesc]=useState("")
  const [description,setdescription]=useState("")
  const [state,setState]=useState("draft")
  const [numViews,setnumViews]=useState(0)
  const [images,setImages]=useState(null)

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const updateEditorState = (description) => {
      const contentBlock = htmlToDraft(description || "");
      const initialContentState = contentBlock
        ? ContentState.createFromBlockArray(contentBlock.contentBlocks)
        : ContentState.createFromText("");
      setEditorState(EditorState.createWithContent(initialContentState));
    };

    const onEditorStateChange = (newState) => {
      setEditorState(newState);
  
      // Convert editor content to HTML and update productDesc
      const rawContent = convertToRaw(newState.getCurrentContent());
      const htmlContent = draftToHtml(rawContent);
      setdescription(htmlContent);
    };
      const {setPrdtOpens}=useContext(GlobalContext)
      useEffect(()=>{
          setUser(JSON.parse(localStorage.getItem("user")))
      },[])

      useEffect(()=>{
          if(blogId===""){
             setTitle("")
             setHandle("")
             setmetaTitle("")
             setmetaDesc("")
             setdescription("")
             setnumViews(0)
             setImages(null)
             setState("draft")
             updateEditorState("")
          }
          else{
              const getBlog=async()=>{
                  try{
                      const response=await fetch(`/api/blogs/get-blog?id=${blogId}`)
                      const data=await response.json()
                      if(response.ok){
              setTitle(data?.title)
             setHandle(data?.handle)
             setmetaTitle(data?.metaTitle)
             setmetaDesc(data?.metaDesc)
             setdescription(data?.description)
             setnumViews(data?.numViews)
             setImages(data?.images)
             setState(data?.state)
             updateEditorState(data?.description)
                      }
                  }catch(err){
                      console.log(err)
                  }
              }
              getBlog()
          }
      },[blogId])


      const createBlog=async()=>{
        if(title==="" || handle==="" || description===""){
          toast.error("Please Fill All the Details")
        }
        else{
          if(blogId===""){
            try{
            const response=await fetch(`/api/blogs/create-blog`,{
                method:"POST",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify({
                  id:blogId,
                  token:user?.token,
                  data:{
                    title,handle,metaTitle,metaDesc,description,state,numViews,images
                  }            })
            })
            if(response.ok){            
                const createHistory=async()=>{
                    try{
                      const response=await fetch("/api/history/create-history",{
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            name: user?.firstname,
                            title: title,
                            sku: handle,
                            productchange: 'Blog Created',
                            time: new Date()
                          }),
                    })
                    if(response.ok){
                      toast.success("Blog Created")
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
                            const response=await fetch(`/api/blogs/update-blog`,{
                                method:"PUT",
                                headers:{"Content-type":"application/json"},
                                body:JSON.stringify({
                                  id:blogId,
                                  token:user?.token,
                                  data:{
                                    title,handle,metaTitle,metaDesc,description,state,numViews,images
                                  }
                                  })
                            })
                            if(response.ok){            
                                const createHistory=async()=>{
                                    try{
                                      const response=await fetch("/api/history/create-history",{
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            name: user?.firstname,
                                            title: title,
                                            sku: handle,
                                            productchange: 'Blog Updated',
                                            time: new Date()
                                          }),
                                    })
                                    if(response.ok){
                      toast.success("Blog Updated")

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
        }
      }
      const modifyCloudinaryUrl = (url) => {
        const urlParts = url?.split('/upload/');
        return urlParts && `${urlParts[0]}/upload/c_limit,h_1000,f_auto,q_auto/${urlParts[1]}`;
      };

      const deleteBlog=async()=>{
        try{
            const response=await fetch(`/api/blogs/delete-blog`,{
              method:"DELETE",
              body:JSON.stringify({id:blogId,token:user?.token})
            })
            if(response.ok){
              toast.success("Blog Deleted")
              setPrdtOpens(false)
            }
            
        }catch(err){
            console.log(err)
        }
    }
  
  return (
    <div className={styles.blog}>
       <div className={styles.blogHead}>
        {
          blogId===""?
        <p>Create Blog</p>
:
<p>Update Blog</p>

        }
        <div className={styles.right}>
          {
            blogId===""?
        <button onClick={createBlog}>Create</button>
:
<button onClick={createBlog}>Update</button>

          }
           {
            blogId===""?
        ""
:
<button onClick={deleteBlog}>Delete</button>

          }

        </div>

      </div>
      <div className={styles.blogMake}>
        <div className={styles.blogLeft}>
        <div className={styles.title}>
          <p>Title</p>
          <input type="text" placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
        </div>
        <div className={styles.title}>
          <p>Handle</p>
          <input type="text" placeholder='Handle' value={handle} onChange={(e)=>setHandle(e.target.value)}/>
        </div>
        <div className={styles.title}>
          <p>Description</p>
          <Editor
                editorStyle={{
                  height: "500px", // Set height for the editable area (slightly less than container)
                  overflowY: "auto",
                  scrollbarWidth:"thin"
                   // Enable scrolling inside the editable area
                }}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: ["inline", "blockType", "fontSize", "list", "textAlign", "link", "emoji", "history"],
          inline: { options: ["bold", "italic", "underline"] },
          list: { options: ["unordered", "ordered"] },
          textAlign: { options: ["left", "center", "right", "justify"] },
          link: { showOpenOptionOnHover: true },
        }}
      />
        </div>
        </div>
        <div className={styles.blogRight}>
        <div className={styles.title}>
          <p>Status</p>
          <select value={state} onChange={(e)=>setState(e.target.value)}>
            <option value="active">Active</option>
            <option value="draft">Draft</option>

          </select>
        </div>
        <div className={styles.title}>
          <p>Number Of Views</p>
          <p>{numViews}</p>
        </div>
        <div className={styles.title}>
        {
          images===null?
          <CldUploadWidget
          signatureEndpoint="/api/upload/upload-img"
          onSuccess={(result, { widget }) => {
            setImages([
              {
              public_id:result.info.public_id,
              asset_id:result.info.asset_id,
              url:result.info.secure_url
          }]);  // { public_id, secure_url, etc }
          }}
          onQueuesEnd={(result, { widget }) => {
            widget.close();
          }}
        >
          {({ open }) => {
            function handleOnClick() {
              open();
            }
            return (
              <button onClick={handleOnClick} className={styles.uploadBtn}>
                Upload Blog Image
              </button>
            );
          }}
        </CldUploadWidget>
          :
          <div className={styles.imgDiv}>
          <IoMdClose className={styles.closeIco} onClick={(e)=>setImages(null)}/>
        <img src={modifyCloudinaryUrl(images[0]?.url)} alt={title} />
        </div>
        }
        </div>
        <div className={styles.title}>
          <p>Meta Title</p>
          <input type="text" placeholder='Meta Title' value={metaTitle} onChange={(e)=>setmetaTitle(e.target.value)}/>
        </div>
        <div className={styles.title}>
          <p>Meta Description</p>
          <textarea placeholder='Meta Description' value={metaDesc} onChange={(e)=>setmetaDesc(e.target.value)}></textarea>
        </div>
        </div>
        
</div>
    </div>
  )
}

export default AddBlog
