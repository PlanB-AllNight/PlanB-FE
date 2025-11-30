import styled from "styled-components";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import HeroSection from "../components/common/HeroSection";
import SectionCard from "../components/Budget/SectionCard";
import WalletIcon from "../assets/svgs/wallet.svg?react";
import BudgetRuleSection from "../components/Budget/BudgetRuleSection";
import CategoryBudgetSection from "../components/Budget/CategoryBudgetSection";
import AiSuggestionSection from "../components/Budget/AiSuggestionSection";
import Button from "../components/common/Button";

import type { BudgetRecommendationResponse, RuleId } from "../types/budget";
import { mapCategoryProposals } from "../utils/budgetMapper";
import { ruleOptions } from "../constants/budget";

import { recommendBudget, saveBudget } from "../api/budget";


const BudgetPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    // 1) location.state에서 안전하게 꺼내기
    const locationState = location.state as
        | { budgetResult?: BudgetRecommendationResponse }
        | undefined;

    // 2) 전체 예산 데이터 state (null 가능)
    const [budgetData, setBudgetData] = useState<BudgetRecommendationResponse | null>(
        locationState?.budgetResult ?? null
    );

    // 3) budgetData가 아직 없으면 가드
    if (!budgetData || !budgetData.data) {
        return <div>예산 데이터를 불러오는 중입니다...</div>;
    }

    const createPayload = (data: BudgetRecommendationResponse["data"]) => ({
        spending_analysis_id: data.spending_analysis_id,
        title: data.title,
        date: data.date,
        total_income: data.total_income,
        plan_type: data.selected_plan,

        essential_budget: data.budget_summary.needs.amount,
        optional_budget: data.budget_summary.wants.amount,
        saving_budget: data.budget_summary.savings.amount,

        category_proposals: data.category_proposals,
        ai_proposal: data.ai_proposal
    });

    // 4) 선택된 룰 state (API에서 넘어온 selected_plan 기준)
    const formattedInitial = budgetData.data.selected_plan.replace(/\//g, "-") as RuleId;
    const [selectedRule, setSelectedRule] = useState<RuleId>(formattedInitial);

    // 5) 룰 선택 시 API 호출
    const handleSelectRule = async (rule: RuleId) => {
        setSelectedRule(rule);
        setLoading(true);
        const apiRule = rule.replace(/-/g, "/"); // "50-30-20" -> "50/30/20"

        try {
            const newData = await recommendBudget(apiRule);
            setBudgetData(newData); // 전체 데이터 교체
        } catch (err) {
            console.error("예산 추천 API 오류:", err);
        } finally {
            setLoading(false);
        }
    };

    // 6) 카테고리 변환
    const categoryBudgetGroups = mapCategoryProposals(budgetData.data);

    const handleSaveBudget = async () => {
        try {
            setLoading(true);
            const payload = createPayload(budgetData.data);

            await saveBudget(payload);
            setSaved(true); // 저장 완료 안내 바 띄우기

            alert("예산안이 성공적으로 저장되었습니다!");
        } catch (err) {
            const error = err as any;

            console.log(error);
            console.log(error.response);

            if (error.response?.status === 409) {
                alert(error.response.data.detail);
                setSaved(true);
                return;
            }

            alert("예산 저장에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <Wrapper>
            <HeroSection
                title="AI가 제안하는 맞춤 예산"
                highlight="맞춤 예산"
                description="코스콤 마이데이터 분석을 기반으로, 당신에게 꼭 맞는 예산안을 설계해 드립니다"
            />

            <Content>
                <SectionCard
                    icon={<WalletIcon />}
                    title="예산 관리 방식 선택 (필수/선택/저축)"
                    subtitle="AI가 당신의 예산 관리를 도와줄게요! 나의 라이프스타일에 맞는 예산 규칙을 선택해 주세요"
                >
                    <RuleList>
                        {ruleOptions.map((rule) => {
                            return (
                                <RuleCard
                                    key={rule.id}
                                    $active={selectedRule === rule.id}
                                    onClick={() => handleSelectRule(rule.id)}
                                    disabled={loading}
                                >
                                    {loading && selectedRule === rule.id && (
                                        <LoadingOverlay>
                                            <Spinner />
                                        </LoadingOverlay>
                                    )}
                                    <RuleTitle>{rule.title}</RuleTitle>
                                    <RuleDescription>{rule.description}</RuleDescription>
                                    <RuleDetail>{rule.detail}</RuleDetail>

                                    {rule.recommended && <Tag>추천</Tag>}
                                </RuleCard>
                            );
                        })}
                    </RuleList>
                </SectionCard>
                <BudgetRuleSection
                    selectedPlan={budgetData.data.selected_plan}
                    totalIncome={budgetData.data.total_income}
                    budgetSummary={budgetData.data.budget_summary}
                />
                <CategoryBudgetSection categoryBudgetGroups={categoryBudgetGroups} />
                <AiSuggestionSection aiSuggestions={budgetData.data.ai_proposal} />

                <ButtonWrapper>
                    <Button
                        variant="primary"
                        size="md"
                        onClick={handleSaveBudget}
                        disabled={loading}
                    >
                        예산안 저장하기
                    </Button>
                </ButtonWrapper>

                {saved && (
                    <BottomSection>
                        <BottomTitle>라이프 이벤트 시뮬레이션 & STO 추천</BottomTitle>
                        <BottomDesc>
                            {`목표를 향한 여정을 AI가 함께 설계해드립니다.\n현재 자산을 기반으로 다양한 플랜을 시뮬레이션하고, 투자와 절약 전략을 추천받아보세요.`}
                        </BottomDesc>
                        <BottomButtonWrapper>
                            <Button
                                variant="ghost"
                                size="md"
                                onClick={() => navigate('/analysis/result', {
                                    state: { analysisResultId: budgetData.data.spending_analysis_id }
                                })}
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
                )}
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

const RuleList = styled.div`
    display: flex;
    gap: 24px;
`;

const RuleCard = styled.button<{ $active: boolean }>`
    flex: 1;
    padding: 25px 22px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    background: ${({ $active }) => ($active ? "#F0FDFA" : "white")};
    border: 2px solid ${({ theme }) => theme.colors.primary[300]};
    border-radius: 13px;
    text-align: left;
    cursor: pointer;
    position: relative;
    transition: 0.2s ease;

    outline: ${({ theme, $active }) =>
        $active ? `4px solid ${theme.colors.primary[400]}` : "none"};
    outline-offset: -3px;

    &:hover {
        background: #F0FDFA;
    }
`;

const LoadingOverlay = styled.div`
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 13px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const Spinner = styled.div`
    width: 28px;
    height: 28px;
    border: 3px solid #ddd;
    border-top-color: ${({ theme }) => theme.colors.primary[500]};
    border-radius: 50%;
    animation: spin 0.8s linear infinite;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

const RuleTitle = styled.h4`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    margin-bottom: 20px;
`;

const RuleDescription = styled.p`
    font-size: 1.7rem;
    margin-bottom: 12px;
    font-weight: ${({ theme }) => theme.font.weight.regular};
    line-height: 1.3;
`;

const RuleDetail = styled.p`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    line-height: 1.3;
`;

const Tag = styled.span`
    position: absolute;
    top: 24px;
    right: 20px;
    background: #E7EDFF;
    color: ${({ theme }) => theme.colors.blue};
    padding: 4px 18px;
    border: 1px solid ${({ theme }) => theme.colors.blue};
    border-radius: 40px;
    font-size: 1.rem;
    font-weight: ${({ theme }) => theme.font.weight.semibold};
`;

// Button
const ButtonWrapper = styled.div`
    width: 100%;
    padding: 0 300px;
`

// ButtomSection
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
