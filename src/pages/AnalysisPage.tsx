import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import type { AnalysisResult } from "../types/analysis";
import HeroSection from "../components/common/HeroSection";
import CategorySection from "../components/Analysis/CategorySection";
import AiInsightSection from "../components/Analysis/AiInsightSection";
import Button from "../components/common/Button";
import { mapAnalysisResponse } from "../utils/analysisMapper";

const AnalysisPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const rawData = location.state?.analysisResult;

    if (!rawData) return <div>데이터가 없습니다.</div>

    const data = mapAnalysisResponse(rawData);

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
                        <Value>{data.summary.totalIncome.toLocaleString()}원</Value>
                    </KPICard>
                    <KPICard>
                        <Label>총 지출</Label>
                        <Value>{data.summary.totalSpending.toLocaleString()}원</Value>
                    </KPICard>
                    <KPICard>
                        <Label>저축 가능액</Label>
                        <Value>{data.summary.possibleSaving.toLocaleString()}원</Value>
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