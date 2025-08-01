import Layout from '../components/Layout';
import NavBar from '../components/NavBar';

import { useSearchParams } from 'react-router-dom';

import HeroSection from '@/components/Theme/HeroSection';
import InfiniteScroll from '@/components/Theme/InfiniteScroll';

function Theme() {
  const [searchParams] = useSearchParams();
  const themeId = searchParams.get('themeId');

  if (!themeId) return <div>잘못된 접근입니다</div>;

  return (
    <Layout>
      <NavBar></NavBar>
      <HeroSection themeId={themeId} />
      <InfiniteScroll themeId={themeId} />
    </Layout>
  );
}

export default Theme;
