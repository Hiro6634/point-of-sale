import React from 'react';
import { convertCategorySnapshotToMap, firestore } from '../../firebase/firebase.utils';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import Shop from '../shop/shop.component';
import Checkout from '../../components/checkout/checkout.component';

import { convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';
import { connect } from 'react-redux';

import { HomePageContainer } from './homepage.styles';
import { updateCategories } from '../../redux/category/category.actions';

const ShopWithSpinner = WithSpinner(Shop);
const CheckoutWithSpinner = WithSpinner(Checkout);

class Homepage extends React.Component {

    state = {
        loading: true,
        collectionsUpdated: false,
        categoriesUpdated: false
    }

    unsubscribeFromSnapshot = null;

    componentDidMount(){
        const {updateCollections, updateCategories} = this.props;
        const collectionRef = firestore.collection('collections');
        const categoriesRef = firestore.collection('categories');


        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({
                ...this.state,
                collectionsUpdated: true
            });

            if( this.state.categoriesUpdated ){
                this.setState({ 
                    ...this.state,
                    loading: false
                });
            }
        });

        categoriesRef.get().then(snapshot => {
            const categoriesMap = convertCategorySnapshotToMap(snapshot);
            console.log("UPDATE_CATEGORIES", categoriesMap);
            updateCategories(categoriesMap);
            this.setState({
                ...this.state,
                categoriesUpdated: false
            });

            if( this.state.collectionsUpdated ){
                this.setState({ 
                    ...this.state,
                    loading: false
                });
            }
        });

    }
    render(){
        const { loading } = this.state;

        return(
        <HomePageContainer>
            <ShopWithSpinner isLoading={loading}/>
            <CheckoutWithSpinner isLoading={loading}/>
        </HomePageContainer>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap)),
    updateCategories: categoriesMap => dispatch(updateCategories(categoriesMap))
});

export default connect(null, mapDispatchToProps)(Homepage);