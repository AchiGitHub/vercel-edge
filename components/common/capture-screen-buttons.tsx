import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Card, CardContent, CardActionArea } from '@mui/material';
import style from '../../styles/capture-screen-buttons.module.css';
import useDataStore from '../../store';
type props = {
  name: string;
  children: React.ReactNode;
  selectedTab?: number | string;
};

const CaptureScreenButtons = ({ name, children, selectedTab }: props) => {
  const setSelectedTab = useDataStore((state) => state.setSelectedTab);

  const onRuleClicked = (name:string) => {
    setSelectedTab(name);
  };
  return (
    <>
      <Grid className={style['card']}>
        <CardActionArea onClick={() => onRuleClicked(name)}>
          <Card
            className={
              selectedTab == name
                ? style['selected-button-card']
                : style['button-card']
            }
          >
            <CardContent className={style['card-content']}>
              {children}
              <p className={style['button-text']}>{name}</p>
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
    </>
  );
};

export default CaptureScreenButtons;
