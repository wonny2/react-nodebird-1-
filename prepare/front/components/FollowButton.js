import React, { useCallback } from "react";
import { Button } from "antd";
import PropTypes from 'prop-types'
import { useSelector } from "react-redux";
import { UNFOLLOW_REQUEST , FOLLOW_REQUEST} from "../../../ch4/front/reducers/user";
import { useDispatch } from "react-redux";

const FollowButton = ({post}) => {

    const {me, followLoading, unfollowLoading} = useSelector((state) => state.user);
    const dispatch = useDispatch();


    // 내가 지금 팔로잉 했는지 안 했는지 여부
    const isFollowing = me?.Followings.find((v) => v.id === post.User.id)

    const onClickButton = useCallback(() => {
        // 팔로우 하고 있는 상태에서 다시 누르면 "언팔로우"니까, unfollow action 실행하는 것 
        if(isFollowing) {
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: post.User.id
            })
        } else {
            dispatch({
                type: FOLLOW_REQUEST,
                data: post.User.id
            })
        }
    },[isFollowing]);

    return (
        <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
            {isFollowing ? "언팔로우" : "팔로우"}
        </Button>
    )
};

FollowButton.propTypes = {
    post: PropTypes.shape.isRequired,
  };
  
export default FollowButton;