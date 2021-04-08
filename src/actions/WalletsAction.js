import _ from 'lodash';
import {createWallet, getWallets} from '../utils/fileManager';

export const fetchWallets = () => async (dispatch) => {
  const data = await getWallets();
  dispatch({
    type: 'SET_WALLETS',
    payload: data,
  });
};

export const addWallet = (wallet) => async (dispatch) => {
  await createWallet(wallet);
  const data = await getWallets();
  dispatch({
    type: 'SET_WALLETS',
    payload: data,
  });
};

export const removeWallet = (wallet) => async (dispatch) => {
  const data = await getWallets();
  const filterWallets = _.filter(
    data,
    (walletItem) => walletItem.label !== wallet.label,
  );
  dispatch({
    type: 'SET_WALLETS',
    payload: filterWallets,
  });
};
