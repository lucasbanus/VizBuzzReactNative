import { combineReducers } from 'redux';
//import {createStore, applyMiddleware} from 'redux';
import {changePageSetup} from './pageSetupReducer';
import {changePodcast} from './podcastReducer';
import { searchPodcasts } from './podcastSearchReducer';
import {changeFavePodcasts} from './userFavoritePodcastReducer';

const rootReducer = combineReducers({
    podcast: changePodcast,
    pageSetup: changePageSetup,
    favePodcasts: changeFavePodcasts,
    podcastSearch: searchPodcasts,
});

// const persistConfig = {
//     key: 'root',
//     storage: storage,
//     whitelist: ['user', 'userAuthentication']
// };

// const pReducer = persistReducer(persistConfig, rootReducer);
// const middleware = applyMiddleware(thunk, logger);
// const store = createStore(pReducer, middleware);
// const persistor = persistStore(store);


export default rootReducer;
//export {persistor, store};