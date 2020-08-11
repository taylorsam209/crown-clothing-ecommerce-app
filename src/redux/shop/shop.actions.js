import ShopActionTypes from "./shop.types";

export const updateCollections = (collectionsMap) => {
  console.log("action", collectionsMap);
  return {
    type: ShopActionTypes.UPDATE_COLLECTIONS,
    payload: collectionsMap,
  };
};
