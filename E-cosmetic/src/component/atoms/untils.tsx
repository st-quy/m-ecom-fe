export const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  

 export   const reloadPage = (name: string, id: number) => {
        const url = `/products/${name}/${id}`;
        window.location.href = url;
      }; 