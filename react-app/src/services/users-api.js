import { API } from "aws-amplify";

export function getPatient(id) {
    return API.get("users", `/users/${id}`);
}

export function getAllPatients() {
    return API.get("users", "/users");
}

export function createPatient(data) {
    return API.post("users", "/users", {
    body: data
});
}

export function savePatient(id, data) {
    return API.put("users", `/users/${id}`, {
    body: data
    });
}

export function deletePatient(id) {
    return API.del("users", `/users/${id}`)
}