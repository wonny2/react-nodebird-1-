import React, { useCallback } from "react";
import { Avatar, Button, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT_REQUEST } from '../reducers/user';

// 로그인 후 보여질 화면
const UserProfile = () => {
    const dispatch = useDispatch();
    const {me, logOutLoading} = useSelector((state) => state.user);

    const onLogOut = useCallback(() => {
        dispatch({
          type: LOG_OUT_REQUEST,
        });
      }, []);


    return(
        <Card
            actions={[ // 배열이기 때문에 key 넣어줘야 함!!
                <div key="twit">짹짹<br />{me.Posts.length}</div>,
                <div key="following">팔로잉<br />{me.Followings.length}</div>,
                <div key="follower">팔로워<br />{me.Followers.length}</div>
            ]}
        > 

            <Card.Meta 
                avatar={<Avatar>{me.nickname[0]}</Avatar>}
                title={me.nickname}
            />
            
            <Button onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
        </Card>
    )
}

export default UserProfile;