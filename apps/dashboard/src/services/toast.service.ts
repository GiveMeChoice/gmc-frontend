import { ScreenDataAction } from '@root/context-providers/screen-data.provider';

export interface IToast {
  level: 'INFO' | 'SUCCESS' | 'ERROR';
  message: string;
}

const setToast = (
  toast: IToast,
  dispatch: React.Dispatch<ScreenDataAction>
) => {
  dispatch({ type: 'SET_TOAST', value: toast });
  setTimeout(() => {
    dispatch({ type: 'REMOVE_TOAST', value: null });
  }, 5000);
};

export const toastService = {
  setToast,
};
