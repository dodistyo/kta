const validateFileType = (fileList: FileList, allowedFileType: Array<string> = []) => {
  let res = true;
  if (fileList.length > 0) {
    Array.from(fileList).some(file => {
      const exist = allowedFileType.includes(file.type);
      if (exist === false) {
        res = exist;
      }
      return exist === false;
    });
  }
  return res;
};

const validateFileSize = (fileList: FileList, maxKb: number) => {
  let total = 0;
  if (fileList.length > 0) {
    Array.from(fileList).forEach(file => {
      total += Math.round(file.size / 1024);
    });
  }
  return total <= maxKb;
};

export { validateFileType, validateFileSize };
