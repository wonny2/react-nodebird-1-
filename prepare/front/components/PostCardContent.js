import React from "react";
import PropTypes from 'prop-types'
import Link from 'next/link'


// 해쉬태그를 클릭하면 해당 링크로 이동하도록 만들기.
// 하지만 어떤 게 해쉬태그인지 구별해줘야 한다.
// [정규표현식]을 사용하여 만들기.

const PostCardContent = ({ postData }) => ( // 첫 번째 게시글 #해시테그 #익스프레스
        <div>
            {postData?.split(/(#[^\s#]+)/g).map((v) => {
                if(v.match(/(#[^\s#]+)/)) {
                    return(
                    <Link href={`/hashtag/${v.slice(1)}`} key={v}>
                        <a>{v}</a>
                    </Link>
                    )
                }
                return v;
            })}
        </div>
)

PostCardContent.propTypes = { postData : PropTypes.string.isRequired };

export default PostCardContent;
