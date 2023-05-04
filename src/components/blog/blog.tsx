//import { useDeleteBlog } from '../../hooks/useDeleteBlog';
//import { BlogData } from '../../interface/BlogData';
import "./blog.css";

interface BlogProps {
  id?: number,
  title: string,
  image: string,
  description: string,
}

export function Blog({ id, title, image, description }: BlogProps) {
  

  return (
    <div className='blog'>
      <p><b>ID: </b>{id}</p>
      <p><b></b>{title}</p>
      <img src={image} />
      <div className='blog-text'>
      <p><b></b>{description}</p>
      </div>

    </div>
  )
}