import orderCard from '@/mocks/order_card.mock';
import NavBar from '@/components/NavBar';
import Layout from '@/components/Layout';
import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useState, useMemo, useEffect } from 'react';

import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import SlidingCardSelector from '@/components/Order/SlidingCardSelector';
import CardView from '@/components/Order/CardView';
import SenderInputCompo from '@/components/Order/SenderInputCompo';
import ReceiverInputCompo from '@/components/Order/ReceiverInputCompo';
import ItemInfoCompo from '@/components/Order/ItemInfoCompo';
import Modal from '@/components/Order/Modal';

import { ToastContainer, toast } from 'react-toastify';
import useUser from '@/hooks/useUser';

import { api, IsErrorStatus } from '../utils/api';
// 주문 버튼 시작
const OrderBtnWrapper = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.spacing.spacing12};

  position: sticky;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 10;
`;

const OrderButton = styled.button`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.brand.kakaoYellow};
  border: none;

  font-size: ${({ theme }) => theme.typography.body.body1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.body1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.body1Bold.lineHeight};
  cursor: pointer;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #333;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function Order() {
  const { getName, getAuthToken } = useUser(); // 운동하고와서 여기서 이름꺼네서 폼에넣자
  const userName = getName();

  const navigate = useNavigate();
  const [modalToggle, setModalToggle] = useState(false); // 모달의 상태를 나타내는 state

  type Receiver = {
    name: string;
    phone: string;
    count: number;
  };
  // 이 receiver객체들의 count를 다 합쳐서 쓸까?

  type OrderFormValues = {
    selectedId: number;
    message: string;
    senderName: string;
    receivers: Receiver[];
    allPrice: number;
  };

  const DEFAULT_CARD_ID = 904;
  const defaultMessage = useMemo(() => {
    return (
      orderCard.find((c) => c.id === DEFAULT_CARD_ID)?.defaultTextMessage || ''
    );
  }, []);
  // register는 필드를 useForm에 등록할때 사용
  // control은 useFieldArray 랑 연결할때
  // handleSubmit은 폼 제출 처리할때(최종 전송할때 감싸서 사용
  // erros는 formState안에 있는 객체로 각 필드들의 에러 상태를 가지고있음
  // watch는 특정 필드의 현재 값을 구독해서 상태를 실시간으로 확인 가능
  // setValue 특정 필드의 값을 설정할때 사용
  const methods = useForm<OrderFormValues>({
    defaultValues: {
      selectedId: DEFAULT_CARD_ID,
      message: defaultMessage,
      senderName: `${userName}`,
      receivers: [],
      allPrice: 0,
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
  } = methods;

  // useForm에서 가져온 control객체를 넘겨야 리액트 훅 폼과 연결됨
  // useForm의 defaultValues에 선언한 필드 이름과 맞춰줌
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'receivers',
  });

  // 이전 페이지에서 상품정보 받아오는 코드
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const [brandName, setBrandName] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [name, setItemName] = useState('');
  const [price, setPrice] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await api.get(`/products/${id}/summary`);

        setBrandName(response.data.data.brandName);
        setImageURL(response.data.data.imageURL);
        setItemName(response.data.data.name);
        setPrice(response.data.data.price);

        setIsLoading(false);
      } catch (error: any) {
        IsErrorStatus(
          error,
          '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요',
          navigate,
        ) && navigate('/');
      }
    };

    fetchRanking();
  }, []);

  // getAuthToken
  // 최종 주문 핸들러
  function handleOrderClick() {
    const receivers = watch('receivers');
    const totalCount = receivers.reduce(
      (sum, receivers) => sum + Number(receivers.count || 0),
      0,
    );

    const fetchSubmit = async () => {
      try {
        const receivers = watch('receivers').map((receiver) => ({
          name: receiver.name,
          phoneNumber: receiver.phone,
          quantity: Number(receiver.count),
        }));

        const response = await api.post(
          '/order',
          {
            productId: Number(id),
            message: watch('message'),
            messageCardId: String(watch('selectedId')),
            ordererName: watch('senderName'),
            receivers: receivers,
          },
          {
            headers: {
              Authorization: getAuthToken(),
            },
          },
        );

        alert(
          `주문이 완료되었습니다.\n상품명: ${name}\n구매 수량: ${totalCount}\n발신자 이름: ${watch('senderName')}\n메시지: ${watch('message')}`,
        );
        navigate('/');
      } catch (error: any) {
        IsErrorStatus(error, '입력값을 다시 확인해주세요', navigate);
      }
    };

    fetchSubmit();
  }

  return (
    <Layout>
      <NavBar></NavBar>
      {isLoading ? (
        <Spinner />
      ) : (
        <FormProvider {...methods}>
          {/* 슬라이딩 카드 */}
          <SlidingCardSelector />
          {/* 카드뷰  */}
          <CardView />
          {/* 보내는 사람 */}
          <SenderInputCompo />
          {/* 받는사람 */}
          <ReceiverInputCompo setModalToggle={setModalToggle} fields={fields} />
          {/* 상품 정보 */}
          <ItemInfoCompo
            brandName={brandName}
            imageURL={imageURL}
            name={name}
            price={price}
          />
          {/* 주문 버튼 */}
          <OrderBtnWrapper>
            <OrderButton onClick={handleSubmit(handleOrderClick)}>
              {watch('allPrice')}원 주문하기
            </OrderButton>
          </OrderBtnWrapper>
          {/* --------------모달-------------- */}
          <Modal
            modalToggle={modalToggle}
            fields={fields}
            remove={remove}
            append={append}
            setModalToggle={setModalToggle}
            price={price}
          />
        </FormProvider>
      )}
      <ToastContainer />
    </Layout>
  );
}

export default Order;
