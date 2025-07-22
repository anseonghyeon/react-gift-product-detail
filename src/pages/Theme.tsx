import Layout from '../components/Layout';
import NavBar from '../components/NavBar';
import styled from '@emotion/styled';

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api, IsErrorStatus } from '../utils/api';
import { Spinner } from '@/components/Spinner';

import HeroSection from '@/components/Theme/HeroSection';
import InfiniteScroll from '@/components/Theme/InfiniteScroll';

function Theme() {
  const [searchParams] = useSearchParams(); // 얘는 여기있는게 맞아
  const themeId = searchParams.get('themeId');
  const navigate = useNavigate();

  return (
    <Layout>
      <NavBar></NavBar>
      <HeroSection themeId={themeId} />
      <InfiniteScroll themeId={themeId} />
    </Layout>
  );
}

export default Theme;
