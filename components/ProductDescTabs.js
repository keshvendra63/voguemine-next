import React,{useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import styles from '../src/app/products/[pid]/singleProduct.module.css'
import { BiSolidOffer } from "react-icons/bi";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({desc,ratings}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab style={{color:"var(--heading-color)"}} label="Offers" {...a11yProps(0)} />
          <Tab style={{color:"var(--heading-color)"}} label="Description" {...a11yProps(1)} />
          <Tab style={{color:"var(--heading-color)"}} label="Reviews" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <div className={styles.offers}>
                    <p><span><BiSolidOffer /></span><span>Use SAVE5 to get 5% Instant Discount</span></p>
                    <p><span><BiSolidOffer /></span><span>Flat 10% Discount on Prepaid Orders</span></p>
                    <p><span><BiSolidOffer /></span><span>Free Shipping on Prepaid Orders</span></p>
                </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
         <div className={styles.description}>
            <p dangerouslySetInnerHTML={{ __html:desc }} />
          </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <div className={styles.ratings}>
        
        {
          ratings?.length > 0 ?
            <div className={styles.ratingCount}>
              {
                ratings?.map((item, index) => {
                  return (
                    <div className={styles.rate} key={index}>
                      <div className={styles.name}>
                        <p style={{ fontWeight: 500, marginBottom: 0 }}>{item?.name}</p>
                        <Stack spacing={1} className={styles.star} style={{ fontSize: '25px', marginLeft: '20px' }}>
                          <Rating name="size-small" value={item?.star} size="medium" onChange={(e) => setStar(e.target.value)} disabled/>
                        </Stack>
                      </div>
                      <p style={{ color: 'grey', marginTop: '15px', fontSize: '14px' }}>{item?.comment}</p>
                    </div>
                  )
                })
              }
            </div>
            :
            ""
        }
      </div>
      </CustomTabPanel>
    </Box>
  );
}
