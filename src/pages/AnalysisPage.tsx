import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../utils/format";
import type { AnalysisResult } from "../types/analysis";
import HeroSection from "../components/common/HeroSection";
import CategorySection from "../components/Analysis/CategorySection";
import AiInsightSection from "../components/Analysis/AIInsightSection";
import Button from "../components/common/Button";

const mockAnalysisData: AnalysisResult = {
    summary: {
        totalIncome: 1500000,
        totalSpending: 212670,
        spendingRate: 44,
        possibleSaving: 1287330,
    },

    categories: [
        { name: "식사", ratio: 18.2, amount: 245000, count: 42 },
        { name: "카페/디저트", ratio: 12.5, amount: 169000, count: 27 },
        { name: "쇼핑/패션", ratio: 15.4, amount: 208000, count: 12 },
        { name: "취미/여가", ratio: 7.8, amount: 106000, count: 9 },
        { name: "사회/모임", ratio: 6.5, amount: 88000, count: 7 },
        { name: "교통", ratio: 4.2, amount: 57000, count: 21 },
        { name: "통신/구독", ratio: 3.9, amount: 53000, count: 3 },
        { name: "데이트", ratio: 5.1, amount: 69000, count: 6 },
        { name: "여행", ratio: 9.0, amount: 122000, count: 4 },
        { name: "교육/학습", ratio: 4.8, amount: 65000, count: 5 },
        { name: "주거", ratio: 4.1, amount: 56000, count: 2 },
        { name: "반려동물", ratio: 2.4, amount: 33000, count: 3 },
        { name: "건강/의료", ratio: 3.2, amount: 43000, count: 1 },
        { name: "특별지출(등록금/장학금)", ratio: 1.4, amount: 19000, count: 1 },
    ],

    insights: {
        highestCategory: "쇼핑/잡화",
        overspendingCategory: "쇼핑/잡화 (전체 지출의 20% 이상)",
        suggestions: "카페 지출을 10% 줄이면 월 2,370원 절약 가능",
    },

    aiAnalysis: {
        findings: [
            "총 지출의 35%가 ‘식사’ 항목에서 발생했습니다.",
            "‘카페/디저트’에서 월 22회 결제하여 지출 빈도가 가장 높습니다.",
            "지난 9월 대비 ‘사회/모임’ 지출이 40%(+5만원) 증가했습니다.",
            "월 저축 가능액은 약 30만원으로 분석됩니다.",
        ],
        suggestions: [
            "식사 카테고리에서 비중을 10% 줄이고 배달을 줄이세요.",
            "카페/디저트 예산을 월 10만원으로 설정하여 추가 지출을 방지하세요.",
            "‘사회/모임’ 지출 패턴을 기록하고 다음 달은 10만원 이하로 설정해보세요.",
        ],
    },
};

const AnalysisPage = () => {
    const data = mockAnalysisData;
    const navigate = useNavigate();

    return (
        <Wrapper>
            <HeroSection
                title="마이데이터 소비 분석"
                highlight="소비 분석"
                description={`코스콤 마이데이터 플랫폼과 연동하여 당신의 소비패턴을 정확히 분석하고\n개인화된 예산 관리 솔루션을 제공합니다`}
            />

            <Content>
                <KPISection>
                    <KPICard>
                        <Label>총 수입</Label>
                        <Value>{formatNumber(data.summary.totalIncome)}원</Value>
                    </KPICard>
                    <KPICard>
                        <Label>총 지출</Label>
                        <Value>{formatNumber(data.summary.totalSpending)}원</Value>
                    </KPICard>
                    <KPICard>
                        <Label>저축 가능액</Label>
                        <Value>{formatNumber(data.summary.possibleSaving)}원</Value>
                    </KPICard>
                </KPISection>

                <CategorySection categories={data.categories} insights={data.insights} />
                <AiInsightSection findings={data.aiAnalysis.findings} suggestions={data.aiAnalysis.suggestions} />

                <BottomSection>
                    <BottomTitle>AI가 제안하는 맞춤 예산</BottomTitle>
                    <BottomDesc>코스콤 마이데이터 분석을 기반으로, 당신에게 꼭 맞는 예산안을 설계해 드립니다</BottomDesc>
                    <BottomButtonWrapper>
                        <Button
                            variant="secondary"
                            size="md"
                            onClick={() => navigate('/budget')}
                        >
                            추천 예산 확인하기
                        </Button>
                    </BottomButtonWrapper>
                </BottomSection>
            </Content>
        </Wrapper>
    );
};

export default AnalysisPage;

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

const KPISection = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
`;

const KPICard = styled.div`
    flex: 1 1 260px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 42px 39px;
    background: white;
    border: 2px solid ${({ theme }) => theme.colors.gray};
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.10);
    gap: 25px;

    @media (max-width: 768px) {
        padding: 24px 20px;
    }
`;

const Label = styled.p`
    font-size: 2.2rem;
    font-weight: ${({ theme }) => theme.font.weight.regular};
    color: ${({ theme }) => theme.colors.fontSecondary};
`;

const Value = styled.p`
    font-size: 3rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
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
`;

const BottomButtonWrapper = styled.div`
    width: 206px;
    margin-top: 16px;
`;