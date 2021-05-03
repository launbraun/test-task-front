import React from "react";
import {connect} from "react-redux";
import {getAllProducts, incCounter} from "../redux/product-reducer";
import './style.css'
import stub from '../img/coming-soon-400-300.jpg'
import reload from '../img/reload.svg'
import dateFormat from 'dateformat';
import {NavLink} from "react-router-dom";
import Preloader from "./Preloader";


class ProductsContainer extends React.Component {

    componentDidMount() {
        this.props.getAllProducts();
    }
    onIncreaseCounter (e) {
        let counter = this.props.counter + 9
        this.props.incCounter(counter)

    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <h2 className={''}>Каталог предложений</h2>
            <div className={'top-box'}>Найдено предложений: <span>{this.props.products.length}</span></div>
            <Product props={this.props}/>
            <button className={'btn'} onClick={(e) => this.onIncreaseCounter(e)}><img className={'reload'} src={reload} alt=""/>Показать ещё</button>
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        products: state.products.products,
        isFetching: state.products.isFetching,
        counter: state.products.counter
    }
}


export default connect(mapStateToProps, {getAllProducts,
 incCounter})(ProductsContainer)


const Product = (props) => {

    return (

        <div className={'container'}>
            {props.props.products.slice(0,props.props.counter).map(p =>
                <NavLink to={'/cat/' + p.id}>
                    <div key={p.id} className={'item'}>
                        <img src={p.photoCard === null ? stub : p.photoCard.photo} className={'img'} alt=""
                             onError={(e) => {
                                 e.target.onerror = null;
                                 e.target.src = stub
                             }}/>
                        <div className={'text-content'}>
                            <div
                                className={'period'}>{dateFormat(p.periodStart, "dd.mm")} - {dateFormat(p.periodEnd, "dd.mm")}{' '}
                                ({Math.round((((new Date(p.periodEnd).getTime() - new Date(p.periodStart).getTime()) / 86400000) + 1))} дн.)
                            </div>
                            <div className={'text-header'}>{p.header}</div>
                            <div className={'price-text'}>от <span className={'price'}>{p.minPrice}</span> руб.</div>
                        </div>
                    </div>
                </NavLink>
            )
            }
        </div>
    )
}

