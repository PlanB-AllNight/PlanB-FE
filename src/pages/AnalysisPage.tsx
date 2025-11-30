import styled from "styled-components";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeroSection from "../components/common/HeroSection";
import CategorySection from "../components/Analysis/CategorySection";
import AiInsightSection from "../components/Analysis/AiInsightSection";
import Button from "../components/common/Button";

import { mapAnalysisResponse } from "../utils/analysisMapper";
import { recommendBudget } from "../api/budget";
import { getAnalysisDetail } from "../api/spending";

function formatYearMonth(ym?: string) {
    if (!ym) return ""; // 혹은 "-" 같은 기본값
    const [year, month] = ym.split("-");
    return `${year}년 ${month}월`;
}

const AnalysisPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const rawData = location.state?.analysisResult;
    const analysisResultId = location.state?.analysisResultId;

    const [loading, setLoading] = useState<boolean>(!rawData && !!analysisResultId);
    // 서버에서 가져올 원본 분석 데이터를 담음
    const [analysisData, setAnalysisData] = useState<any | null>(rawData ?? null);

    // rawData가 없고, analysisResultId만 있는 경우 -> GET 요청
    useEffect(() => {
        if (rawData) return; // 이미 데이터 있으면 GET 불필요
        if (!analysisResultId) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await getAnalysisDetail(analysisResultId);
                if (result) {
                    setAnalysisData(result.data);
                } else {
                    console.warn("서버에서 빈 데이터가 반환되었습니다.");
                }
            } catch (e) {
                console.error("❌ 분석 데이터 조회 실패:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [analysisResultId, rawData]);

    const handleBudgetRecommend = async () => {
        try {
            setLoading(true);
            const planRule = "50/30/20";

            const result = await recommendBudget(planRule);
            setLoading(false);

            navigate("/budget", {
                state: { budgetResult: result }
            });
        } catch (error: any) {
            console.error(error);
            setLoading(false);
            alert(error.response?.data?.detail || "예산 추천을 불러오지 못했습니다.");
        }
    }

    // 1) GET 요청 로딩 (초기 분석 데이터 불러올 때만)
    if (!analysisData && loading) {
        return <div>분석 결과를 불러오는 중입니다...</div>;
    }

    // 2) 데이터가 없으면 에러 처리
    if (!analysisData) {
        return <div>분석 데이터가 존재하지 않습니다.</div>;
    }

    const parsedData = mapAnalysisResponse(analysisData);

    const yearMonthLabel = formatYearMonth(parsedData.summary.date);

    return (
        <Wrapper>
            <HeroSection
                title="마이데이터 소비 분석"
                highlight="소비 분석"
                description={`코스콤 마이데이터 플랫폼과 연동하여 당신의 소비패턴을 정확히 분석하고\n개인화된 예산 관리 솔루션을 제공합니다`}
            />

            <Content>
                <Title>{yearMonthLabel} 소비 분석</Title>
                <KPISection>
                    <KPICard>
                        <Label>총 수입</Label>
                        <Value>{parsedData.summary.totalIncome.toLocaleString()}원</Value>
                    </KPICard>
                    <KPICard>
                        <Label>총 지출</Label>
                        <Value>{parsedData.summary.totalSpending.toLocaleString()}원</Value>
                    </KPICard>
                    <KPICard>
                        <Label>저축 가능액</Label>
                        <Value>{parsedData.summary.possibleSaving.toLocaleString()}원</Value>
                    </KPICard>
                </KPISection>

                <CategorySection categories={parsedData.categories} insights={parsedData.insights} />
                <AiInsightSection findings={parsedData.aiAnalysis.findings} suggestions={parsedData.aiAnalysis.suggestions} />

                <BottomSection>
                    <BottomTitle>AI가 제안하는 맞춤 예산</BottomTitle>
                    <BottomDesc>코스콤 마이데이터 분석을 기반으로, 당신에게 꼭 맞는 예산안을 설계해 드립니다</BottomDesc>
                    <BottomButtonWrapper>
                        <Button
                            variant="secondary"
                            size="md"
                            onClick={handleBudgetRecommend}
                        >
                            {loading ? (
                                <>
                                    <Spinner />
                                    분석 중...
                                </>
                            ) : (
                                "추천 예산 확인하기"
                            )}
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

const Title = styled.h2`
    font-size: 3rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    margin-bottom: -20px;
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

const Spinner = styled.div`
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid white;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    margin-right: 8px;
    animation: spin 0.6s linear infinite;

    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }
`;