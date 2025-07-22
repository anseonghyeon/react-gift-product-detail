import styled from '@emotion/styled';
import orderCard from '@/mocks/order_card.mock';
import { useFormContext } from 'react-hook-form';

const SlidingCardSelectorWrapper = styled.div`
  width: auto;
  height: auto;
  padding: ${({ theme }) => theme.spacing.spacing4};

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.spacing1};

  overflow-x: scroll;
`;

const SlidingCard = styled.img<{ isActive: boolean }>`
  width: 100px;
  height: 50px;
  border-radius: ${({ theme }) => theme.spacing.spacing2};
  border: 3px solid transparent;
  ${({ isActive }) => isActive && `border: 3px solid black;`}
  cursor: pointer;
`;

function SlidingCardSelector() {
  type OrderFormValues = {
    selectedId: number;
    message: string;
    senderName: string;
    receivers: Receiver[];
    allPrice: number;
  };

  type Receiver = {
    name: string;
    phone: string;
    count: number;
  };

  const { setValue, clearErrors, watch } = useFormContext<OrderFormValues>();

  function handleCardClick(id: number) {
    setValue('selectedId', id);
    const selectedCard = orderCard.find((c) => c.id === id);
    if (selectedCard) {
      setValue('message', selectedCard?.defaultTextMessage);
      clearErrors('message');
    }
  }

  return (
    <SlidingCardSelectorWrapper>
      {orderCard.map((item) => (
        <SlidingCard
          key={item.id}
          src={item.thumbUrl}
          alt={item.defaultTextMessage}
          onClick={() => handleCardClick(item.id)}
          isActive={watch('selectedId') === item.id}
        ></SlidingCard>
      ))}
    </SlidingCardSelectorWrapper>
  );
}

export default SlidingCardSelector;
