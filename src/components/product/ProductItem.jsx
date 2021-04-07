import React from 'react';
import './ProductItem.css';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/cart/cartActions'; 
import { addToFavorites, removeFromFavorites} from '../../redux/favorites/favoritesActions';
import { Link } from 'react-router-dom';
import {ReactComponent as Favorites} from '../../assets/icons/heart-full.svg';
import {ReactComponent as NotInFavorites} from '../../assets/icons/heart-empty.svg';


function ProductItem(props) {
    const {nume, pret, moneda, image, id} = props;

    return(
        <div className="product-item col-12 col-md-4 mb-3 d-flex flex-column align-items-center">
            <Link to={`/product/${id}`} className="d-flex flex-column align-items-center">
                <img src={image} alt="productPhoto" className="mb-2"/>
                <p className="mb-1 text-center">{ nume }</p>
                <p className="text-center">{ pret + moneda }</p>
            </Link>
            {props.products.filter(product => product.id === id).length !== 0 
                    ? <Favorites className="mb-2" 
                                 onClick={() => props.removeFromFavorites({id})}
                      /> 
                    : <NotInFavorites className="mb-2"
                                      onClick={() => props.addToFavorites({
                                          product: {
                                            id,
                                            nume,
                                            pret,
                                            moneda,
                                            image
                                          }
                                      })}
                      />}
            <button
                className="btn btn-outline-dark"
                onClick={() => props.addToCart({
                    product: {
                        id,
                        nume,
                        pret,
                        moneda,
                        image
                    }
                })}
            >
                Adaugă în coș
            </button>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        products: state.favorites.products
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addToCart: (product) => dispatch(addToCart(product)),
        addToFavorites: (product) => dispatch(addToFavorites(product)),
        removeFromFavorites: (id) => dispatch(removeFromFavorites(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);