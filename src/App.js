import React, {useMemo, useState} from 'react';
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

function App() {
  
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    async function fetchPosts() {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        setPosts(response.data)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
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
        {sortedAndSearchedPosts.length
            ? <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Posts about JS' style={{color: "teal"}} />
            :
            <h1 style={{textAlign: "center", color: "teal"}}>
                Posts not found
            </h1>
        }
      </div>
    );
}

export default App;
