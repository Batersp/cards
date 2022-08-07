import React from 'react';

import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { NavLink, useSearchParams } from 'react-router-dom';

import { PackType } from 'api/cardsAPI';
import deleteIco from 'assets/images/delete.svg';
import editIco from 'assets/images/edit.svg';
import teacherIco from 'assets/images/teacher.svg';
import s from 'common/components/DataTable/DataTable.module.css';
import { startPageCount } from 'common/constants/projectConstants';
import { path } from 'common/enums/path';
import { sortPacks } from 'common/enums/sortPacks';
import { useAppDispatch } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { setLocalStorage } from 'common/utils/localStorageUtil';
import { setCardPacksParams } from 'features/Cards/CardPacks/CardPacksParams/cardPacksParamsReducer';

type PacksTableBodyProps = {
  pack: PackType;
};

export const PackTableBody: React.FC<PacksTableBodyProps> = ({
  pack,
}): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const updateDate = new Date(pack.updated).toLocaleDateString('ru');

  const showCards = (): void => {
    dispatch(
      setCardPacksParams({
        params: {
          user_id: searchParams.get('user_id') || undefined,
          packName: searchParams.get('packName') || undefined,
          min: searchParams.get('min') || undefined,
          max: searchParams.get('max') || undefined,
          sortPacks: (searchParams.get('sortPacks') as sortPacks) || undefined,
          page: searchParams.get('page') || undefined,
          pageCount: searchParams.get('pageCount') || String(startPageCount),
        },
      }),
    );
    setLocalStorage('packName', pack.name);
  };

  return (
    <TableRow hover>
      <TableCell component="th" scope="row">
        <NavLink
          to={`${path.PACK}?cardsPack_id=${pack._id}`}
          className={s.nameLink}
          onClick={showCards}
        >
          {pack.name}
        </NavLink>
      </TableCell>
      <TableCell align="right">{pack.cardsCount}</TableCell>
      <TableCell align="right">{updateDate}</TableCell>
      <TableCell align="right">{pack.user_name}</TableCell>
      <TableCell align="right">
        <Box component="img" src={deleteIco} alt="deleteIco" className={s.ico} />
        <Box component="img" src={editIco} alt="editIco" className={s.ico} />
        <Box component="img" src={teacherIco} alt="teacherIco" className={s.ico} />
      </TableCell>
    </TableRow>
  );
};
