import styled from '@emotion/styled';
import orderCard from '@/mocks/order_card.mock';
import { useFormContext } from 'react-hook-form';

const CardViewWrapper = styled.div`
  width: auto;
  height: auto;
  padding-top: ${({ theme }) => theme.spacing.spacing3};
  padding-bottom: ${({ theme }) => theme.spacing.spacing9};
  padding-left: ${({ theme }) => theme.spacing.spacing3};
  padding-right: ${({ theme }) => theme.spacing.spacing3};
  border-bottom: ${({ theme }) => theme.spacing.spacing2} solid
    ${({ theme }) => theme.colors.gray.gray200};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CardViewImg = styled.img`
  width: 360px;
  height: 240px;
  border-radius: 15px;
  margin-bottom: ${({ theme }) => theme.spacing.spacing9};
`;

const CardViewTxt = styled.textarea`
  width: 95%;
  height: ${({ theme }) => theme.spacing.spacing11};

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray.gray400};
  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.gray.gray700};
  }
  padding: ${({ theme }) => theme.spacing.spacing2};
    ${({ theme }) => theme.spacing.spacing3};

  font-size: ${({ theme }) => theme.typography.body.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.body1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.body1Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray900};
  resize: none;
`;

const CardViewTxtErrorTxt = styled.p`
  font-size: ${({ theme }) => theme.typography.label.label2Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.label.label2Regular.fontWeight};
  line-height: ${({ theme }) =>
    theme.typography.label.label2Regular.lineHeight};
  padding: ${({ theme }) => theme.spacing.spacing2};
  color: ${({ theme }) => theme.colors.red.red700};
  width: 95%;
`;

function CardView() {
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

  const { watch, register, formState } = useFormContext<OrderFormValues>();
  return (
    <CardViewWrapper>
      <CardViewImg
        src={orderCard.find((c) => c.id === watch('selectedId'))?.imageUrl}
        alt={
          orderCard.find((c) => c.id === watch('selectedId'))
            ?.defaultTextMessage
        }
      ></CardViewImg>
      <CardViewTxt {...register('message', { required: true })}></CardViewTxt>
      {formState.errors.message && (
        <CardViewTxtErrorTxt>메시지를 입력 해주세요.</CardViewTxtErrorTxt>
      )}
    </CardViewWrapper>
  );
}

export default CardView;
