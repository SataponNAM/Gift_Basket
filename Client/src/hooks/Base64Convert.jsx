
function Base64Convert( file ) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = reader.result.split(',')[1]; // Remove data URL prefix
            resolve(base64String);
        };
        reader.onerror = error => reject(error);
    });
}

export default Base64Convert