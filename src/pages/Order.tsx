import orderCard from '@/mocks/order_card.mock';
import NavBar from '@/components/NavBar';
import Layout from '@/components/Layout';
import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useState, useMemo} from 'react';

import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import SlidingCardSelector from '@/components/Order/SlidingCardSelector';
import CardView from '@/components/Order/CardView';
import SenderInputCompo from '@/components/Order/SenderInputCompo';
import ReceiverInputCompo from '@/components/Order/ReceiverInputCompo';
import ItemInfoCompo from '@/components/Order/ItemInfoCompo';
import Modal from '@/components/Order/Modal';

import { ToastContainer } from 'react-toastify';
import useUser from '@/hooks/useUser';

import { api, IsErrorStatus } from '../utils/api';

import { useQuery, useMutation} from '@tanstack/react-query';


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

type Receiver = {
  name: string;
  phone: string;
  count: number;
};

type OrderFormValues = {
  selectedId: number;
  message: string;
  senderName: string;
  receivers: Receiver[];
  allPrice: number;
};

type ProductSummary = {
  brandName: string;
  imageURL: string;
  name: string;
  price: number;
};

function Order() {
  const { getName, getAuthToken } = useUser(); // 운동하고와서 여기서 이름꺼네서 폼에넣자
  const userName = getName();

  const navigate = useNavigate();
  const [modalToggle, setModalToggle] = useState(false); // 모달의 상태를 나타내는 state

  const DEFAULT_CARD_ID = 904;
  const defaultMessage = useMemo(() => {
    return (
      orderCard.find((c) => c.id === DEFAULT_CARD_ID)?.defaultTextMessage || ''
    );
  }, []);
  
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
    control,
    handleSubmit,
    watch,
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

  const fetchRanking = async (): Promise<ProductSummary> => {
    const response = await api.get(`/products/${id}/summary`);

    return response.data.data;
  };

  const {data, error, isLoading } = useQuery<ProductSummary>({
    queryKey: ['ranking'],
    queryFn: fetchRanking
  });

  if(error) {
    IsErrorStatus(
      error,
      '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요',
      navigate,
    ) && navigate('/');
  }

  // getAuthToken
  // 최종 주문 핸들러
  const submitOrder = async () => {
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
      }
    );
  
    return response.data;
  };

  
  const { mutate: mutateOrder} = useMutation({
    mutationFn: submitOrder,
    onSuccess: () => {
      const receivers = watch('receivers');
      const totalCount = receivers.reduce(
        (sum, r) => sum + Number(r.count || 0),
        0
      );
  
      alert(
        `주문이 완료되었습니다.\n상품명: ${data?.name}\n구매 수량: ${totalCount}\n발신자 이름: ${watch('senderName')}\n메시지: ${watch('message')}`
      );
      navigate('/');
    },
    onError: (error) => {
      IsErrorStatus(error, '입력값을 다시 확인해주세요', navigate);
    },
  });
  
  function handleOrderClick() {
    mutateOrder();
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
            brandName={data?.brandName}
            imageURL={data?.imageURL}
            name={data?.name}
            price={data?.price}
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
            price={data?.price}
          />
        </FormProvider>
      )}
      <ToastContainer />
    </Layout>
  );
}

export default Order;