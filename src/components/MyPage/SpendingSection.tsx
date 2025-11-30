import styled from "styled-components";
import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

import { getSpendingTrend } from "../../api/mypage";
import { mapSpendingTrendResponse } from "../../utils/spendingTrendMapper";
import type { TrendViewModel } from "../../utils/spendingTrendMapper";

import SectionComponent from "./SectionComponent";
import { useNavigate } from "react-router-dom";

const SpendingSection = () => {
    const [loading, setLoading] = useState(false);
    const [viewModel, setViewModel] = useState<TrendViewModel | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrend = async () => {
            try {
                setLoading(true);
                const data = await getSpendingTrend();
                setViewModel(mapSpendingTrendResponse(data));
            } catch (err) {
                console.error("소비 추이 조회 실패", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrend();
    }, []);

    if (loading) {
        return <div>소비 추이를 불러오는 중입니다...</div>;
    }

    if (!viewModel) {
        return (
            <Wrapper>
                <SectionComponent
                    title="소비 분석"
                    description="지난달과 비교한 소비 패턴을 확인하세요"
                    buttonText="소비 분석하기"
                    onButtonClick={() => navigate("/analysis")}
                >
                    <NoBudgetBox>
                        <NoBudgetText>
                            아직 소비 분석 데이터가 없습니다. 먼저 소비 분석을 진행해보세요.
                        </NoBudgetText>
                    </NoBudgetBox>
                </SectionComponent>
            </Wrapper>
        );
    }

    const { summary, topCategory, trendChartData, categoryAnalysis } = viewModel;

    return (
        <Wrapper>
            <SectionComponent
                title="소비 분석"
                description="지난달과 비교한 소비 패턴을 확인하세요"
                buttonText="소비 분석하기"
                onButtonClick={() => navigate("/analysis")}
            >
                <Content>
                    {/* 상단 KPI 3개 */}
                    <KPISection>
                        <KPICard>
                            <KpiLabel>이번 달 총 소비</KpiLabel>
                            <KpiValue>{summary.currentTotalSpent.toLocaleString()}원</KpiValue>
                            <KpiSubText>{summary.currentMonthLabel} 기준</KpiSubText>
                        </KPICard>

                        <KPICard>
                            <KpiLabel>변동률</KpiLabel>
                            <KpiChange $color={summary.changeColor}>
                                {summary.changeLabel}
                            </KpiChange>
                            <KpiSubText>
                                {summary.changeLabel === "이번 달 첫 분석이에요"
                                    ? "비교할 지난 달 데이터가 없어요"
                                    : "지난 달 대비 소비 변화"}
                            </KpiSubText>
                        </KPICard>

                        <KPICard>
                            <KpiLabel>가장 많이 쓴 카테고리</KpiLabel>
                            <KpiValue>{topCategory.name}</KpiValue>
                            <KpiSubText>
                                {topCategory.amount.toLocaleString()}원 ({topCategory.percent}
                                %)
                            </KpiSubText>
                        </KPICard>
                    </KPISection>

                    {/* 월별 소비 추이 차트 */}
                    <ChartSection>
                        <SectionTitle>월 별 소비 추이</SectionTitle>
                        <SectionSub>최근 소비 분석 결과를 월별로 비교합니다</SectionSub>

                        <ChartBox>
                            <ResponsiveContainer width="100%" height={260}>
                                <LineChart data={trendChartData} margin={{ top: 20, right: 40, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip formatter={(value: any) => `${value.toLocaleString()}원`} />
                                    <Line
                                        type="monotone"
                                        dataKey="totalSpent"
                                        stroke="#00A99D"
                                        strokeWidth={3}
                                        dot={{ r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartBox>
                    </ChartSection>

                    {/* 카테고리 분석 */}
                    <CategorySection>
                        <SectionTitle>카테고리별 최근 소비 분석</SectionTitle>
                        <SectionSub>각 카테고리별 지출 현황을 확인해보세요</SectionSub>

                        {categoryAnalysis.length === 0 ? (
                            <EmptyText>
                                아직 카테고리별 소비 분석을 위한 데이터가 충분하지 않아요.
                            </EmptyText>
                        ) : (
                            <CategoryList>
                                {categoryAnalysis.map((item) => {
                                    const diff = item.diffPercent;
                                    let diffDirection: "up" | "down" | "flat" = "flat";
                                    let diffLabel = "";

                                    if (diff == null) {
                                        diffDirection = "flat";
                                        diffLabel = "전월 데이터 없음";
                                    } else if (diff === 0) {
                                        diffDirection = "flat";
                                        diffLabel = "변동 없음";
                                    } else if (diff > 0) {
                                        diffDirection = "up";
                                        diffLabel = `↗ +${diff}%`;
                                    } else {
                                        diffDirection = "down";
                                        diffLabel = `↘ -${diff}%`;
                                    }

                                    return (
                                        <CategoryRow key={item.category}>
                                            <CategoryLeft>
                                                <CategoryName>{item.category}</CategoryName>
                                                <DiffText $direction={diffDirection}>
                                                    {diffLabel}
                                                </DiffText>
                                            </CategoryLeft>

                                            <CategoryMiddle>
                                                <BarTrack>
                                                    <BarFill
                                                        style={{ width: `${item.percent}%` }}
                                                    />
                                                </BarTrack>
                                            </CategoryMiddle>

                                            <CategoryRight>
                                                <AmountText>
                                                    {item.amount.toLocaleString()}원 ({item.count}건)
                                                </AmountText>
                                            </CategoryRight>
                                        </CategoryRow>
                                    );
                                })}
                            </CategoryList>
                        )}
                    </CategorySection>
                </Content>
            </SectionComponent>
        </Wrapper>
    );
};

export default SpendingSection;

const Wrapper = styled.div`
    width: 100%;
`;

const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
`;

const KPISection = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
`;

const KPICard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 35px 30px;
    gap: 20px;

    background: white;
    border: 2px solid ${({ theme }) => theme.colors.primary[500]};
    border-radius: 13px;
`;

const KpiLabel = styled.p`
    font-size: 1.8rem;
    font-weight: ${({ theme }) => theme.font.weight.semibold};
`;

const KpiValue = styled.p`
    font-size: 2.5rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme }) => theme.colors.primary[400]};
    margin-top: 10px;
`;

const KpiChange = styled.p<{ $color: "up" | "down" | "flat" }>`
    font-size: 2.5rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ $color, theme }) =>
        $color === "up" ? "#FF4D4F" : $color === "down" ? theme.colors.blue : theme.colors.primary[400]};
    margin-top: 10px;
