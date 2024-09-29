# Ridex 🚘

## Project Description 🗒️

This project implements a decentralized 🚘 ride-sharing system using Tron smart contracts deployed on Nile testnet and a React frontend. The system allows riders to register 💻, book rides 📚, and drivers to accept and complete trips ✅. All trip and transaction details are stored on the blockchain 🌐, ensuring transparency and immutability.

### Technology Stack 💪
- Frontend: React, Tronlink Login
- Smart Contract: Solidity
- Blockchain: Nile / Tron 

Key features include:
- User registration (both riders and drivers) 📝
- Trip creation and management 🎫
- Transaction recording for completed trips ⏺️
- Retrieval of user, trip, and transaction details ✅

## Links 🔗
Live Preview:- [View Web-app](https://ride-x-flax.vercel.app/)

Smart Contract:- [View Contract Details](https://nile.tronscan.org/#/contract/TNas9Zs2MbVhEqc1uhqtwuf9B89WVZVmBo/transactions)

## Challenges Faced 🧐

During the development of this project, several challenges were encountered:

1. **Smart Contract Interaction**: Initially, there were difficulties in retrieving data from the smart contract. This issue prevented the full implementation of the ride-booking flow.
  
2. **Data Structure Design**: Designing efficient data structures in Solidity to store and retrieve trip and user information while minimizing gas costs was challenging.

3. **Error Handling**: Implementing robust error handling and input validation to ensure the security and reliability of the smart contract and providing meaningful feedback to users through the React UI.

## Project Snapshot

![Screenshot from 2024-09-29 16-54-34](https://github.com/user-attachments/assets/ae969e33-d42c-4016-9f33-83c781dff1c0)
![Screenshot from 2024-09-29 16-55-41](https://github.com/user-attachments/assets/cfdccb84-247f-4069-bed3-a7e0c3290d2e)
![Screenshot from 2024-09-29 16-56-03](https://github.com/user-attachments/assets/16819fd9-1e19-4098-9011-ed280eb296ac)
![Screenshot from 2024-09-29 16-57-45](https://github.com/user-attachments/assets/73dfdecb-53e5-41ad-b34c-2a28b24db26b)
![Screenshot from 2024-09-29 16-58-33](https://github.com/user-attachments/assets/ddefc246-9ef0-4101-9c1d-de43f56b8c56)



## Demo Video

[Watch the project demo video]((https://youtu.be/q01snw8rhq4))

## Getting Started

To run this project locally:

1. Clone the repository
2. Go to Client folder
3. Install dependencies with `yarn`
4. Start the React development server with `yarn run dev`
5. Deploy the smart contract to a local Tron network or testnet

## License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.
