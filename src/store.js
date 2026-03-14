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
      return {
        ...store,
        favorites: [...store.favorites, action.payload]
      };
      case 'DELETE_FAV':
        return {
          ...store,
          favorites: store.favorites.filter(fav => fav.name != action.payload)
        }
    default:
      throw Error('Unknown action.');
  }
}
