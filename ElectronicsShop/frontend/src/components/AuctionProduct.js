import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import Rating from './Rating';
import '../index.css';
import CountDownTimer from './Countdown/CountdownTimer';

const AuctionProduct = (props) => {
    const { product } = props;
    console.log(product ,'ok this is individual product');

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems }, userInfo
    } = state;

    const addToCartHandler = async (item) => {
        const existItem = cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity },
        });
    };
    console.log(product, 'id')
    return (
        <div>
            <div class="card homecard" >
                <div class="row g-0" >
                    <div class="col-md-4 col-4" >
                        <img src={product.image} width='150px' height='150px' class="img-fluid rounded-start homecardimg" alt="..." />
                    </div>
                    <div class="col-md-8 col-8">
                        <div class="card-body">
                            <h5 class="card-title">{product.name}</h5>

                            <p class="card-text">৳{product.price}</p>
                            <p class="card-text"><CountDownTimer targetDate={product.time}/></p>

                            {

                                userInfo === null ? (<Link className='text-decoration-none' to={`/signin`}>
                                    <button>Bid Now</button>
                                </Link>) : (userInfo.isAdmin ? (
                                    <Link to='/admin/manage'> <button class="button btn btn-warning btn-sm mt-2 homecardbtn" type="button">Edit Product</button></Link>
                                ) : (

                                    <Link className='text-decoration-none' to={`/auctionproduct/${product.slug}`}>
                                        <button className='btn btn-warning text-black text-bold'>Bid Now</button>
                                    </Link>

                                ))
                            }





                        </div>
                    </div>

                </div>

            </div >
        </div>
    );
};

export default AuctionProduct;
