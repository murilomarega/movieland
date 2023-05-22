const removeDuplicated = (arr, newData) => {
  if (!Boolean(arr?.length) && !Boolean(newData?.length)) return [];

  if (Boolean(arr?.length) && !Boolean(newData?.length)) return arr;

  if (!Boolean(arr?.length) && Boolean(newData?.length)) return newData;

  return [
    ...arr,
    ...newData?.filter((movie) => !arr.find((item) => item.id === movie.id)),
  ];
};

export { removeDuplicated };
