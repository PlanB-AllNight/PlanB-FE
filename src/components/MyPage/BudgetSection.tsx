import styled from "styled-components";
import { useEffect, useState } from "react";

import SectionComponent from "./SectionComponent";
import CategoryBudgetSection from "../Budget/CategoryBudgetSection";
import AiSuggestionSection from "../Budget/AiSuggestionSection";

import { getBudgetHistory, getBudgetDetail } from "../../api/budget";
import { mapCategoryProposals } from "../../utils/budgetMapper";

import type { BudgetRecommendationData, BudgetSummary } from "../../types/budget";

const BudgetSection = () => {
    const [listLoading, setListLoading] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);

    const [budgets, setBudgets] = useState<BudgetSummary[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [detail, setDetail] = useState<BudgetRecommendationData | null>(null);

    // 1) 예산안 목록 조회
    useEffect(() => {
        const fetchList = async () => {
            try {
                setListLoading(true);
                const res: BudgetSummary[] = await getBudgetHistory();
                setBudgets(res);

                if (res.length > 0) {
                    setSelectedId(res[0].id); // 가장 최근 예산안 자동 선택
                }
            } catch (e) {
                console.error("예산 목록 조회 실패", e);
                setBudgets([]);
            } finally {
                setListLoading(false);
            }
        };

        fetchList();
    }, []);

    // 2) 선택된 id 기준 상세 조회
    useEffect(() => {
        if (!selectedId) return;

        const fetchDetail = async () => {
            try {
                setDetailLoading(true);
                const res = await getBudgetDetail(selectedId); // GET /budget/{id}
                setDetail(res.data);
            } catch (e) {
                console.error("예산 상세 조회 실패", e);
                setDetail(null);
            } finally {
                setDetailLoading(false);
            }
        };

        fetchDetail();
    }, [selectedId]);

    // 카테고리별 예산 변환 (상세 데이터가 있을 때만)
    const categoryBudgetGroups = detail
        ? mapCategoryProposals(detail)
        : [];

    return (
        <Wrapper>
            <SectionComponent
                title="예산 관리"
                description="AI가 생성한 맞춤 예산안을 선택해서 확인하고 효율적으로 관리하세요"
            >
                <Content>
                    {/* 상단 예산안 목록 카드 영역 */}
                    <TopListSection>
                        {listLoading ? (
                            <BudgetListSkeleton />
                        ) : budgets.length === 0 ? (
                            <DetailSkeleton>저장된 예산안이 없어요. 먼저 예산을 생성해보세요!</DetailSkeleton>
                        ) : (
                            <BudgetCardRow>
                                {budgets.map((item) => {
                                    const isSelected = item.id === selectedId;
                                    const planLabel = item.plan_type.replace(/\//g, "/");
                                    const createdDate = item.created_at.slice(0, 7); // YYYY-MM-DD

                                    return (
                                        <BudgetCard
                                            key={item.id}
                                            $selected={isSelected}
                                            onClick={() => setSelectedId(item.id)}
                                        >
                                            <BudgetHeader>
                                                <BudgetTitle>{item.title}</BudgetTitle>
                                                <PlanTag>{planLabel}</PlanTag>
                                            </BudgetHeader>
                                            <BudgetDate>{createdDate}</BudgetDate>

                                            <BudgetLine>
                                                <BudgetLabel>필수 지출</BudgetLabel>
                                                <BudgetValue>
                                                    {item.essential_budget.toLocaleString()}원
                                                </BudgetValue>
                                            </BudgetLine>
                                            <BudgetLine>
                                                <BudgetLabel>선택 지출</BudgetLabel>
                                                <BudgetValue>
                                                    {item.optional_budget.toLocaleString()}원
                                                </BudgetValue>
                                            </BudgetLine>
                                            <BudgetLine>
                                                <BudgetLabel>저축/투자</BudgetLabel>
                                                <BudgetValue>
                                                    {item.saving_budget.toLocaleString()}원
                                                </BudgetValue>
                                            </BudgetLine>
                                        </BudgetCard>
                                    );
                                })}
                            </BudgetCardRow>
                        )}
                    </TopListSection>

                    {/* 선택된 예산안 상세 */}
                    {detailLoading || !detail ? (
                        <EmptyText></EmptyText>
                    ) : (
                        <>
                            {/* 상단 3박스 (필수/선택/저축) */}
                            <SummaryTitle>{detail.title}</SummaryTitle>
                            <SummaryRow>
                                <SummaryCard>
                                    <SummaryLabel>필수 지출({detail.budget_summary.needs.percent})</SummaryLabel>
                                    <SummaryValue>
                                        {detail.budget_summary.needs.amount.toLocaleString()}원
                                    </SummaryValue>
                                    <SummarySub>주거, 식비, 교통 등</SummarySub>
                                </SummaryCard>
                                <SummaryCard>
                                    <SummaryLabel>선택 지출({detail.budget_summary.wants.percent})</SummaryLabel>
                                    <SummaryValue>
                                        {detail.budget_summary.wants.amount.toLocaleString()}원
                                    </SummaryValue>
                                    <SummarySub>취미, 외식, 쇼핑 등</SummarySub>
                                </SummaryCard>
                                <SummaryCard>
                                    <SummaryLabel>저축/투자({detail.budget_summary.savings.percent})</SummaryLabel>
                                    <SummaryValue>
                                        {detail.budget_summary.savings.amount.toLocaleString()}원
                                    </SummaryValue>
                                    <SummarySub>비상금, 목표 저축, 투자</SummarySub>
                                </SummaryCard>
                            </SummaryRow>

                            {/* 카테고리별 예산 추천 */}
                            <CategoryBudgetSection categoryBudgetGroups={categoryBudgetGroups} />

                            {/* AI의 핵심 제안 */}
                            <AiSuggestionSection aiSuggestions={detail.ai_proposal} />
                        </>
                    )}
                </Content>
            </SectionComponent>
        </Wrapper >
    );
};

export default BudgetSection;

// ---------------- styled-components -----------------------

const Wrapper = styled.div`
  width: 100%;
`;

const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
`;

// 상단 예산 목록
const TopListSection = styled.div`
    width: 100%;
`;

const BudgetCardRow = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
`;

const BudgetCard = styled.button<{ $selected: boolean }>`
    flex: 1;
    padding: 20px 18px;
    text-align: left;

    background: ${({ $selected }) => ($selected ? "#F0FDFA" : "white")};
    border: 2px solid ${({ theme }) => theme.colors.primary[300]};
    border-radius: 13px;
    cursor: pointer;
    transition: 0.2s ease;

    outline: ${({ theme, $selected }) =>
        $selected ? `4px solid ${theme.colors.primary[400]}` : "none"};
    outline-offset: -3px;

    &:hover {
        background: #f0fdfa;
  }
`;

const BudgetHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const BudgetTitle = styled.h4`
    font-size: 1.8rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
`;

const PlanTag = styled.span`
    padding: 4px 15px;
    border-radius: 15px;
    font-size: 1.5rem;
    background: ${({ theme }) => theme.colors.primary[500]};
    color: white;
`;

const BudgetDate = styled.p`
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
`;

const BudgetLine = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 7px;
`;

const BudgetLabel = styled.span`
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
`;

const BudgetValue = styled.span`
    font-size: 1.4rem;
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    color: ${({ theme }) => theme.colors.primary[400]};
`;

// 목록 skeleton
const SummaryTitle = styled.h2`
    font-size: 2.5rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    margin-bottom: -20px;
`;

const BudgetListSkeleton = () => (
    <BudgetCardRow>
        {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
        ))}
    </BudgetCardRow>
);

const SkeletonCard = styled.div`
    flex: 1;
    height: 140px;
    border-radius: 13px;
    background: linear-gradient(90deg, #f3f3f3 25%, #e9e9e9 37%, #f3f3f3 63%);
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;

    @keyframes shimmer {
        0% {
        background-position: -400px 0;
        }
        100% {
        background-position: 400px 0;
        }
    }
`;

const EmptyText = styled.p`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
`;

// 상세 skeleton
const DetailSkeleton = styled.div`
    width: 100%;
    height: 350px;
    border-radius: 13px;
    border: 2px solid ${({ theme }) => theme.colors.primary[300]};
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fbffff;
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
`;

// 상단 3박스
const SummaryRow = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
`;

const SummaryCard = styled.div`
    padding: 30px 26px;
    background: white;
    border-radius: 13px;
    border: 2px solid ${({ theme }) => theme.colors.primary[500]};
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const SummaryLabel = styled.p`
    font-size: 1.8rem;
    font-weight: ${({ theme }) => theme.font.weight.semibold};
`;

const SummaryValue = styled.p`
    font-size: 2.5rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme }) => theme.colors.primary[400]};
    margin-top: 10px;
`;

const SummarySub = styled.p`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
`;