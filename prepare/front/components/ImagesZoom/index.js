import React, { useState } from "react";
import PropTypes from 'prop-types'
import Slick from 'react-slick'
import * as I from './ImagesZoom.presenter'

const ImagesZoom = ({images, onClose}) => {

    const [currentSlide, setCurrentSlide] = useState(0)
    console.log(currentSlide)

    return(
        <I.Wrapper>
            <I.Global />
            <I.Header>
                <h1>상세이미지</h1>
                <I.CloseBtn onClick={onClose}>X</I.CloseBtn>
            </I.Header>
            <I.SlickWrapper> 
                <div>
                    <Slick 
                        initialSlide={0} // 몇 번째 이미지부터 시작할 것인가
                        beforeChange={(slide) => setCurrentSlide(slide)} // slide를 번호로 주는데 현재 slide가 몇 번 slide인지 담기 위함
                        infinite
                        arrows={false} // 화살표 X
                        slidesToShow={1} // 사진 한장씩 보여주기
                        slidesToScroll={1} // 한장씩 넘기기
                    >
                        {images.map((v) => (
                            <I.ImgWrapper key={v.src}>
                                <img src={v.src} alt={v.src} />
                            </I.ImgWrapper>
                        ))}
                    </Slick> 
                    <I.Indicator>
                        {/* 총 이미지 갯수 중에 몇 번째 이미지인지 */}
                        <div>
                            {currentSlide + 1}
                            {' '}
                            /
                            {' '}
                            {images.length}
                        </div>
                    </I.Indicator>
                </div>
            </I.SlickWrapper>
        </I.Wrapper>
    );
}

ImagesZoom.propTypes = {
    images : PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose : PropTypes.func.isRequired
}

export default ImagesZoom;