import React from 'react';
import Layout from '../components/Layout';
import products from '../utils/products.json';
import './Product.css';
import { connect } from 'react-redux';
import { addToCart } from '../redux/actions/cart';
import { addToFavorites, removeFromFavorites} from '../redux/actions/favorites';
import {ReactComponent as Favorites} from '../assets/icons/heart-full.svg';
import {ReactComponent as NotInFavorites} from '../assets/icons/heart-empty.svg';


class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {}
        }
    }

    componentDidMount() {
        const { match } = this.props;
        const productId = match.params.productId;
        const categoryValues = Object.values(products);
        const productItems = categoryValues.reduce((acc, category) => {
            return [
                ...acc,
                ...category.items
            ]
        }, []);
        const currentProduct = productItems.find(product => {
            return Number(productId) === product.id;
        });
        this.setState({product: currentProduct});
    }

    render() {
        const { product } = this.state;

        return (
            <Layout>
                <div className="product-page container-fluid container-min-max-width">
                    <h1 className="test my-5 h2 mr-3">{product.nume}</h1>
                    {this.props.products.filter(product => product.id === product.id).length !== 0 
                    ? <Favorites className="mb-2" 
                                 onClick={() => this.props.removeFromFavorites({id: product.id})}
                      /> 
                    : <NotInFavorites className="mb-2"
                                      onClick={() => this.props.addToFavorites({
                                          product: {
                                            id: product.id,
                                            nume: product.nume,
                                            pret: product.pret,
                                            moneda: product.moneda,
                                            image: product.image
                                          }
                                      })}
                      />}
                    <div className="product-info d-flex">
                        <div className="image-wrapper d-flex mr-5">
                            <img src={product.image} alt="Product presentation"/>
                        </div>
                        <div className="product-details">
                            <p className="h3 text-danger">{product.pret} {product.moneda}</p>
                            <button
                                className="btn btn-dark mb-4 font-weight-bold"
                                onClick={() => {
                                    this.props.addToCart({
                                        product: {
                                            id: product.id,
                                            nume: product.nume,
                                            pret: product.pret,
                                            moneda: product.moneda,
                                            image: product.image
                                        }
                                    })
                                }}
                            >
                                Adaugă în coș
                            </button>
                            <p><span className="font-weight-bold">Brand</span>: {product.brand}</p>
                            <p><span className="font-weight-bold">Sport</span>: {product.sport}</p>
                            <p><span className="font-weight-bold">Tip</span>: {product.tip}</p>
                            {product.nivel_pregatire ? 
                                    <p><span className="font-weight-bold">Nivel pregatire</span>: {product.nivel_pregatire}</p>
                                    : null}
                            <p><span className="font-weight-bold">Culoare</span>: {product.culoare}</p>
                            <p><span className="font-weight-bold">Greutate</span>: {product.greutate}</p>
                            {product.lungime ? 
                                    <p><span className="font-weight-bold">Lungime</span>: {product.lungime}</p>
                                    : null}
                            {product.latime ? 
                                    <p><span className="font-weight-bold">Latime</span>: {product.latime}</p>
                                    : null}
                            {product.inaltime ? 
                                    <p><span className="font-weight-bold">Inaltime</span>: {product.inaltime}</p>
                                    : null}
                            <p className="font-weight-bold mb-1">Descriere:</p>
                            <p>{product.descriere}</p>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {
        products: state.favorites.products
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addToCart: (payload) => dispatch(addToCart(payload)),
        addToFavorites: (product) => dispatch(addToFavorites(product)),
        removeFromFavorites: (id) => dispatch(removeFromFavorites(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);