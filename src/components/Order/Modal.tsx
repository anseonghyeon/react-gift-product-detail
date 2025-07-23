import styled from '@emotion/styled';
import { useFormContext } from 'react-hook-form';
import { PHONE_NUM_REGEX } from '@/utils/regex';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  width: 55%;
  height: 93%;
  padding: ${({ theme }) => theme.spacing.spacing3};
    ${({ theme }) => theme.spacing.spacing5};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray.gray00};

  display: flex;
  flex-direction: column;

  overflow-y: auto;
`;

const ModalInfoWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.spacing2};
`;

const ModalTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.title.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title.title1Bold.lineHeight};
  margin-bottom: ${({ theme }) => theme.spacing.spacing1};
`;

const ModalInfoTxt = styled.p`
  font-size: ${({ theme }) => theme.typography.label.label2Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.label.label2Regular.fontWeight};
  line-height: ${({ theme }) =>
    theme.typography.label.label2Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray800};
`;

const ModalInfoAddBtn = styled.button`
  width: fit-content;
  font-size: ${({ theme }) => theme.typography.label.label2Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.label.label2Regular.fontWeight};
  line-height: ${({ theme }) =>
    theme.typography.label.label2Regular.lineHeight};

  padding: ${({ theme }) => theme.spacing.spacing2};
    ${({ theme }) => theme.spacing.spacing4};
  border: none;
  border-radius: 8px;
`;
// 모달 리시버 box 시작
const ModalReceiverInputBox = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing3};
    ${({ theme }) => theme.spacing.spacing4};
  padding-bottom: ${({ theme }) => theme.spacing.spacing4};
  border-bottom: ${({ theme }) => theme.spacing.spacing1} solid
    ${({ theme }) => theme.colors.gray.gray200};
`;

const ModalReceiverInputTitleBtnWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ModalReceiverInputTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.subtitle.subtitle2Bold.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.subtitle.subtitle2Bold.fontWeight};
  line-height: ${({ theme }) =>
    theme.typography.subtitle.subtitle2Bold.lineHeight};
  margin-bottom: 10px;
`;

const ModalReceiverInputDelBtn = styled.button`
  border: none;
  background: none;
`;

// 이름 입력 폼
const ReceiverInputNameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.spacing2};
`;

const ReceiverInputNameLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.body.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.body1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.body1Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray900};
`;

const ReceiverInputName = styled.input`
  width: 85%;
  height: ${({ theme }) => theme.spacing.spacing8};
  padding: ${({ theme }) => theme.spacing.spacing1};
    ${({ theme }) => theme.spacing.spacing3};

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
`;

// 전화번호  입력 폼
const ReceiverInputPhoneNumberWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.spacing2};
`;

const ReceiverInputPhoneNumberLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.body.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.body1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.body1Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray900};
`;

const ReceiverInputPhoneNumber = styled.input`
  width: 85%;
  height: ${({ theme }) => theme.spacing.spacing9};
  padding: ${({ theme }) => theme.spacing.spacing1};
    ${({ theme }) => theme.spacing.spacing3};

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
`;

// 아이템 갯수 폼
const ReceiverItemNumWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.spacing2};
`;

const ReceiverItemNumInputLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.body.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.body1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.body1Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray900};
`;

const ReceiverItemNumInput = styled.input`
  width: 85%;
  height: ${({ theme }) => theme.spacing.spacing9};
  padding: ${({ theme }) => theme.spacing.spacing1};
    ${({ theme }) => theme.spacing.spacing3};

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
`;

// 리시버 인풋 에러 텍스트
const ReceiverInputErrorTxt = styled.p`
  font-size: ${({ theme }) => theme.typography.label.label2Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.label.label2Regular.fontWeight};
  line-height: ${({ theme }) =>
    theme.typography.label.label2Regular.lineHeight};
  padding-left: 80px;
  color: ${({ theme }) => theme.colors.red.red700};
  width: 95%;
`;

// 모달 취소하기 컨펌 버튼들
const ModalUnderBtnWrapper = styled.div`
  margin-top: auto;
  display: flex;
  gap: ${({ theme }) => theme.spacing.spacing3};
`;

const ModalExitBtn = styled.button`
  font-size: ${({ theme }) => theme.typography.label.label1Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.label.label1Regular.fontWeight};
  line-height: ${({ theme }) =>
    theme.typography.label.label1Regular.lineHeight};
  width: 25%;
  padding: ${({ theme }) => theme.spacing.spacing3} 0;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray.gray300};
  cursor: pointer;
`;

const ModalConfirmBtn = styled.button`
  font-size: ${({ theme }) => theme.typography.label.label1Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.label.label1Regular.fontWeight};
  line-height: ${({ theme }) =>
    theme.typography.label.label1Regular.lineHeight};
  width: 75%;
  padding: ${({ theme }) => theme.spacing.spacing3} 0;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.brand.kakaoYellow};
  cursor: pointer;
