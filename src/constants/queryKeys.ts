const QUERY_KEY = {
  THEME: (id: string | number) => ['theme', id],
  RTITEM: (group: string, type: string) => ['rankingTimeItem', group, type],
  RANKING: ['ranking'],
  PBASIC: (id: string | number) => ['productBasic', id],
  PREVIEW: (id: string | number) => ['productReview', id],
  PDETAIL: (id: string | number) => ['productDetail', id],
  PLIKE: (id: string | number) => ['productLike', id],
};
export default QUERY_KEY;
