export const initialStore = () => {
  return {
    favorites: [],
    data: {},
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'ADD_INFO':
      return {
        ...store,
        data: action.payload
      };
    case 'ADD_FAV':
      let newfav = action.payload
      console.log("entra en el case OK");

      if (store.favorites.find(item => item.name === newfav.name) == undefined) {
        console.log("esto es fav ", newfav)
        return {
          ...store,
          favorites: [...store.favorites, newfav]
        };
      }
      else {
        return {
          ...store,
          favorites: store.favorites.filter(fav => fav.name != newfav.name)
        }
      }
    case 'ADD_DATA_FROM_LS':
      return {
        ...store,
        data: action.payload
      }
    case 'ADD_FAVS_FROM_LS':
      return {
        ...store,
        favorites: action.payload
      }
    case 'DELETE_FAV':
      return {
        ...store,
        favorites: store.favorites.filter(fav => fav.name != action.payload)
      }
    default:
      throw Error('Unknown action.');
  }
}
