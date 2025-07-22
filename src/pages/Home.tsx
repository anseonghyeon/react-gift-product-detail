import Layout from '../components/Layout';
import NavBar from '../components/NavBar';
import FriendSelector from '../components/Home/FriendSelector';
import GiftCategorySelector from '../components/Home/GiftCategorySelector';
import RealtimeGiftRank from '../components/Home/RealtimeGiftRank';

function Home() {
  return (
    <Layout>
      <NavBar />
      <FriendSelector />
      <GiftCategorySelector />
      <RealtimeGiftRank />
    </Layout>
  );
}

export default Home;
