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

![Screenshot_106](https://github.com/user-attachments/assets/eb51cd7d-23e8-454c-b2ed-570c963e2850)
![screely-1723904093265](https://github.com/user-attachments/assets/a9d2ada9-071d-412b-b077-b2ee4ec329e5)
![screencapture-amb-duber-vercel-app-2024-08-17-19_30_16 (1)](https://github.com/user-attachments/assets/3c5c6f94-3b46-4abd-9cec-95e2ea554b2c)
![screely-1723904172105](https://github.com/user-attachments/assets/ce6f77ed-ae73-4734-9fd7-436a44534436)


## Demo Video

[Watch the project demo video](https://www.loom.com/share/5de2b384d43046e0ba7a4c587d376ff2?sid=6f076e40-7824-4b1b-9074-944f7d91b361)

## Getting Started

To run this project locally:

1. Clone the repository
2. Go to Client folder
3. Install dependencies with `yarn`
4. Start the React development server with `yarn run dev`
5. Deploy the smart contract to a local Tron network or testnet

## License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.
