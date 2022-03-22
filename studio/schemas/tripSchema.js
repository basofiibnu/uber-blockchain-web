export const tripSchema = {
  name: 'trips',
  type: 'document',
  title: 'Trips',
  fields: [
    {
      name: 'dropoff',
      type: 'string',
      title: 'Drop off',
    },
    {
      name: 'pickup',
      type: 'string',
      title: 'Pick up',
    },
    {
      name: 'rideCategory',
      type: 'string',
      title: 'Trip Type',
    },
    {
      name: 'price',
      type: 'number',
      title: 'Trip Price',
    },
    {
      name: 'rideTimestamp',
      type: 'datetime',
      title: 'Trip Timestamp',
    },
    {
      name: 'passenger',
      type: 'reference',
      title: 'Passenger',
      to: [{ type: 'users' }],
    },
  ],
};
