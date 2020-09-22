const regionAccessor = {
  nodeName: 'Region',
  accessor: 'region'
};
const cityAccessor = {
  nodeName: 'City',
  accessor: 'city'
};
const restaurantAccessor = {
  nodeName: 'Restaurant',
  accessor: 'name'
};
const priceRangeAccessor = {
  nodeName: 'PriceRange',
  accessor: 'price'
};
const cuisineAccessor = {
  nodeName: 'Cuisine',
  accessor: 'cuisine'
};

module.exports = {
  dataAccessors: [regionAccessor, cityAccessor, restaurantAccessor, cuisineAccessor, priceRangeAccessor],
  parsingRules: [
    [regionAccessor, cityAccessor, 'IS_IN'],
    [cityAccessor, restaurantAccessor, 'LOCATED_IN'],
    [cuisineAccessor, restaurantAccessor, 'IS'],
    [restaurantAccessor, priceRangeAccessor, 'INCLUDES'],
  ]
};

