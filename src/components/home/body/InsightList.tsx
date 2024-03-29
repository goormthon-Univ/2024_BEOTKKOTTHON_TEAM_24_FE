import styled from 'styled-components';
import InsightCard from '../InsightCard';
import SummaryInsightCard from '@components/common/SummaryInsightCard';
import { CalenderPostResponse } from '@/types/reminder';

interface Props {
  $isSmall: boolean;
  calenderData: CalenderPostResponse;
}

const InsightList = ({ $isSmall, calenderData }: Props) => {
  return (
    <View>
      <div>
        <div className="view-title">
          <span>리마인드 인사이트</span>
          <span>1/1</span>
        </div>
        {$isSmall ? (
          <InsightCard insightData={calenderData.remindInsightList[0]} />
        ) : (
          <SummaryInsightCard
            favicon="/svg/insight-favicon2.svg"
            insightData={{
              insightId: 2,
              insightMainImage: '/image/디자인1.jpg',
              insightTitle: '알아두면 쓸모있는 시멘틱 마크업 개념',
              insightSummary:
                '미드저니는 UX/UI디자인, 그래픽 디자인 등 다양한 분야에서 활용될 수있습니다. 미드저니를 활용해 UX/UI 디자인을 수행하는 경우, 시나리오와 퍼소나를 아주 높은 퀄리티로 시각화 할 수 있습니다.',
              insightTagList: ['UI/UX', '사용자 경험'],
              todayRead: false,
            }}
          />
        )}
      </div>
      <div>
        <div className="view-title">
          <span>추천 인사이트</span>
          <span>1/1</span>
        </div>
        {$isSmall ? (
          <InsightCard insightData={calenderData.remindInsightList[1]} />
        ) : (
          <SummaryInsightCard
            favicon="/svg/insight-favicon.svg"
            insightData={{
              insightId: 2,
              insightMainImage: '/image/개발1.jpg',
              insightTitle: '디자인시스템에 모션 가이드 추가하는 방법',
              insightSummary:
                '미드저니는 UX/UI디자인, 그래픽 디자인 등 다양한 분야에서 활용될 수있습니다. 미드저니를 활용해 UX/UI 디자인을 수행하는 경우, 시나리오와 퍼소나를 아주 높은 퀄리티로 시각화 할 수 있습니다.',
              insightTagList: ['UI/UX', '사용자 경험'],
              todayRead: true,
            }}
          />
        )}
      </div>
    </View>
  );
};

const View = styled.div`
  display: flex;
  flex-direction: column;

  .view-title {
    :first-child {
      margin-left: 20px;
    }
    :last-child {
      margin-left: 10px;
      color: #3184ff;
    }
  }
`;

export default InsightList;
