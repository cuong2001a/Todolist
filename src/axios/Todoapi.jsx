import { axiosClient } from "./axiosClient";
export const ToDoApi = {
    list() {
        const url = `/`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/`;
        return axiosClient.post(url, data);
    },
    read(id) {
        const url = `/${id}`;
        return axiosClient.get(url);
    },
    edit(id, data) {
        const url = `/${id}`;
        return axiosClient.put(url, data);
    },
    remove(id) {
        const url = `/${id}`;
        return axiosClient.delete(url);
    }

}