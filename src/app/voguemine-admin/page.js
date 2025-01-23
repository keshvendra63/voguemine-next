import React,{Suspense} from 'react'
import Admin from '../../../components/admin/Admin';
export const dynamic = 'force-dynamic'; // Use dynamic rendering for this page

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
<Admin/>
    </Suspense>
  )
}

export default page