`;

function Modal({
  modalToggle,
  fields,
  remove,
  append,
  setModalToggle,
  price,
}: any) {
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

  const { watch, register, formState, handleSubmit, setValue } =
    useFormContext<OrderFormValues>();

  // 모달안에 아이템들 지우는 핸들러
  function handleReceiverDel(index: number) {
    if (fields.length > 0) {
      remove(index);
    }
  }

  // 모달안에 아이템들 추가하는 핸들러
  function handleReceiverAdd() {
    if (fields.length < 10) {
      append({ name: '', phone: '', count: 1 });
    }
  }

  // 모달 닫는 핸들러
  function handleModalClose() {
    setModalToggle(false);
  }

  // 모달안에 컨펌하는 핸들러
  function handleConfirm() {
    // 이때 전체 금액도 계산되어야함
    const receivers = watch('receivers');
    const totalCount = receivers.reduce(
      (sum, receivers) => sum + Number(receivers.count || 0),
      0,
    );

    setValue('allPrice', totalCount * price);
    setModalToggle(false);
  }

  return (
    <>
      {modalToggle && (
        <ModalOverlay>
          <ModalContent>
            <ModalInfoWrapper>
              <ModalTitle>받는 사람</ModalTitle>
              <ModalInfoTxt>* 최대 10명까지 추가 할 수 있어요.</ModalInfoTxt>
              <ModalInfoTxt>
                * 받는 사람의 전화번호를 중복으로 입력할 수 없어요.
              </ModalInfoTxt>
            </ModalInfoWrapper>
            <ModalInfoAddBtn
              onClick={handleReceiverAdd}
              disabled={fields.length >= 10}
            >
              추가하기
            </ModalInfoAddBtn>

            {/* 모달 리시버 박스들 */}
            {fields.map((field: any, index: any) => (
              <ModalReceiverInputBox key={field.id}>
                <ModalReceiverInputTitleBtnWrapper>
                  <ModalReceiverInputTitle>
                    받는 사람 {index + 1}
                  </ModalReceiverInputTitle>
                  <ModalReceiverInputDelBtn
                    onClick={() => handleReceiverDel(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-x"
                      aria-hidden="true"
                    >
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </ModalReceiverInputDelBtn>
                </ModalReceiverInputTitleBtnWrapper>

                <ReceiverInputNameWrapper>
                  <ReceiverInputNameLabel htmlFor={`receivers.${index}.name`}>
                    이름
                  </ReceiverInputNameLabel>
                  <ReceiverInputName
                    placeholder="이름을 입력하세요."
                    {...register(`receivers.${index}.name`, { required: true })}
                  />
                </ReceiverInputNameWrapper>
                {formState.errors.receivers?.[index]?.name && (
                  <ReceiverInputErrorTxt>
                    이름을 입력해 주세요.
                  </ReceiverInputErrorTxt>
                )}

                <ReceiverInputPhoneNumberWrapper>
                  <ReceiverInputPhoneNumberLabel
                    htmlFor={`receivers.${index}.phone`}
                  >
                    전화번호
                  </ReceiverInputPhoneNumberLabel>
                  <ReceiverInputPhoneNumber
                    placeholder="전화번호를 입력하세요"
                    {...register(`receivers.${index}.phone`, {
                      required: '전화번호를 입력해 주세요.',
                      pattern: {
                        value: PHONE_NUM_REGEX,
                        message: '전화번호 형식이 맞지 않습니다.',
                      },
                      validate: (value) => {
                        const phones = watch('receivers').map((r) => r.phone);
                        const occurrences = phones.filter(
                          (p) => p === value,
                        ).length;
                        if (occurrences > 1) {
                          return '이미 등록된 전화번호입니다.';
                        }

                        return true;
                      },
                    })}
                  />
                </ReceiverInputPhoneNumberWrapper>
                {formState.errors.receivers?.[index]?.phone?.message && (
                  <ReceiverInputErrorTxt>
                    {formState.errors.receivers[index].phone?.message}
                  </ReceiverInputErrorTxt>
                )}

                <ReceiverItemNumWrapper>
                  <ReceiverItemNumInputLabel
                    htmlFor={`receivers.${index}.count`}
                  >
                    수량
                  </ReceiverItemNumInputLabel>
                  <ReceiverItemNumInput
                    type="number"
                    min="0"
                    step="1"
                    {...register(`receivers.${index}.count`, {
                      required: true,
                      min: 1,
                    })}
                  />
                </ReceiverItemNumWrapper>
                {formState.errors.receivers?.[index]?.count && (
                  <ReceiverInputErrorTxt>
                    구매 수량은 1개 이상이어야 합니다.
                  </ReceiverInputErrorTxt>
                )}
              </ModalReceiverInputBox>
            ))}

            {/* 모달 취소하기 컨펌하기 버튼 */}
            <ModalUnderBtnWrapper>
              <ModalExitBtn onClick={handleModalClose}>취소</ModalExitBtn>
              <ModalConfirmBtn onClick={handleSubmit(handleConfirm)}>
                {fields.length}명 완료
              </ModalConfirmBtn>
            </ModalUnderBtnWrapper>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

export default Modal;
