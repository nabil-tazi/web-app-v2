import { DappConfig } from './dapp.types';
import { polygon, polygonMumbai, Chain } from 'wagmi/chains';

export const milkomeda: Chain = {
  id: 2001,
  name: 'Milkomeda',
  network: 'Milkomeda',
  nativeCurrency: {
    name: 'MILKADA',
    symbol: 'MILKADA',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-mainnet-cardano-evm.c1.milkomeda.com/'],
    },
    public: {
      http: ['https://rpc-mainnet-cardano-evm.c1.milkomeda.com/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Explorer',
      url: 'https://explorer-mainnet-cardano-evm.c1.milkomeda.com/',
    },
  },
};

export const milkomedaTestnet: Chain = {
  id: 200101,
  name: 'Milkomeda Testnet',
  network: 'Milkomeda',
  nativeCurrency: {
    name: 'MILKTADA',
    symbol: 'MILKTADA',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-devnet-cardano-evm.c1.milkomeda.com'],
    },
    public: {
      http: ['https://rpc-devnet-cardano-evm.c1.milkomeda.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Explorer',
      url: 'https://explorer-devnet-cardano-evm.c1.milkomeda.com',
    },
  },
  testnet: true,
};


export const tron: Chain = {
  id: 0x2b6653dc,
  name: 'TRON',
  network: 'TRON',
  nativeCurrency: {
    name: 'TRX',
    symbol: 'TRX',
    decimals: 6,
  },
  rpcUrls: {
    default: {
      http: ['https://api.trongrid.io'],
    },
    public: {
      http: ['https://api.trongrid.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Explorer',
      url: 'https://tronscan.org/',
    },
  }
};

export const tronShasta: Chain = {
  id: 0x94a9059e,
  name: 'TRON Testnet',
  network: 'TRON Shasta',
  nativeCurrency: {
    name: 'TRX',
    symbol: 'TRX',
    decimals: 6,
  },
  rpcUrls: {
    default: {
      http: ['https://api.shasta.trongrid.io'],
    },
    public: {
      http: ['https://api.shasta.trongrid.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Explorer',
      url: 'https://shasta.tronscan.org/#',
    },
  },
  testnet: true
};


export const dappConfig: DappConfig = {
  walletConnetProjectId: '40ce0f320baccb067909071c983ca357',
  testnet: [
    {
      chain: milkomedaTestnet,
      escrow: '0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8',
      logic: '0xd9145CCE52D386f254917e481eB44e9943F39138',
      tokens: [
        {
          name: 'USDC',
          symbol: 'USDC',
          address: '0xC12F6Ee5c853393105f29EF0310e61e6B494a70F',
        },
      ],
    },
    {
      chain: polygonMumbai,
      escrow: '0xF2B4BCc3F1687288a8c0c06Ee720350CA09dfb23',
      tokens: [
        {
          name: 'USDC',
          symbol: 'USDC',
          address: '0x057e82120fc16ddDAF8B1Fb697ab5506f8874B6e',
        },
      ],
    },
    {
      chain: tronShasta,
      escrow: 'ChangeMe',
      tokens: [
        {
          name: 'USDC',
          symbol: 'USDC',
          address: 'ChangeMe',
        },
      ],
    },
  ],
  mainet: [
    {
      chain: milkomeda,
      escrow: '0x057e82120fc16ddDAF8B1Fb697ab5506f8874B6e',
      tokens: [
        {
          name: 'USD Coin',
          symbol: 'USDC',
          address: '0xB44a9B6905aF7c801311e8F4E76932ee959c663C',
        },
        {
          name: 'Tether',
          symbol: 'USDT',
          address: '0x80A16016cC4A2E6a2CACA8a4a498b1699fF0f844',
        },
        {
          name: 'Dai',
          symbol: 'DAI',
          address: '0x639A647fbe20b6c8ac19E48E2de44ea792c62c5C',
        },
        {
          name: 'Djed',
          symbol: 'SC',
          address: '0xbfB54440448e6b702fa2A1d7033cd5fB0d9C5A27',
        },
        {
          name: 'Wrapped ADA',
          symbol: 'WADA',
          address: '0xAE83571000aF4499798d1e3b0fA0070EB3A3E3F9',
        },
      ],
    },
    {
      chain: polygon,
      escrow: '0x057e82120fc16ddDAF8B1Fb697ab5506f8874B6e',
      tokens: [
        {
          name: 'USD Coin',
          symbol: 'USDC',
          address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
        },
        {
          name: 'Tether',
          symbol: 'USDT',
          address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
        },
        {
          name: 'Dai',
          symbol: 'DAI',
          address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
        },
      ],
    },
    {
      chain: tron,
      escrow: 'ChangeMe',
      tokens: [
        {
          name: 'USD Coin',
          symbol: 'USDC',
          address: 'ChangeMe',
        },
        {
          name: 'Tether',
          symbol: 'USDT',
          address: 'ChangeMe',
        }
      ],
    },
  ],

  abis: {
    escrow: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'fee',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'organization',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'jobId',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'contract IERC20',
            name: 'token',
            type: 'address',
          },
        ],
        name: 'EscrowAction',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'escrowId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'destination',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'fee',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'TransferAction',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_organization',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_contributor',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_jobId',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: '_amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_fee',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: '_verifiedOrg',
            type: 'bool',
          },
          {
            internalType: 'enum Escrow.EscrowStatus',
            name: '_status',
            type: 'uint8',
          },
          {
            internalType: 'contract IERC20',
            name: '_token',
            type: 'address',
          },
        ],
        name: 'addEscrowData',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'contract IERC20',
            name: '_token',
            type: 'address',
          },
        ],
        name: 'addToken',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_escrowId',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: '_refund',
            type: 'bool',
          },
        ],
        name: 'escrowDecision',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_contributor',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_jobId',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: '_amount',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: '_verifiedOrg',
            type: 'bool',
          },
          {
            internalType: 'contract IERC20',
            name: '_token',
            type: 'address',
          },
        ],
        name: 'newEscrow',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_escrowId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_contributor',
            type: 'address',
          },
        ],
        name: 'setContributor',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_newFee',
            type: 'uint256',
          },
        ],
        name: 'setDecisionRetentionFee',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_newFee',
            type: 'uint256',
          },
        ],
        name: 'setImpactContFee',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_newFee',
            type: 'uint256',
          },
        ],
        name: 'setImpactOrgFee',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_newFee',
            type: 'uint256',
          },
        ],
        name: 'setNoImpactContFee',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_newFee',
            type: 'uint256',
          },
        ],
        name: 'setNoImpactOrgFee',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'destination',
            type: 'address',
          },
          {
            internalType: 'contract IERC20',
            name: '_token',
            type: 'address',
          },
        ],
        name: 'transferAssets',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_escrowId',
            type: 'uint256',
          },
        ],
        name: 'withdrawn',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'contract IERC20',
            name: '_token',
            type: 'address',
          },
        ],
        name: 'collectIncomeValue',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        name: 'escrowHistory',
        outputs: [
          {
            internalType: 'address',
            name: 'organization',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'contributor',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'jobId',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fee',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'verifiedOrg',
            type: 'bool',
          },
          {
            internalType: 'enum Escrow.EscrowStatus',
            name: 'status',
            type: 'uint8',
          },
          {
            internalType: 'contract IERC20',
            name: 'token',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getDecisionRetentionFee',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_escrowId',
            type: 'uint256',
          },
        ],
        name: 'getEscrow',
        outputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'organization',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'contributor',
                type: 'address',
              },
              {
                internalType: 'string',
                name: 'jobId',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'fee',
                type: 'uint256',
              },
              {
                internalType: 'bool',
                name: 'verifiedOrg',
                type: 'bool',
              },
              {
                internalType: 'enum Escrow.EscrowStatus',
                name: 'status',
                type: 'uint8',
              },
              {
                internalType: 'contract IERC20',
                name: 'token',
                type: 'address',
              },
            ],
            internalType: 'struct Escrow.EscrowData',
            name: '',
            type: 'tuple',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_organization',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_contributor',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_jobId',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: '_amount',
            type: 'uint256',
          },
        ],
        name: 'getEscrowId',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getImpactContFee',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getImpactOrgFee',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getNoImpactContFee',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getNoImpactOrgFee',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getTokens',
        outputs: [
          {
            internalType: 'contract IERC20[]',
            name: '',
            type: 'address[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        name: 'transactionsHistory',
        outputs: [
          {
            internalType: 'uint256',
            name: 'escrowId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fee',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        name: 'validTokens',
        outputs: [
          {
            internalType: 'contract IERC20',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'version',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    token: [
      {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [
          {
            name: '',
            type: 'string',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_spender',
            type: 'address',
          },
          {
            name: '_value',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [
          {
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [
          {
            name: '',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_from',
            type: 'address',
          },
          {
            name: '_to',
            type: 'address',
          },
          {
            name: '_value',
            type: 'uint256',
          },
        ],
        name: 'transferFrom',
        outputs: [
          {
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [
          {
            name: '',
            type: 'uint8',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            name: '_owner',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            name: 'balance',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [
          {
            name: '',
            type: 'string',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_to',
            type: 'address',
          },
          {
            name: '_value',
            type: 'uint256',
          },
        ],
        name: 'transfer',
        outputs: [
          {
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            name: '_owner',
            type: 'address',
          },
          {
            name: '_spender',
            type: 'address',
          },
        ],
        name: 'allowance',
        outputs: [
          {
            name: '',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        payable: true,
        stateMutability: 'payable',
        type: 'fallback',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            name: 'spender',
            type: 'address',
          },
          {
            indexed: false,
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
    ],
  },
};
