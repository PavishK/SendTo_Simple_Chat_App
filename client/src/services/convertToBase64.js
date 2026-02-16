
export const convertToBase64 = (file) => {
    return new Promise( (resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async() => {
            resolve(reader.result);
        }

        reader.onerror = async() => {
            reject(null);
        }
    });
}