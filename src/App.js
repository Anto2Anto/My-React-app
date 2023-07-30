import React, {useMemo, useState} from 'react';
import './styles/app.css';
import PostList from './components/PostList';
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";

function App() {
  
    const [posts, setPosts] = useState([
      {id: 1, title: 'аа', body: 'бб'},
      {id: 2, title: 'гг 2', body: 'аа'},
      {id: 3, title: 'вв 3', body: 'яя'}
    ])

    const [selectedSort, setSelectedSort] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const sortedPosts = useMemo(() => {
        console.log('sortedPosts works fine')
        if (selectedSort) {
            return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
        }
        return posts;
    }, [selectedSort, posts])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const sortPosts = (sort) => {
        setSelectedSort(sort);
    }

    return (
      <div className="App">
        <PostForm create={createPost} />
        <hr style={{margin: '15px 0'}} />
        <div>
            <MyInput
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search..."
            />
            <MySelect
              value={selectedSort}
              onChange={sortPosts}
              defaultValue="Sort by"
              options={[
                  {value: 'title', name: 'By name'},
                  {value: 'body', name: 'By description'}
              ]}
            />
        </div>
        {posts.length
            ? <PostList remove={removePost} posts={sortedPosts} title='Posts about JS' style={{color: "teal"}} />
            :
            <h1 style={{textAlign: "center", color: "teal"}}>
                Posts not found
            </h1>
        }
      </div>
    );
}

export default App;
