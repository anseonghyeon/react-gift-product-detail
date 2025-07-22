import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import RealtimeRankItemWrapper from './RealtimeRankItemWrapper';

const RealtimeRankWrapper = styled.div`
  width: auto;
  height: auto;
  padding: ${({ theme }) => theme.spacing.spacing2}
    ${({ theme }) => theme.spacing.spacing4};
`;

const RealtimeRankTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.title.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title.title1Bold.lineHeight};
`;

// 첫 번째 selector 시작
const UserGroupSelectorWrapper = styled.div`
  width: auto;
  height: auto;
  padding: ${({ theme }) => theme.spacing.spacing4}
    ${({ theme }) => theme.spacing.spacing2};

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserGroupSelectorItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const UserGroupSelectorBtn = styled.button<{ isSelected?: boolean }>`
  width: ${({ theme }) => theme.spacing.spacing11};
  height: ${({ theme }) => theme.spacing.spacing11};
  border: none;
  border-radius: 16px;
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.gray.gray00 : theme.colors.blue.blue400};
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.blue.blue700 : theme.colors.blue.blue100};

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${({ theme }) => theme.typography.label.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label.label1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label.label1Bold.lineHeight};
  cursor: pointer;
`;

const UserGroupSelectorTxt = styled.p<{ isSelected?: boolean }>`
  font-size: ${({ theme }) => theme.typography.label.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label.label1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label.label1Bold.lineHeight};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.blue.blue700 : theme.colors.gray.gray700};
  margin-top: 5px;
`;

// 두 번째 selector 시작
const RankingTypeSelectorWrapper = styled.div`
  width: auto;
  height: auto;
  padding: ${({ theme }) => theme.spacing.spacing3}
    ${({ theme }) => theme.spacing.spacing4};
  border: 1px solid ${({ theme }) => theme.colors.blue.blue200};
  background-color: ${({ theme }) => theme.colors.blue.blue100};
  border-radius: 7px;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const RankingTypeSelectorBtn = styled.div<{ isSelected?: boolean }>`
  font-size: ${({ theme }) => theme.typography.label.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label.label1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label.label1Bold.lineHeight};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.blue.blue700 : theme.colors.blue.blue500};
  cursor: pointer;
`;

const userGroupMock = [
  { key: 0, group: 'ALL', emoji: 'ALL', label: '전체' },
  { key: 1, group: 'FEMALE', emoji: '👩🏻', label: '여성이' },
  { key: 2, group: 'MALE', emoji: '👨🏻', label: '남성이' },
  { key: 3, group: 'TEEN', emoji: '👦🏻', label: '청소년이' },
];

const rankingTypeMock = [
  { key: 0, type: 'MANY_WISH', label: '받고 싶어한' },
  { key: 1, type: 'MANY_RECEIVE', label: '많이 선물한' },
  { key: 2, type: 'MANY_WISH_RECEIVE', label: '위시로 받은' },
];

// 메인 컴포넌트 시작
function RealtimeGiftRank() {
  const [selectedGroup, setSelectedGroup] = useState('ALL');
  const [selectedType, setSelectedType] = useState('MANY_WISH');

  // 최초 랜더링시 sessionStorage에서 선택된 그룹, 타입값을 가져와서 state에 세팅
  useEffect(() => {
    const savedGroup = sessionStorage.getItem('selectedGroup');
    const savedType = sessionStorage.getItem('selectedType');

    if (savedGroup) {
      setSelectedGroup(savedGroup);
    }

    if (savedType) {
      setSelectedType(savedType);
    }
  }, []);

  // 그룹 클릭시 state와 sessionStorage에 저장하는 핸들러
  const handleGroupClick = (group: string) => {
    setSelectedGroup(group);
    sessionStorage.setItem('selectedGroup', group);
  };

  // 타입 클릭시 state와 sessionStorage에 저장하는 핸들러
  const handleTypeClick = (type: string) => {
    setSelectedType(type);
    sessionStorage.setItem('selectedType', type);
  };

  return (
    <RealtimeRankWrapper>
      <RealtimeRankTitle>실시간 급상승 선물랭킹</RealtimeRankTitle>
      {/* 첫 번째 selector */}
      <UserGroupSelectorWrapper>
        {userGroupMock.map(({ key, group, emoji, label }) => (
          <UserGroupSelectorItemWrapper
            key={key}
            onClick={() => handleGroupClick(group)}
          >
            <UserGroupSelectorBtn isSelected={selectedGroup === group}>
              {emoji}
            </UserGroupSelectorBtn>
            <UserGroupSelectorTxt isSelected={selectedGroup === group}>
              {label}
            </UserGroupSelectorTxt>
          </UserGroupSelectorItemWrapper>
        ))}
      </UserGroupSelectorWrapper>

      {/* 두 번째 selector */}
      <RankingTypeSelectorWrapper>
        {rankingTypeMock.map(({ key, type, label }) => (
          <RankingTypeSelectorBtn
            key={key}
            onClick={() => handleTypeClick(type)}
            isSelected={selectedType === type}
          >
            {label}
          </RankingTypeSelectorBtn>
        ))}
      </RankingTypeSelectorWrapper>

      {/* 아이템 리스트 */}
      <RealtimeRankItemWrapper
        selectedGroup={selectedGroup}
        selectedType={selectedType}
      />
    </RealtimeRankWrapper>
  );
}

export default RealtimeGiftRank;
