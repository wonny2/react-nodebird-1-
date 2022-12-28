import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head'
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { useSelector } from 'react-redux';
import Router from 'next/router'

const Profile = () => {

    const {me} = useSelector((state) => state.user);

    // 로그인 안 한 채로 프로필 사이트 가면 문제생겨서
    // 로그인 안 한 상태이면 들어가지 못하도록 만든 것!
    useEffect(() => {
        if(!(me && me.id)) {
            Router.push('/');
        }
    },[me && me.id]);


    if(!me) {
        return null;
    }

    return(
        <>
        <Head>
            <meta charSet='utf-8' />
            <title>내 프로필</title>
        </Head>

        {/* body 부분 */}
        <AppLayout>
            <NicknameEditForm />  
            <FollowList header="팔로잉 목록" data={me.Followings} />
            <FollowList header="팔로워 목록" data={me.Followers} />
        </AppLayout>
        </>
    )
}

export default Profile;