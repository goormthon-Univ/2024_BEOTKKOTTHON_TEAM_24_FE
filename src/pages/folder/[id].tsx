import Header from '@/components/common/Header';
import { NextPage } from 'next';
import styled from 'styled-components';
import { useState } from 'react';
import SmallView from '@svg/small-view-icon.svg';
import LargeView from '@svg/large-view-icon.svg';
import { Insight } from '@/types/insight';
import SummaryInsightCard from '@/components/common/SummaryInsightCard';
import { calendarData } from '@/constants/data';
import ShareIcon from '@svg/share-icon-blue.svg';
import EditModal from '@components/folder/EditModal';
import SearchSection from '@/components/common/SearchSection';
import { useGetFolderInsight } from '@/hooks/api/useInsight';
import { useRouter } from 'next/router';
import RenderTagList from '@/components/folder/RenderTagList';
import InsightCard from '@/components/common/InsightCard';

interface Props {}

const FolderDetail: NextPage<Props> = ({}) => {
  const [selectedTag, setSelectedTag] = useState('전체');
  const [searchInput, setSearchInput] = useState('');
  const [isSmall, setIsSmall] = useState(false);
  const [insightList, setInsightList] = useState<Insight[]>(
    calendarData.remindInsightList,
  );
  const [isModalOn, setIsModalOn] = useState(false);

  const router = useRouter();
  const { data } = useGetFolderInsight(Number(router.query.id));
  const tagList = data?.map((insight) => insight.insightTagList).flat();
  const insightListFilteredByTag =
    selectedTag == '전체'
      ? data
      : data?.filter((insight) => insight.insightTagList.includes(selectedTag));
  const searchedInsightList =
    searchInput === ''
      ? insightListFilteredByTag
      : insightListFilteredByTag?.filter((insight) =>
          insight.insightTitle.toLowerCase().includes(searchInput),
        );
  const onClick = () => {
    setIsSmall(!isSmall);
  };

  const handleModalOn = () => {
    setIsModalOn(true);
    setInsightList(insightList); // 추후 삭제
  };

  return (
    <>
      <Wrapper>
        <Header title={String(router.query.name)} />
        <span className="link edit">편집</span>
        <ShareIcon className="share" onClick={() => handleModalOn()} />
        <SearchSection
          value={searchInput}
          placeholder="인사이트 검색"
          autoFocus={true}
          top={20}
          bottom={20}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <RenderTagList
          tagList={tagList}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
        <InfoSection>
          <div>
            <span className="count-text">전체 </span>
            <span className="count-text insight">
              {' '}
              {searchedInsightList?.length}
            </span>
          </div>
          <div className="icons-box">
            <LargeViewIcon isSmall={isSmall} onClick={onClick} />
            <SmallViewIcon isSmall={isSmall} onClick={onClick} />
          </div>
        </InfoSection>
        <InsightSection>
          {searchedInsightList?.map((insight) =>
            isSmall ? (
              <InsightCard
                key={insight.insightId}
                favicon="/svg/insight-favicon.svg"
                insightData={{
                  insightId: insight.insightId,
                  insightMainImage: '/image/reinput.jpeg',
                  insightTitle: insight.insightTitle,
                  insightSummary: insight.insightSummary,
                  insightTagList: insight.insightTagList,
                  todayRead: false,
                }}
              />
            ) : (
              <SummaryInsightCard
                key={insight.insightId}
                favicon="/svg/insight-favicon.svg"
                insightData={{
                  insightId: insight.insightId,
                  insightMainImage: '/image/reinput.jpeg',
                  insightTitle: insight.insightTitle,
                  insightSummary: insight.insightSummary,
                  insightTagList: insight.insightTagList,
                  todayRead: false,
                }}
              />
            ),
          )}
        </InsightSection>
      </Wrapper>
      {isModalOn && (
        <EditModal type="share" onClose={() => setIsModalOn(false)} />
      )}
    </>
  );
};

export default FolderDetail;

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  justify-content: center;
  .tag-list {
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    gap: 8px;
    margin-left: 20px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    white-space: nowrap;
  }
  .tag-list::-webkit-scrollbar {
    display: none;
  }
  .selected {
    border-radius: 5.268px;
    border: 1px solid var(--Neutral-150, #3184ff);
    background: var(--Primary-500, #3184ff);
    color: #fff;
  }
  .link {
    color: #3184ff;

    text-align: center;
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: 20.55px; /* 120.885% */
    letter-spacing: 0.511px;
  }
  .edit {
    position: absolute;
    top: 18px;
    right: 58px;
  }
  .share {
    position: absolute;
    top: 17px;
    right: 21px;
  }
`;

const InfoSection = styled.div`
  width: calc(100% - 40px);
  margin: 18px auto;
  display: flex;
  justify-content: space-between;
  .icons-box {
    width: 48px;
    display: flex;
    justify-content: space-between;
  }
  .count-text {
    color: var(--Neutral-500, #1f1f1f);
    text-align: center;
    /* Body-14-M */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 19.6px */
  }
  .insight {
    font-size: 16px;
    font-weight: 600;
  }
`;

type IconProps = {
  isSmall: boolean;
};

const SmallViewIcon = styled(SmallView)<IconProps>`
  rect {
    fill: ${(props) => (props.isSmall ? '#1F1F1F' : '#E1E1E1')};
  }
`;

const LargeViewIcon = styled(LargeView)<IconProps>`
  rect {
    fill: ${(props) => (props.isSmall ? '#E1E1E1' : '#1F1F1F')};
  }
`;

const InsightSection = styled.div``;
