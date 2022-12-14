import React from 'react';

import Typography from '@mui/material/Typography/Typography';

import styles from './EmptyTable.module.scss';

import { GeneralButton } from 'common/components/Buttons/GeneralButton/GeneralButton';

type SubTablePropsType = {
  buttonTitle: string;
  text: string;
  callBack: () => void;
};
export const EmptyTable: React.FC<SubTablePropsType> = ({
  buttonTitle,
  text,
  callBack,
}) => {
  return (
    <div className={styles.main}>
      <Typography className={styles.title}>{text}</Typography>
      <GeneralButton label={buttonTitle} onClick={callBack} />
    </div>
  );
};
