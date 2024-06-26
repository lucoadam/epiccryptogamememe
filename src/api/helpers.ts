import axiosInstance from ".";


export const loginUser = async (publicKey: string, signature: string) => {
    return await axiosInstance.post('/auth/login', {
        publicKey,
        signature
    })
}

export const getSignMessage = async (address: string) => {
    return await axiosInstance.get('/user/nonce', {
        params: {wallet: address}
    })
}


export const getMemeImages = async () => {
    return await axiosInstance.get("/meme/getMemes");
}