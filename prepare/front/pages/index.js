import AppLayout from '../components/AppLayout'
import React from 'react';
import { useSelector } from 'react-redux';
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'

const Home = () => {
    const {me} = useSelector((state) => state.user) 
    const {mainPosts} = useSelector((state) => state.post)
    

    return(
        <AppLayout>
            {me && <PostForm />}
            {mainPosts.map((post) => <PostCard key={post.id} post={post} />)} {/*key값으로 index사용을 지양하는 이유는 반복된 것들이 지워질 가능성이 있다면, 순서가 달라지는 가능성이 있다면 index 사용 비추*/}
        </AppLayout>
    )

}

export default Home;