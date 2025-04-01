import axios from "axios";
import api from "./baseapi";

interface Post {
    title: string,
    description: string,
    imageKey: string
}

interface ImageData {
    fileName : string,
    fileType : string
}

const createPost = async (postData: Post) => {
  try {
    const response = await api.post('/posts', postData);
    return response.data;
  } catch (error) {
    throw error;
  }
};


const updatePost = async (postId : string, postData: Post) => {
  try {
    const response = await api.put(`/posts/${postId}`, postData);
    return response.data;
  } catch (error) {
    throw error;
  }
};


const getPost = async (postId: string) => {
  try {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deletePost = async (postId: string) => {
  try {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


const getAllPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    throw error;
  }
};


const getPresignedUrl = async (imageData: ImageData )=>{
    try{
        const response = await api.post('/media/generate-upload-url',imageData);
        return response.data;
    }catch(error){
        throw error;
    }

};

export { createPost, updatePost, getPost, getAllPosts ,deletePost,getPresignedUrl};
