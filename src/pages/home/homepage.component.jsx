import React from 'react';
import { Route } from 'react-router-dom';
import { firestore } from '../../firebase/firebase.utils';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import ShopPage from '../shop/shop.component';
import { convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';
import { connect } from 'react-redux';

import { HomePageContainer } from './homepage.styles';

const ShopPageWithSpinner = WithSpinner(ShopPage);


class Homepage extends React.Component {

    state = {
        loading: true
    }

    unsubscribeFromSnapshot = null;

    componentDidMount(){
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');
        console.log("loading...");

        collectionRef.onSnapshot( async snapshot => {
            const collectionsMap = convertCollectionSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            console.log("loaded...");
            this.setState({loading: false});
        });
    }    

    render(){
        const { match } = this.props;
        const { loading } = this.state;

        return(
        <HomePageContainer>
            <Route
                exact path={`${match.path}`}
                render={props => (
                    <ShopPageWithSpinner isLoading={loading}{...props}/>
                )}
            />
        </HomePageContainer>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(Homepage);