import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextProps {
  totalItems: number;
  updateTotalItems: (newTotal: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [totalItems, setTotalItems] = useState<number>(0);

  const updateTotalItems = (newTotal: number) => {
    setTotalItems(newTotal);
  };

  return (
    <CartContext.Provider value={{ totalItems, updateTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
