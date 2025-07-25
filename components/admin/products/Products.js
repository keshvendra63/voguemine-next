import React, { useState, useEffect, useContext } from 'react';
import styles from './prdts.module.css';
import LoadingBar from "react-top-loading-bar"; // Import LoadingBar
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { IoMdClose } from 'react-icons/io';
import AddProduct from '../addProduct/AddProduct';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GlobalContext } from '../../../GlobalContext';
import { CiTrash } from "react-icons/ci";
import { IoDuplicateOutline } from "react-icons/io5";
import Link from 'next/link';

const Products = () => {
  const [progress, setProgress] = useState(0); // Progress state for LoadingBar
  const { prdtOpens, setPrdtOpens } = useContext(GlobalContext);
  const [user, setUser] = useState("")
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")))
    const searchParams = new URLSearchParams();

    searchParams.set('pageName', "products");
  }, [])

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const prdt = searchParams.get("prdt") || ""

  let page = parseInt(searchParams.get("page")) || 1;
  let state = searchParams.get("state") || '';
  const router = useRouter()
  const [cachedProducts, setCachedProducts] = useState({});
  const [productState, setproductState] = useState([])


  const [collectionState, setcollectionState] = useState([])
  useEffect(() => {
    const getCollections = async () => {
      try {
        const response = await fetch(`/api/collection/getallcollections`)
        const data = await response.json()
        if (response.ok) {
          setcollectionState([
            ...(data.mens || []),
            ...(data.womens || []),
            ...(data.kids || []),
            ...(data.accessories || []),
          ]);
        }
        else {
          console.log("Unable to fetch collections")


        }
      }
      catch (err) {
        console.log(err)


      }
    }
    getCollections()
  }, []);

  const updateURL = (updateParams) => {
    const searchParams = new URLSearchParams();

    if (updateParams.page !== "") {
      searchParams.set('page', updateParams.page);
    }

    if (updateParams.state !== "") {
      searchParams.set('state', updateParams.state);
    }
    searchParams.set('pageName', "products");

    if (prdt !== "") {
      searchParams.set("prdt", prdt)
    }

    setProgress(30);


    router.push(`${pathname}?${searchParams.toString()}`, { scroll: true });
    setTimeout(() => setProgress(100), 500);

  };

  const nextPage = () => {

    page++;
    updateURL({ page, state });
  };

  const prevPage = () => {
    if (page > 1) {
      page--;
      updateURL({ page, state });
    }
  };
  const [cvalue, setCvalue] = useState("")

  const clearFilter = () => {
    updateURL({ page: '', state: '' });
    setCvalue("")
  };

  const [productState1, setproductState1] = useState([])

  const fetchcl = async (e) => {
    setCvalue(e.target.value)
    try {
      const response = await fetch(`/api/products?page=1&state=${state}&limit=1000&sort=order&collectionHandle=${e.target.value}`)
      const data = await response.json()
      if (response.ok) {
        setCachedProducts(data);
        setproductState(data.products)
        setproductState1(data)
      }
      else {
        console.log("Unable to fetch orders")


      }
    }
    catch (err) {
      console.log(err)


    }
  }


  const modifyCloudinaryUrl = (url) => {
    const urlParts = url?.split('/upload/');
    return urlParts && `${urlParts[0]}/upload/c_limit,h_1000,f_auto,q_50/${urlParts[1]}`;
  };

  useEffect(() => {
    if (prdtOpens === false) {
      if (cvalue !== "") {
        const fetchcl = async () => {
          try {
            const response = await fetch(`/api/products?page=1&state=${state}&limit=1000&sort=order&collectionHandle=${cvalue}`)
            const data = await response.json()
            if (response.ok) {
              setCachedProducts(data);
              setproductState(data.products)
              setproductState1(data)
            }
            else {
              console.log("Unable to fetch orders")


            }
          }
          catch (err) {
            console.log(err)


          }
        }
        fetchcl()

      }
      else {


        const getProducts = async () => {
          try {
            const response = await fetch(`/api/products?page=${page}&state=${state}&limit=100`)
            const data = await response.json()
            if (response.ok) {
              setCachedProducts(data);
              setproductState(data.products)
              setproductState1(data)
            }
            else {
              console.log("Unable to fetch orders")


            }
          }
          catch (err) {
            console.log(err)


          }
        }

        getProducts()
      }

      const searchParams = new URLSearchParams();
      searchParams.delete('prdt');
      searchParams.set('page', page);
      searchParams.set('state', state);
      searchParams.set('pageName', "products");



      router.push(`${pathname}?${searchParams.toString()}`, { scroll: true });

    }

  }, [page, state, prdtOpens, cvalue]);


  // const [addPrdt,setAddPrdt]=useState(false)


  const closePrdt = () => {
    setPrdtOpens(false)
    const searchParams = new URLSearchParams();
    searchParams.delete('prdt');
    searchParams.set('page', page);
    searchParams.set('state', state);
    searchParams.set('pageName', "products");

    router.push(`${pathname}?${searchParams.toString()}`, { scroll: true });

  }
  const addProduct = () => {
    setPrdtOpens(true)
  }

  const openPrdt = () => {

  }

  useEffect(() => {
    if (prdt !== "") {
      setPrdtOpens(true)
    }
  }, [prdt])

  const createHistory = async (value) => {
    try {
      const response = await fetch("/api/history/create-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      })
      if (response.ok) {
        setPrdtOpens(false)
      }

    } catch (error) {
      console.log(error)
    }
  }


  const deletedProduct = async (item) => {
    try {
      const response = await fetch(`/api/products/delete-product?id=${item?._id}&token=${user?.token}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
      const data = await response.json()
      if (data.status === 200) {
        createHistory({ name: user?.firstname, title: item?.title, sku: item?.sku, productchange: "Delete the Product", time: new Date() })
        toast.success("Product Deleted Successfully")

      }
      else {
        toast.error("Unable to Delete Product")
      }

    } catch (error) {
      console.log(error)
    }
  }


  const deleteProduct = (item) => {
    if (item?._id !== "") {
      if (window.confirm("Do you want to Delete this Product")) {
        deletedProduct(item)
      }
    }

  };
  const duplicateProduct = (item) => {
    const duplicateNumber = parseInt(prompt("Enter the number of duplicates you want to create", "1"), 10);

    if (!duplicateNumber || isNaN(duplicateNumber) || duplicateNumber <= 0) {
      return toast.error("Invalid number of duplicates");
    }

    if (window.confirm(`Do you want to create ${duplicateNumber} duplicate(s) of this product?`)) {
      const createProduct = async (index) => {
        try {
          const response = await fetch(`/api/products/create-product?token=${user?.token}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: item?.title,
              tags: item?.tags,
              state: "draft",
              handle: `${item?.handle}-copy-${index + 1}`,
              description: item?.description,
              price: item?.price,
              price1: item?.price1,
              category: item?.category,
              brand: item?.brand,
              sku: `${item?.sku}-copy-${index + 1}`,
              images: item?.images,
              collectionName: item?.collectionName,
              collectionHandle: item?.collectionHandle,
              variants: item?.variants,
              metaDesc: item?.metaDesc,
              metaTitle: item?.metaTitle,
              metaDesc1: item?.metaDesc1,
              metaTitle1: item?.metaTitle1,
              metaDesc4: item?.metaDesc4,
              metaTitle4: item?.metaTitle4,
              isWatchProduct: item?.isWatchProduct || false
            }),
          });

          if (response.ok) {
            createHistory({
              name: user?.firstname,
              title: item?.title,
              sku: item?.sku,
              productchange: `Duplicated product copy ${index + 1}`,
              time: new Date(),
            });
            const getProducts = async () => {
              try {
                const response = await fetch(`/api/products?page=${page}&state=${state}&limit=100`)
                const data = await response.json()
                if (response.ok) {
                  setCachedProducts(data);
                  setproductState(data.products)
                  setproductState1(data)
                }
                else {
                  console.log("Unable to fetch orders")


                }
              }
              catch (err) {
                console.log(err)


              }
            }

            getProducts()
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.error("Error duplicating product:", error);
          return false;
        }
      };

      Promise.all(
        Array.from({ length: duplicateNumber }, (_, index) => createProduct(index))
      )
        .then((results) => {
          const successCount = results.filter(Boolean).length;
          if (successCount === duplicateNumber) {
            toast.success(`${successCount} product(s) duplicated successfully`);
          } else {
            toast.error(`${duplicateNumber - successCount} product(s) failed to duplicate`);
          }
        })
        .catch(() => {
          toast.error("Something went wrong while duplicating products");
        });
    }
  };




  return (
    <div className={styles.products}>
      <LoadingBar
        color="black"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <div className={styles.addprdt} style={{ display: prdtOpens ? "flex" : "none" }}>
        <IoMdClose className={styles.close} onClick={closePrdt} />
        <div className={styles.addprdtbody}>
          <DndProvider backend={HTML5Backend}>
            <AddProduct collectionState={collectionState} />
          </DndProvider>
        </div>
      </div>
      <div className={styles.head}>
        <p className={styles.heading}>Products</p>
        <div className={styles.filter}>
          <button className={styles.btn} onClick={addProduct}>&#43; Product</button>
          <select
            name="state"
            value={state || ""}
            onChange={(e) => {
              const selectedValue = e.target.value;
              if (selectedValue === "clear") {
                clearFilter();
              } else {
                updateURL({ page, state: selectedValue });
              }
            }}
          >
            <option value="" disabled hidden>Select State</option>
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="clear">Clear Filter</option>
          </select>

          <select name="" id="" value={cvalue} onChange={(e) => fetchcl(e)}>
            {
              collectionState && collectionState?.map((item) => {
                return <option value={item?.handle} key={item?._id}>{item?.title}</option>
              })
            }
          </select>
        </div>
      </div>
      <div className={styles.productTable}>
        {(cachedProducts || productState1)?.products?.map((item, index) => {
          return (
            <div className={styles.product} key={index}>
              <div className={styles.productImg}>
                <Link href={`/voguemine-admin?pageName=products&page=${page}&state=${state}&prdt=${item?._id}`} style={{ display: 'flex', height: '100%' }}>
                  <Image src={modifyCloudinaryUrl(item?.images && item?.images[0]?.url)} alt={item?.title} width={200} height={200} style={{ height: "auto", width: "100%" }} onClick={(e) => openPrdt(item?._id)} />
                </Link>
                <div className={styles.prdtDelete}>
                  <p onClick={() => deleteProduct(item)}><abbr title='Delete'><CiTrash /></abbr></p>
                  <p onClick={() => duplicateProduct(item)}><abbr title='Duplicate'><IoDuplicateOutline /></abbr></p>
                  <abbr title={item?.state}><p className={styles.state} style={{ backgroundColor: item?.state === 'active' ? '#28ae2e' : '#ff3f3f' }}></p></abbr>
                </div>
              </div>
              <p className={styles.title} onClick={(e) => openPrdt(item?._id)}>{item?.title}</p>
              <p className={styles.sku} onClick={(e) => openPrdt(item?._id)}>{item?.sku}</p>
              <p
                className={styles.inventory}
                onClick={(e) => openPrdt(item?._id)}
                style={{
                  color:
                    item.variants.reduce((total, item) => total + item?.quantity, 0) <= 5 ? 'rgb(189, 20, 20)' : 'green',
                }}
              >
                {item.variants.reduce((total, item) => total + item?.quantity, 0)} available
              </p>
              <p className={styles.category}>{item?.collectionName}</p>
            </div>
          );
        })}
      </div>
      <div className={styles.paginate}>
        <button onClick={prevPage} disabled={page === 1 ? true : false} style={{ backgroundColor: page === 1 ? 'rgba(219, 224, 255, 1)' : '', cursor: page === 1 ? 'context-menu' : '' }}>
          Prev
        </button>
        <p>{page}</p>
        <button
          onClick={nextPage}
          disabled={productState?.length < 100 ? true : false}
          style={{ backgroundColor: productState?.length < 100 ? 'rgba(219, 224, 255, 1)' : '', cursor: productState?.length < 100 ? 'context-menu' : '' }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
