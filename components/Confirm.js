import { useContext, useState } from 'react';
import { ethers } from 'ethers';
import { UberContext } from '../context/uberContext';
import RideSelector from './RideSelector';
import { ClipLoader } from 'react-spinners';

const style = {
  wrapper: `flex-1 h-full flex flex-col justify-between`,
  rideSelectorContainer: `h-full flex flex-col overflow-scroll`,
  confirmButtonContainer: ` border-t-2 cursor-pointer z-10`,
  confirmButton: `bg-black text-white m-4 py-4 text-center text-xl`,
  disableButton: `bg-gray-300 cursor-not-allowed`,
};

const Confirm = () => {
  const {
    currentAccount,
    pickup,
    dropoff,
    price,
    selectedRide,
    pickupCoordinates,
    dropoffCoordinates,
    metamask,
  } = useContext(UberContext);
  const [loading, setLoading] = useState(false);

  const storeTripDetails = async () => {
    setLoading(true);
    if (currentAccount) {
      try {
        await fetch('/api/db/saveTrips', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pickupLocation: pickup,
            dropoffLocation: dropoff,
            userWalletAddress: currentAccount,
            price: price,
            selectedRide: selectedRide,
          }),
        });

        await metamask.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: currentAccount,
              to: process.env.NEXT_PUBLIC_UBER_ETH_WALLET,
              gas: '0x7EF40',
              value: ethers.utils.parseEther(price)._hex,
            },
          ],
        });
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.rideSelectorContainer}>
        {pickupCoordinates && dropoffCoordinates && <RideSelector />}
      </div>
      <div className={style.confirmButtonContainer}>
        <div className={style.confirmButtonContainer}>
          <div
            className={`${style.confirmButton} ${
              !currentAccount && style.disableButton
            }`}
            onClick={() => storeTripDetails()}
          >
            {loading ? (
              <ClipLoader size={23} color="#fff" />
            ) : (
              <span>Confirm {selectedRide.service || 'UberX'}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
