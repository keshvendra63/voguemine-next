import Image from "next/image";
const modifyCloudinaryUrl = (url) => {
    const urlParts = url?.split('/upload/');
    return urlParts && `${urlParts[0]}/upload/c_limit,h_1000,f_auto,q_auto/${urlParts[1]}`;
  };
export default function Loading() {
    return <div className='loading'>
<Image src={modifyCloudinaryUrl('https://res.cloudinary.com/dqh6bd766/image/upload/c_limit,h_1000,f_auto,q_auto/v1737957198/hqkx6iwzbjhr7oxfyvnq.png')} width={100} height={100} style={{objectFit:"cover"}} alt='loading-image'/>
    </div>
  }