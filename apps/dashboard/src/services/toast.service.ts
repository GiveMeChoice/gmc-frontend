import { ScreenDataAction } from '@root/context-providers/screen-data.provider';

export interface IToast {
  level: 'INFO' | 'SUCCESS' | 'ERROR';
  message: string;
  timeoutId?: NodeJS.Timeout;
}

const setToast = (
  toast: IToast,
  dispatch: React.Dispatch<ScreenDataAction>
) => {
  const timeoutId = setTimeout(() => {
    removeToast(dispatch);
  }, 4000);
  dispatch({
    type: 'SET_TOAST',
    value: {
      ...toast,
      timeoutId,
    },
  });
};

const removeToast = (dispatch: React.Dispatch<ScreenDataAction>) => {
  dispatch({ type: 'REMOVE_TOAST', value: null });
};

export const toastService = {
  setToast,
  removeToast,
};
