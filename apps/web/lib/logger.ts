const debug = (msg: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(msg);
  }
};

export const logger = {
  debug,
};
