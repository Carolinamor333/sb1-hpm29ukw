import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { ethers } from 'ethers';

export function useWeb3() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0]);
      });

      // Listen for chain changes
      window.ethereum.on('chainChanged', (chainId) => {
        setChainId(chainId);
      });
    }
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask to use this feature');
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      setAccount(accounts[0]);
      
      const chainId = await window.ethereum.request({
        method: 'eth_chainId'
      });
      
      setChainId(chainId);
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const signMessage = async (message) => {
    try {
      if (!web3 || !account) {
        throw new Error('Wallet not connected');
      }

      const signature = await web3.eth.personal.sign(
        message,
        account,
        '' // Password (empty for MetaMask)
      );

      return signature;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    web3,
    account,
    chainId,
    error,
    connectWallet,
    signMessage
  };
}