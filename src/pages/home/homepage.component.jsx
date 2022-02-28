import React from 'react';
import { firestore } from '../../firebase/firebase.utils';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import Shop from '../shop/shop.component';
import Checkout from '../../components/checkout/checkout.component';

import { convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';
import { connect } from 'react-redux';

import { HomePageContainer } from './homepage.styles';

const ShopWithSpinner = WithSpinner(Shop);
const CheckoutWithSpinner = WithSpinner(Checkout);

class Homepage extends React.Component {

    state = {
        loading: true
    }

    unsubscribeFromSnapshot = null;

    componentDidMount(){
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');

        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({ loading: false});
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
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(Homepage);