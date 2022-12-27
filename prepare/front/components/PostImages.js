import React , {useCallback, useState} from "react";
import PropTypes from 'prop-types'
import {PlusOutlined} from '@ant-design/icons'
import ImagesZoom from "./ImagesZoom";


const PostImages =({ images }) => {

    const [showImagesZoom, setShowImagesZoom] = useState(false)

    const onZoom = useCallback(()=>{
        setShowImagesZoom(true)
    },[])

    const onClose = useCallback(() => {
        setShowImagesZoom(false)
    })


    if(images.length === 1) {
        return(
            <>
                {/* 이미지를 클릭하면 확대되서 캐러셀처럼 한장씩 넘기도록 */}
                <img role="presentation" style={{maxHeight: '540px', maxWidth: "300px"}} src={images[0].src} alt={images[0].src} onClick={onZoom} />
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose}/>}
            </>
        )
    }

    if(images.length === 2) {
        return(
            <>
                <img role="presentation" style={{width:"50%", display:"inline-block" }} src={images[0].src} alt={images[0].src} onClick={onZoom} />
                <img role="presentation" style={{width:"50%" , display:"inline-block" }} src={images[1].src} alt={images[1].src} onClick={onZoom} />
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose}/>}
            </> 
        )
    }

    return(
        // 위에서 if문으로 1,2개일 때 어떻게 나오는지 적어줬기 때문에 이 부분에서는 이미지가 3개 이상일 때 나오는 모습임
        <div>
            <img role="presentation" width="50%" src={images[0].src} alt={images[0].src} onClick={onZoom} />
            <div
                role="presentation"
                style={{display:'inline-block' , width:'50%', textAlign:'center' , verticalAlign:'middle'}}
                onClick={onZoom}>
                    <PlusOutlined />
                    <br />
                    {images.length -1 }
                    개의 사진 더보기
            </div>
            {showImagesZoom && <ImagesZoom images={images} onClose={onClose}/>}
        </div>
    )
}

PostImages.propTypes = {
    images : PropTypes.arrayOf(PropTypes.object),
}

export default PostImages;