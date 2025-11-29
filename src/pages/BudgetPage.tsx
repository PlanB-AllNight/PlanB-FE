import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/common/HeroSection";
import BudgetRuleSection from "../components/Budget/BudgetRuleSection";
import CategoryBudgetSection from "../components/Budget/CategoryBudgetSection";
import AiSuggestionSection from "../components/Budget/AiSuggestionSection";
import Button from "../components/common/Button";

const mockBudgetData = {
    /** 카테고리별 예산 추천 */
    categoryGroups: [
        {
            groupName: "필수 지출" as const,
            groupAmount: 750000,
            items: [
                {
                    name: "주거",
                    current: 350000,
                    recommended: 300000,
                    status: "적정" as const,
                },
                {
                    name: "식사",
                    current: 350000,
                    recommended: 200000,
                    status: "과소비" as const,
                },
                {
                    name: "특별지출(등록금)",
                    current: 100000,
                    recommended: 100000,
                    status: "적정" as const,
                },
                {
                    name: "교통",
                    current: 50000,
                    recommended: 50000,
                    status: "여유" as const,
                },
                {
                    name: "통신",
                    current: 100000,
                    recommended: 50000,
                    status: "적정" as const,
                },
            ],
        },

        {
            groupName: "선택 지출" as const,
            groupAmount: 450000,
            items: [
                {
                    name: "사회/모임",
                    current: 350000,
                    recommended: 200000,
                    status: "여유" as const,
                },
                {
                    name: "쇼핑/패션",
                    current: 350000,
                    recommended: 200000,
                    status: "과소비" as const,
                },
                {
                    name: "교육/학습",
                    current: 100000,
                    recommended: 100000,
                    status: "적정" as const,
                },
                {
                    name: "데이트",
                    current: 30000,
                    recommended: 50000,
                    status: "여유" as const,
                },
                {
                    name: "카페/디저트",
                    current: 100000,
                    recommended: 50000,
                    status: "적정" as const,
                },
                {
                    name: "취미/여가",
                    current: 100000,
                    recommended: 50000,
                    status: "과소비" as const,
                },
            ],
        },

        {
            groupName: "저축/투자" as const,
            groupAmount: 300000,
            items: [
                {
                    name: "저축/투자",
                    current: 350000,
                    recommended: 200000,
                    status: "적정" as const,
                },
            ],
        },
    ],

    /** AI 핵심 제안 */
    aiCoreSuggestion: {
        summary:
            "AI가 당신의 소비 구조를 분석한 결과, ‘사회/모임’ 지출이 ‘교육/학습’ 대비 2배 이상 많이 지출 쏠림이 확인되었습니다.",
        highlight:
            "‘사회/모임’ 지출을 주 1회, 회당 3만원으로 제한하는 것을 제안합니다.",
        improveEffect:
            "이 제안을 실천하면 지난달 대비 월 3만원을 절약할 수 있습니다. 이는 AI가 추천한 ‘50/30/20 룰'의 ‘선택 지출' 예산을 달성하는 가장 효과적인 방법이며, 확보된 3만원은 ‘저축 가능액(30만원)’을 초과 달성하는 데 사용할 수 있습니다.",
    },
}

const BudgetPage = () => {
    const data = mockBudgetData;
    const navigate = useNavigate();

    return (
        <Wrapper>
            <HeroSection
                title="AI가 제안하는 맞춤 예산"
                highlight="맞춤 예산"
                description="코스콤 마이데이터 분석을 기반으로, 당신에게 꼭 맞는 예산안을 설계해 드립니다"
            />

            <Content>
                <BudgetRuleSection />
                <CategoryBudgetSection categoryBudgetGroups={data.categoryGroups} />
                <AiSuggestionSection aiSuggestions={data.aiCoreSuggestion} />

                <BottomSection>
                    <BottomTitle>라이프 이벤트 시뮬레이션 & STO 추천</BottomTitle>
                    <BottomDesc>
                        {`목표를 향한 여정을 AI가 함께 설계해드립니다.\n현재 자산을 기반으로 다양한 플랜을 시뮬레이션하고, 투자와 절약 전략을 추천받아보세요.`}
                    </BottomDesc>
                    <BottomButtonWrapper>
                        <Button
                            variant="ghost"
                            size="md"
                            onClick={() => navigate('/analysis/result')}
                        >
                            소비 분석 보기
                        </Button>
                        <Button
                            variant="secondary"
                            size="md"
                            onClick={() => navigate('/simulate')}
                        >
                            나의 챌린지 시뮬레이션
                        </Button>
                    </BottomButtonWrapper>
                </BottomSection>
            </Content>

        </Wrapper>
    );
};

export default BudgetPage;

const Wrapper = styled.div`
    width: 100%;
`;

const Content = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 52px 20px 150px;
    display: flex;
    flex-direction: column;
    gap: 52px;
`;

const BottomSection = styled.div`
    background-color: ${({ theme }) => theme.colors.primary[500]};
    border-radius: 18px;
    padding: 80px 0;
    text-align: center;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const BottomTitle = styled.h2`
    font-size: 3.2rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
`;

const BottomDesc = styled.p`
    font-size: 2.0rem;
    color: ${({ theme }) => theme.colors.gray};
    white-space: pre-line;
    line-height: 1.3;
`;

const BottomButtonWrapper = styled.div`
    width: 500px;
    margin-top: 16px;
    display: flex;
    gap: 26px;
`;
