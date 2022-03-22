export const rideSchema = {
  name: 'rides',
  title: 'Rides',
  type: 'document',
  fields: [
    {
      name: 'orderById',
      title: 'Order By Id',
      type: 'number',
    },
    {
      name: 'title',
      title: 'title',
      type: 'string',
    },
    {
      name: 'priceMultiplier',
      title: 'Price Multiplier',
      type: 'number',
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'image',
    },
  ],
};
