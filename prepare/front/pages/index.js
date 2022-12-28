import AppLayout from '../components/AppLayout'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import { LOAD_POSTS_REQUEST } from '../reducers/post';

const Home = () => {

    const {me} = useSelector((state) => state.user) 
    const {mainPosts, hasMorePosts, loadPostsLoading} = useSelector((state) => state.post)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: LOAD_POSTS_REQUEST
        })    
    },[]);

    // 어느정도 스크롤이 내려가면 이미지를 불러오게 하는 것 - 인피니트스크롤이랑 비숫
    useEffect(() => {
        //1. 스크롤 위치 탐색하는 함수
        function onScroll() {
            console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight)
            if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
                if(hasMorePosts && !loadPostsLoading) {
                    dispatch({
                        type: LOAD_POSTS_REQUEST
                    });
                }
            }
        };

        window.addEventListener('scroll', onScroll)

        // 3. 스크롤 했던 거 해제해야함. eventListener은 메모리에 쌓여있기 때문임
        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    },[hasMorePosts, loadPostsLoading])
    

    return(
        <AppLayout>
            {me && <PostForm />}
            {mainPosts.map((post) => <PostCard key={post.id} post={post} />)} {/*key값으로 index사용을 지양하는 이유는 반복된 것들이 지워질 가능성이 있다면, 순서가 달라지는 가능성이 있다면 index 사용 비추*/}
        </AppLayout>
    )

}

export default Home;