`;

const KpiSubText = styled.p`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
`;

// ChartSection
const ChartSection = styled.section`
    display: flex;
    flex-direction: column;
    padding: 35px 30px;

    background: white;
    border: 2px solid ${({ theme }) => theme.colors.primary[500]};
    border-radius: 13px;
`;

const SectionTitle = styled.h3`
    font-size: 1.8rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    margin-bottom: 10px;
`;

const SectionSub = styled.p`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
    margin-bottom: 18px;
`;

const ChartBox = styled.div`
    width: 100%;
    height: 260px;
`;

// CategorySection
const CategorySection = styled.section`
    display: flex;
    flex-direction: column;
    padding: 35px 30px;

    background: white;
    border: 2px solid ${({ theme }) => theme.colors.primary[500]};
    border-radius: 13px;
`;

const CategoryList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-top: 10px;
`;

const CategoryRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    align-items: center;
    gap: 16px;
`;

const CategoryLeft = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const CategoryName = styled.span`
    font-size: 1.6rem;
    font-weight: ${({ theme }) => theme.font.weight.semibold};
`;

const DiffText = styled.span<{ $direction: "up" | "down" | "flat" }>`
    font-size: 1.2rem;
    color: ${({ $direction, theme }) =>
        $direction === "up" ? "#FF4D4F" : $direction === "down" ? theme.colors.blue : theme.colors.fontSecondary};
`;

const CategoryMiddle = styled.div`
    width: 100%;
`;

const BarTrack = styled.div`
    width: 100%;
    height: 13px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.gray};
`;

const BarFill = styled.div`
    height: 13px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.primary[400]};
`;

const CategoryRight = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const AmountText = styled.span`
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.font.weight.semibold};
`;

const EmptyText = styled.p`
    margin-top: 12px;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
`;

const NoBudgetBox = styled.div`
    width: 100%;
    height: 350px;
    border-radius: 13px;
    border: 2px solid ${({ theme }) => theme.colors.primary[300]};
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fbffff;
`;

const NoBudgetText = styled.p`
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
`;