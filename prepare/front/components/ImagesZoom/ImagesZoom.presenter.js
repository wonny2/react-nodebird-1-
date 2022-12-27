import styled, { createGlobalStyle } from 'styled-components'
import { CloseOutlined } from "@ant-design/icons";

// 함수를 호출하는 방법 2가지
// 1. 괄호() : func()
// 2. 백틱`` : func``
// 1,2번 둘 다 같이 함수를 호출하는 것, 대신 차이가 있음. <tagged 탬플릿 리터럴>, 백틱을 탬플릿리터럴 이라고 한다.

export const Wrapper = styled.div`
    position:fixed;
    z-index:5000;
    top:0;
    left:0;
    right:0;
    bottom:0;
    // 위에 6줄이 전체화면으로 채우는 값
`

export const Header = styled.header`
    height :44px;
    background-color:white;
    position: relative;
    padding:0;
    text-align:center;

    & h1 {
        margin:0;
        font-size:17px;
        color: green;
        line-height: 44px;
    }
`

export const CloseBtn = styled(CloseOutlined)`
    position:absolute;
    right:0;
    top:0;
    padding:15px;
    line-height: 14px;
    cursor: pointer;
`

export const SlickWrapper = styled.div`
     height: calc(100%, -44px);
     background: #090909;

`

export const ImgWrapper = styled.div`
    padding: 32px;
    text-align:center;

    & img {
        margin: 0 auto;
        max-height: 750px;
    }
`

export const Indicator = styled.div`
    text-align: center;

    & > div {
        width:75px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        background: #313131;
        display:inline-block;
        text-align:center;
        color:white;
        font-size:15px;
    }
`
 
export const Global = createGlobalStyle`
    .slick-slide {
        display:inline-block;
    }
`