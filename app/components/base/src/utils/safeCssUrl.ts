const safeCssUrl = (url: string) =>
  url.replace(/\s+|[,(){}[\]'"]/g, matched => {
    return `\\${matched}`;
  });

export default safeCssUrl;
