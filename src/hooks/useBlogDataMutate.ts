import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios"
import { BlogData } from "../interface/BlogData";

const API_URL = 'http://localhost:8080';

const postData = async (data: BlogData): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/api/gerenciamento/post', data);
    return response;
}

export function useBlogDataMutate(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['blog-data'])
        }
    })

    return mutate;
}