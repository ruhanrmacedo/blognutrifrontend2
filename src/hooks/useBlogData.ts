import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { BlogData } from "../interface/BlogData";

const API_URL = 'http://localhost:8080';

const fetchData = async (): AxiosPromise<BlogData[]> => {
    const response = axios.get(API_URL + '/api/gerenciamento/posts');
    return response;
}



export function useBlogData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['blog-data'],
        retry: 2
    }) 

    return {
        ...query,
        data: query.data?.data
    }
}