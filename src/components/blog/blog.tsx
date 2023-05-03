import { useDeleteBlog } from '../../hooks/useDeleteBlog';
//import { BlogData } from '../../interface/BlogData';
import "./blog.css";

interface BlogProps {
  id: number,
  title: string,
  image: string,
  description: string,
}

export function Blog({ id, title, image, description }: BlogProps) {
  const deleteBlog = useDeleteBlog();

  const handleDelete = (blogId: number) => {
    deleteBlog.mutate(blogId);
  }
  

  return (
    <div className='blog'>
      <p><b></b>{title}</p>
      <img src={image} />
      <div className='blog-text'>
      <p><b></b>{description}</p>
      </div>
      <button className="delete-button" onClick={() => handleDelete(id)}>Excluir</button>
    </div>
  )
}