import styled from '@emotion/styled';
import { useFormContext } from 'react-hook-form';

const ReceiverInputWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing3}
    ${({ theme }) => theme.spacing.spacing4};
  padding-bottom: ${({ theme }) => theme.spacing.spacing4};
  border-bottom: ${({ theme }) => theme.spacing.spacing2} solid
    ${({ theme }) => theme.colors.gray.gray200};
`;

const ReceiverInputTitleBtnWrapper = styled.div`
  width: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ReceiverInputTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.title.title2Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title.title2Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title.title2Bold.lineHeight};
`;

const ReceiverInputAddBtn = styled.button`
  width: auto;
  height: auto;
  padding: ${({ theme }) => theme.spacing.spacing2}
    ${({ theme }) => theme.spacing.spacing4};
  font-size: ${({ theme }) => theme.typography.label.label1Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.label.label1Regular.fontWeight};
  line-height: ${({ theme }) =>
    theme.typography.label.label1Regular.lineHeight};

  background-color: ${({ theme }) => theme.colors.gray.gray300};
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const ReceiverInputBox = styled.div`
  width: auto;
  height: auto;
  border: 1px solid ${({ theme }) => theme.colors.gray.gray200};
  border-radius: 5px;
  padding: ${({ theme }) => theme.spacing.spacing5};
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReceiverInputBoxInfo = styled.p`
  font-size: ${({ theme }) => theme.typography.body.body2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.body2Regular.fontSize};
  line-height: ${({ theme }) => theme.typography.body.body2Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray600};
`;

const ReceiverInputBoxFields = styled.div`
  display: flex;
  flex-direction: column;
`;
const ReceiverInputBoxField = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray700};
`;

const ReceiverInputBoxFieldItem = styled.p`
  font-size: ${({ theme }) => theme.typography.body.body2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.body2Regular.fontSize};
  line-height: ${({ theme }) => theme.typography.body.body2Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray700};

  padding: 0 4px;
`;

function ReceiverInputCompo({ setModalToggle, fields }: any) {
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

  const { watch } = useFormContext<OrderFormValues>();

  function handleModalOpen() {
    setModalToggle(true);
  }

  return (
    <ReceiverInputWrapper>
      <ReceiverInputTitleBtnWrapper>
        <ReceiverInputTitle>받는 사람</ReceiverInputTitle>
        <ReceiverInputAddBtn onClick={handleModalOpen}>
          {fields.length === 0 ? '추가' : '수정'}
        </ReceiverInputAddBtn>
      </ReceiverInputTitleBtnWrapper>
      <ReceiverInputBox>
        {fields.length === 0 ? (
          <ReceiverInputBoxInfo>
            받는 사람이 없습니다
            <br />
            받는 사람을 추가해주세요.
          </ReceiverInputBoxInfo>
        ) : (
          <ReceiverInputBoxFields>
            {fields.map((field: any, index: any) => (
              <ReceiverInputBoxField key={field.id}>
                <ReceiverInputBoxFieldItem>
                  {watch(`receivers.${index}.name`)}
                </ReceiverInputBoxFieldItem>
                <ReceiverInputBoxFieldItem>
                  {watch(`receivers.${index}.phone`)}
                </ReceiverInputBoxFieldItem>
                <ReceiverInputBoxFieldItem>
                  {watch(`receivers.${index}.count`)}
                </ReceiverInputBoxFieldItem>
              </ReceiverInputBoxField>
            ))}
          </ReceiverInputBoxFields>
        )}
      </ReceiverInputBox>
    </ReceiverInputWrapper>
  );
}

export default ReceiverInputCompo;
