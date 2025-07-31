import styled from '@emotion/styled';
import { useFormContext } from 'react-hook-form';

const SenderInputWrapper = styled.div`
  padding-top: ${({ theme }) => theme.spacing.spacing3};
  padding-bottom: ${({ theme }) => theme.spacing.spacing5};
  padding-left: ${({ theme }) => theme.spacing.spacing4};
  padding-right: ${({ theme }) => theme.spacing.spacing4};
  border-bottom: ${({ theme }) => theme.spacing.spacing2} solid
    ${({ theme }) => theme.colors.gray.gray200};
`;

const SenderInputTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.subtitle.subtitle1Bold.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.subtitle.subtitle1Bold.fontWeight};
  line-height: ${({ theme }) =>
    theme.typography.subtitle.subtitle1Bold.lineHeight};
  margin-bottom: ${({ theme }) => theme.spacing.spacing3};
`;

const SenderInput = styled.input`
  width: 95%;
  height: ${({ theme }) => theme.spacing.spacing7};

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray.gray400};
  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.gray.gray700};
  }

  &::placeholder {
    font-size: ${({ theme }) => theme.typography.body.body1Regular.fontSize};
    font-weight: ${({ theme }) =>
      theme.typography.body.body1Regular.fontWeight};
    line-height: ${({ theme }) =>
      theme.typography.body.body1Regular.lineHeight};
    color: ${({ theme }) => theme.colors.gray.gray600};
  }

  padding: ${({ theme }) => theme.spacing.spacing2};
    ${({ theme }) => theme.spacing.spacing3};
`;

const SenderInputInfoTxt = styled.p`
  font-size: ${({ theme }) => theme.typography.label.label2Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.label.label2Regular.fontWeight};
  line-height: ${({ theme }) =>
    theme.typography.label.label2Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray600};
  padding: 4px 8px;
`;

const SenderInputErrorTxt = styled.p`
  font-size: ${({ theme }) => theme.typography.label.label2Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.label.label2Regular.fontWeight};
  line-height: ${({ theme }) =>
    theme.typography.label.label2Regular.lineHeight};
  padding: ${({ theme }) => theme.spacing.spacing2};
  color: ${({ theme }) => theme.colors.red.red700};
  width: 95%;
`;

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

function SenderInputCompo() {
  const { register, formState } = useFormContext<OrderFormValues>();
  return (
    <SenderInputWrapper>
      <SenderInputTitle>보내는 사람</SenderInputTitle>
      <SenderInput
        placeholder="이름을 입력하세요."
        {...register('senderName', { required: true })}
        data-testid='sender-name'
      ></SenderInput>
      {formState.errors.senderName ? (
        <SenderInputErrorTxt data-testid='sender-error-msg'>이름을 입력해주세요.</SenderInputErrorTxt>
      ) : (
        <SenderInputInfoTxt>
          * 실제 선물 발송 시 발신자이름으로 반영되는 정보입니다.
        </SenderInputInfoTxt>
      )}
    </SenderInputWrapper>
  );
}

export default SenderInputCompo;
