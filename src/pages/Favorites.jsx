import React from 'react';
import ProductItem from '../components/ProductItem';
import Layout from '../components/Layout';
import { connect } from 'react-redux';


function Favorites(props) {
    return(
            <Layout>
                <div className="container-fluid container-min-max-width">
                    <h1>Favorite:</h1>
                    <div className="row my-4">
                        { props.products.map((product) => {
                         return <ProductItem
                             {...product}
                             key={product.id}
                         />
                        })}
                    </div>
                </div>

            </Layout>
    );
}

function mapStateToProps(state) {
    return {
        products: state.favorites.products
    };
}

export default connect(mapStateToProps)(Favorites);