# MvP_Solana

The idea is to provide statistics about a vehicle using the data provided by the sensors onboard.

The car provides the data by creating packets of sensor readings from all the sensors available. Periodically this packets are tokenized and transfered to the owner of the car (put in it's crypto wallet). At the moment a script is used to create these tokens.

The owner of the car can then fetch these tokens and access the data to compute statistics and build the dashboard.

## Technical informations

We decided to use NextJS to build our web application. The page structure is as follow:
- Login page: at the moment is not really implemented a credentials system, but in the future each user will be able to log in wih their wallet using the browser extension. (For the moment just click the login button to enter the dashboard)
- Reservation: allows to book a car for a trip selecting the trip and the modality (book for a certain amount of time or for a trip). At the moment the reservation is not saved anywhere, but in the future we will exploit the blockchain for this
- Monitor: shows the information (from the user point of view) about the current trip of the car
- Manager: shows the information (from the manager point of view) about the car

To run the project you need to install the required packages from `package.json` (e.g. `npm install`) and the run the `dev` script (e.g. `npm run dev`). The application will be aviable at http://localhost:3000.