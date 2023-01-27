import { Grid } from '@mui/material';
import CaptureScreenButtons from 'components/common/capture-screen-buttons';
import styles from 'styles/button-lists.module.css';
import stylesCommon from 'styles/common.module.css';

import { buttonArray } from 'utils/buttons-array';
import Image from 'next/image';

const ButtonLists = ({ selectedTab }:any) => {
  return (
    <Grid container className={styles['scroll-container']}>
      <div className={stylesCommon['button-row']}>
        {buttonArray.map((button, index) => (
          <CaptureScreenButtons
            name={button.name}
            key={index}
            selectedTab={selectedTab}
          >
            <Image alt="icon" src={button.image} width={100} height={50} />
          </CaptureScreenButtons>
        ))}
      </div>
    </Grid>
  );
};

export default ButtonLists;
