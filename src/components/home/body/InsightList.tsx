import styled from 'styled-components';
import InsightCard from '../../common/InsightCard';
import SummaryInsightCard from '@components/common/SummaryInsightCard';
import { CalenderPostResponse } from '@/types/reminder';
import { insightData1, insightData2 } from '@/constants/data';

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
            insightData={insightData1}
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
            insightData={insightData2}
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
