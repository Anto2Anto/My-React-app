import React, {useEffect, useMemo, useState} from 'react';
import './styles/app.css';
import PostList from './components/PostList';
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import {usePosts} from "./hooks/usePosts";
import axios from "axios";
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";
import {useFetching} from "./hooks/useFetching";
import {getPageCount, getPagesArray} from "./utils/pages";
import Pagination from "./components/UI/pagination/Pagination";

function App() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount =  response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    })

    console.log(totalPages);
    useEffect(() => {
        fetchPosts(limit, page)
    }, [])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
        fetchPosts(limit, page)
    }

    return (
      <div className="App">
          <MyButton onClick={fetchPosts}>GET POSTS</MyButton><br />
          <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
              Create a post?
          </MyButton>
          <MyModal visible={modal} setVisible={setModal}>
              <PostForm create={createPost} />
          </MyModal>
          <hr style={{margin: '15px 0'}} />
          <PostFilter
              filter={filter}
              setFilter={setFilter}
          />
          {postError && <h2 style={{color: 'teal', justifyContent: 'center', margin: 25, textAlign: 'center'}}>An error occurred<p>{postError}</p></h2>}
          {isPostsLoading
            ? <div style={{display: "flex", justifyContent: 'center', marginTop: 50}}><Loader /></div>
            : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Posts about JS' style={{color: "teal"}} />
          }
          <Pagination
              page={page}
              changePage={changePage}
              totalPages={totalPages}
          />
      </div>
    );
}

export default App;
