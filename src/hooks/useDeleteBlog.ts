import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios"
import { BlogData } from "../interface/BlogData";

const API_URL = 'http://localhost:8080';

const deleteData = async (id: number): AxiosPromise<BlogData> => {
  const response = axios.delete(API_URL + '/api/gerenciamento/excluirPost/' + id);
  return (await response).data;
}

export function useDeleteBlog(){
  const queryClient = useQueryClient();
  const deleteBlog = useMutation(deleteData, {
    onSuccess: () => {
      queryClient.invalidateQueries(['blog-data'])
    },
    retry: 2
  });

  return deleteBlog;
}
