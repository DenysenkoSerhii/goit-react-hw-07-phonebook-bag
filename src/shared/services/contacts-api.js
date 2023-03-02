import axios from "axios";

const contactsInstance = axios.create({
    baseURL: "https://64011cf4ab6b7399d0a0c935.mockapi.io/contacts"
})

export const getAllContacts = async()=> {
    const { data } = await contactsInstance.get("");
    console.log(data);
    return data;
}

export const addContact = async(data) => {
    const { data: result } = await contactsInstance.post("/", data);
    console.log(result);
    return result;
}

export const deleteContact = async(id) => {
    const {data} = await contactsInstance.delete(`/${id}`);
    return data;
}