import React from 'react'
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {getProduct} from "../redux/product-reducer";
import SwiperCore, {Navigation, Pagination, Scrollbar} from 'swiper';
import dateFormat from "dateformat";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import Preloader from "./Preloader";
import stub from '../img/stub.jpg'

SwiperCore.use([Navigation, Pagination, Scrollbar]);

class FullInfo extends React.Component {

    componentDidMount() {
        let id = this.props.match.params.id
        this.props.getProduct(id)
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <FullInfoItem props={this.props}/>
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        product: state.products.product,
        isFetching: state.products.isFetching
    }
}

export default compose(
    connect(mapStateToProps, {getProduct}),
    withRouter)(FullInfo)


const FullInfoItem = (props) => {

    return (
        <>
            <div className={'title'}>{props.props.product.title}</div>
            <div className={'sub-title'}>Цена от <span className={'price-color'}>{props.props.product.minPrice} </span>руб. за человека
                на <span className={'date-color'}>{dateFormat(props.props.product.periodStart, "dd.mm")} - {dateFormat(props.props.product.periodEnd, "dd.mm")}</span></div>
            <div className={'header'}>{props.props.product.header}</div>
            <div className={'slider'}>
            <Swiper
                spaceBetween={30}
                slidesPerView={3}
                pagination={{clickable: true}}
                scrollbar={{draggable: false}}
            >
                {props.props.product.photoAlbum === null ? '' :
                    props.props.product.photoAlbum && props.props.product.photoAlbum.map(i =>
                        <SwiperSlide><img src={i.thumbnail} alt=""
                                          onError={(e) => {
                                              e.target.onerror = null;
                                              e.target.src = stub
                                          }}/></SwiperSlide>)}
            </Swiper>
        </div>
            <div className={'description'}>{props.props.product.description}</div>
        </>
    )
}
