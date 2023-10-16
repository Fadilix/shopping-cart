import { ReactNode, createContext, useContext, useState } from "react";

interface TotalPriceContextType {
    totalPrice: number;
    updateTotalPrice: (newTotalPrice: number) => void;
}

const TotalPriceContext = createContext<TotalPriceContextType | undefined>(undefined);

interface PriceProviderProps {
    children: ReactNode;
}

export const PriceProvider: React.FC<PriceProviderProps> = ({ children }) => {
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const updateTotalPrice = (newTotalPrice: number) => {
        setTotalPrice(newTotalPrice);
    };

    const contextValue: TotalPriceContextType = {
        totalPrice,
        updateTotalPrice,
    };

    return (
        <TotalPriceContext.Provider value={contextValue}>
            {children}
        </TotalPriceContext.Provider>
    );
};

export const useTotalPrice = () => {
    const context = useContext(TotalPriceContext);

    if (!context) {
        throw new Error("useTotalPrice must be used within a PriceProvider");
    }

    return context;
};
