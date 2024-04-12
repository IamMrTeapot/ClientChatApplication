export const imageUtils = {
    convertToBase64(file: File): Promise<string> {
        return new Promise<string>((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result as string);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      }
  };
  