"use client";
import React, { useState, useEffect } from "react";
import styles from "../src/app/collections/[cid]/collections.module.css";
import { CiFilter } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useParams, useSearchParams, useRouter, usePathname } from "next/navigation";
import LoadingBar from "react-top-loading-bar"; // Import LoadingBar
import ProductCard from "./ProductCard";

const Products = ({ data }) => {

  const { cid } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [sortOpen, setSortOpen] = useState(false);
  const [filter, setFilter] = useState([])
  const [size, setSize] = useState("")
  const [sort, setSort] = useState("")
  const [color, setColor] = useState("")
  const [brand, setBrand] = useState("")
  const [isBrandOpen, setIsBrandOpen] = useState(false)
  const [isColorOpen, setIsColorOpen] = useState(false)
  const [isSizeOpen, setIsSizeOpen] = useState(false)
  const colors=["white", "black", "red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "grey","cream", "wine", "sky blue"];

  // const colorArray=[
  //   "Red","Orange","Yellow","Green","Blue","Pink","Purple","Voilet","Brown","White","Grey","Black","Peach","Beigr","Silver","Mehroom","Magenta","Teal","Lavender","Cream"
  // ]
  const [progress, setProgress] = useState(0); // Progress state for LoadingBar

  const page = parseInt(searchParams.get("page") || "1");
  useEffect(() => {
    setBrand(searchParams.get("brand"))
    setColor(searchParams.get("color"))
    setSize(searchParams.get("size"))
    setSort(searchParams.get("sort") || "-createdAt")

  }, [])

  const updateURL = (updatedParams) => {
    const params = new URLSearchParams();

    // Merge existing and new parameters
    if (updatedParams.page) params.set("page", updatedParams.page);
    if (updatedParams.size) params.set("size", updatedParams.size);
    if (updatedParams.color) params.set("color", updatedParams.color);
    if (updatedParams.brand) params.set("brand", updatedParams.brand);
    if (updatedParams.sort) params.set("sort", updatedParams.sort)

    // Push the updated URL without reloading
    setProgress(30);

    // Push the updated URL without reloading
    router.push(`${pathname}?${params.toString()}`, { scroll: true });
    setTimeout(() => setProgress(100), 700);
  };
  const handlePageChange = (event, value) => {
    updateURL({ page: value, sort, size, color, brand });
  };


  const applyFilter = () => {
    updateURL({ page: 1, sort, size, color, brand })
  }
  const clearFilter = () => {
    setBrand("");
    setColor("");
    setSort("");
    setSize("");
    updateURL({ page, sort: "", size: "", color: "", brand: "" });

  };


  const toggleBrand = (brands) => {
    if (brand === brands) {
      setBrand("")
    }
    else {
      setBrand(brands)
    }
  }
  const toggleColor = (colors) => {
    if (color === colors) {
      setColor("")
    }
    else {
      setColor(colors)
    }
  }
  const toggleSize = (sizes) => {
    if (size === sizes) {
      setSize("")
    }
    else {
      setSize(sizes)
    }
  }

  // Connect to MongoDB and fetch products

  useEffect(() => {
    const fetchFilter = async () => {
      try {
        const response = await fetch(`/api/filter?collectionHandle=${cid}`);
        const data = await response.json();

        if (data.success) {
          setFilter(data)
        } else {
          console.error("Error:", data.error);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
      }
    };
    fetchFilter()
  }, [cid])

  const filterToggle = () => {
    setSortOpen((prev) => !prev);
  };

  return (
    <div className={styles.collections}>
      <LoadingBar
        color="black"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className={styles.overlay} style={{ display: sortOpen ? "block" : "none" }}></div>
      <h1>{data?.products?.length > 0 && data.products[0]?.collectionName}</h1>
      <div className={styles.sortBtn}>
        <p onClick={filterToggle}><span>Sort & Filter</span> <span><CiFilter /></span></p>
      </div>

      <div className={styles.collectionProducts}>
        <div className={styles.sort} style={{ bottom: sortOpen ? 0 : "-100%" }}>
          <p className={styles.sortName}><span>Sort & Filter</span><span onClick={filterToggle}><IoMdClose /></span></p>
          <div className={styles.sortBtns}>
            <button onClick={clearFilter}>Clear All</button>
            <button onClick={applyFilter}>Apply</button>
          </div>
          <div className={styles.sortBy}>
            <p>Sort By</p>
            <select name="" id="" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="-createdAt">Releavance</option>
              <option value="price">Price (Low to High)</option>
              <option value="-price">Price (High to Low)</option>
              <option value="-createdAt">New to Old</option>
              <option value="createdAt">Old to New</option>
              <option value="-title">Title (Z to A)</option>
              <option value="title">Title (A to Z)</option>
            </select>
          </div>
          <p className={styles.sortName}>Filter By</p>
          <div className={styles.chooseBrand}>
            <div>
              <p>Brand</p>
              {
                isBrandOpen ?
                  <p onClick={()=>setIsBrandOpen(false)} style={{cursor:'pointer'}}>-</p>
                  :
                  <p onClick={()=>setIsBrandOpen(true)} style={{cursor:'pointer'}}>+</p>

              }
            </div>
            <ul style={{ overflow: 'hidden', height: isBrandOpen ? "100%" : "0" }}>
              {
                filter && filter?.brands?.map((item, index) => {
                  return <li key={index} onClick={(e) => toggleBrand(item)} style={{ color: brand === item ? "black" : "black", border: brand === item ? "1px solid black" : "1px solid rgb(202, 202, 202)" }}>{item}</li>
                })
              }

            </ul>
          </div>
          <div className={styles.chooseBrand}>
            <div>
              <p>Size</p>
              {
                isSizeOpen ?
                  <p onClick={()=>setIsSizeOpen(false)} style={{cursor:'pointer'}}>-</p>
                  :
                  <p onClick={()=>setIsSizeOpen(true)} style={{cursor:'pointer'}}>+</p>

              }
            </div>
            <ul style={{ overflow: 'hidden', height: isSizeOpen ? "100%" : "0" }}>
              {
                filter && filter?.sizes?.map((item, index) => {
                  return <li key={index} onClick={(e) => toggleSize(item)} style={{ color: size === item ? "black" : "black", border: size === item ? "1px solid black" : "1px solid rgb(202, 202, 202)" }}>{item}</li>
                })
              }
            </ul>
          </div><div className={styles.chooseBrand}>
            <div>
              <p>Colour</p>
              {
                isColorOpen ?
                  <p onClick={()=>setIsColorOpen(false)} style={{cursor:'pointer'}}>-</p>
                  :
                  <p onClick={()=>setIsColorOpen(true)} style={{cursor:'pointer'}}>+</p>

              }
            </div>
            <ul style={{ overflow: 'hidden', height: isColorOpen ? "100%" : "0" }}>
              {
                colors?.map((item, index) => {
                  return <li key={index} onClick={(e) => toggleColor(item)} style={{width:"45px", height:"45px",borderRadius:"50%", border: color === item ? "1px solid black" : "1px solid rgba(224, 224, 224, 0.78)",padding:'2px',display:"flex",justifyContent:'center',alignItems:'center' }}><li style={{backgroundColor :item === "cream" ? "#fff1ca" :item === "wine" ? "#80013f" :item === "sky blue" ? "#6fe6fc" :item, width:"30px", height:"30px",borderRadius:"50%",padding:0,border:"none"}}></li></li>
                })
              }
            </ul>
          </div>
        </div>
        {
          data && data?.products?.length > 0 ?
            <div className={styles.collectionPrdts}>
              <div className={styles.allPrdts}>
                {
                  data?.products && data?.products.map((item, index) => {
                    return <ProductCard key={index} item={item} page={page} />
                  })
                }

              </div>
              <div className={styles.pagination}>
                <Stack spacing={2}>
                  <Pagination count={data?.pagination?.totalPages} page={page} onChange={handlePageChange} color="primary" variant="outlined"/></Stack>
              </div>
            </div>
            :
            <div className={styles.noData}>
              <p>No Products Found</p>
              <button onClick={clearFilter}>Clear Filter</button>
            </div>
        }


      </div>
    </div>
  )
}

export default Products
