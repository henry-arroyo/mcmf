// Database schema for MCMF website

// Order Table
interface Order {
  orderId: string;          // Partition key
  userId?: string;          // Optional, for registered users
  timestamp: number;        // Sort key
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';
  total: number;
  items: OrderItem[];
  paymentDetails: PaymentDetails;
  customerInfo: CustomerInfo;
}

// Order Item Table
interface OrderItem {
  itemId: string;          // Partition key
  orderId: string;         // Sort key
  type: 'ticket' | 'donation';
  concertId?: string;      // For tickets
  concertTitle?: string;   // For tickets
  ticketType?: 'adult' | 'student';  // For tickets
  price: number;
  quantity: number;
}

// Customer Info Table
interface CustomerInfo {
  customerId: string;      // Partition key
  email: string;
  name: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

// Payment Details Table
interface PaymentDetails {
  paymentId: string;       // Partition key
  orderId: string;         // Sort key
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'paypal';
  transactionId: string;
  timestamp: number;
}

// Concert Table
interface Concert {
  concertId: string;       // Partition key
  title: string;
  date: string;
  venue: string;
  description: string;
  ticketPrices: {
    adult: number;
    student: number;
  };
  availableSeats: {
    adult: number;
    student: number;
  };
}

// DynamoDB Table Definitions
const tables = {
  Orders: {
    TableName: 'mcmf-orders',
    KeySchema: [
      { AttributeName: 'orderId', KeyType: 'HASH' },  // Partition key
      { AttributeName: 'timestamp', KeyType: 'RANGE' }  // Sort key
    ],
    AttributeDefinitions: [
      { AttributeName: 'orderId', AttributeType: 'S' },
      { AttributeName: 'timestamp', AttributeType: 'N' }
    ],
    BillingMode: 'PAY_PER_REQUEST'
  },
  OrderItems: {
    TableName: 'mcmf-order-items',
    KeySchema: [
      { AttributeName: 'itemId', KeyType: 'HASH' },
      { AttributeName: 'orderId', KeyType: 'RANGE' }
    ],
    AttributeDefinitions: [
      { AttributeName: 'itemId', AttributeType: 'S' },
      { AttributeName: 'orderId', AttributeType: 'S' }
    ],
    BillingMode: 'PAY_PER_REQUEST'
  },
  Customers: {
    TableName: 'mcmf-customers',
    KeySchema: [
      { AttributeName: 'customerId', KeyType: 'HASH' }
    ],
    AttributeDefinitions: [
      { AttributeName: 'customerId', AttributeType: 'S' }
    ],
    BillingMode: 'PAY_PER_REQUEST'
  },
  Payments: {
    TableName: 'mcmf-payments',
    KeySchema: [
      { AttributeName: 'paymentId', KeyType: 'HASH' },
      { AttributeName: 'orderId', KeyType: 'RANGE' }
    ],
    AttributeDefinitions: [
      { AttributeName: 'paymentId', AttributeType: 'S' },
      { AttributeName: 'orderId', AttributeType: 'S' }
    ],
    BillingMode: 'PAY_PER_REQUEST'
  },
  Concerts: {
    TableName: 'mcmf-concerts',
    KeySchema: [
      { AttributeName: 'concertId', KeyType: 'HASH' }
    ],
    AttributeDefinitions: [
      { AttributeName: 'concertId', AttributeType: 'S' }
    ],
    BillingMode: 'PAY_PER_REQUEST'
  }
};

export type { Order, OrderItem, CustomerInfo, PaymentDetails, Concert };
export { tables }; 