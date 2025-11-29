import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import HeroSection from "../components/common/HeroSection";
import GoalSimulationCard from "../components/Simulation/GoalSimulationCard";
import CustomSimulationCard, { type PlanData } from "../components/Simulation/CustomSimulationCard";
import ChallengeCompleteSection from "../components/Simulation/ChallengeCompleteSection";
import Button from "../components/common/Button";
import { 
    type SimulateResponse, 
    type Plan, 
    createChallenge, 
    type CreateChallengeRequest 
} from "../api/challenge";


const SimulationResultPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const resultData = location.state?.result as SimulateResponse | undefined;

    const buttonRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    
    const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
    const [isChallengeCreated, setIsChallengeCreated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!resultData) {
            navigate("/simulate", { replace: true });
        }
    }, [resultData, navigate]);

    useEffect(() => {
        if (selectedPlanId && !isChallengeCreated && buttonRef.current) {
            setTimeout(() => {
                buttonRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 100);
        }
    }, [selectedPlanId, isChallengeCreated]);

    useEffect(() => {
        if (isChallengeCreated && bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [isChallengeCreated]);

    if (!resultData) return null;

    const mapPlanToCardData = (plans: Plan[]): PlanData[] => {
        return plans.map((plan, index) => ({
            id: index + 1,
            title: plan.plan_title,
            tags: plan.tags,
            isRecommended: plan.is_recommended,
            strategy: plan.description,
            expectedPeriod: plan.expected_period,
            monthlySaving: plan.monthly_required || 0,
            finalAsset: plan.final_estimated_asset,
            monthlyAdditionalIncome: Math.max(0, plan.monthly_shortfall),
            comment: plan.recommendation,
            hashtags: plan.tags.map(t => `#${t}`),
        }));
    };

    const planList = mapPlanToCardData(resultData.plans);

    const goalCardData = {
        goalName: resultData.event_name,
        currentAmount: resultData.current_amount ?? 0,
        goalAmount: resultData.target_amount || 0,
        shortfallAmount: resultData.situation_analysis?.shortfall_amount ?? 0,
        period: resultData.period_months || 0,
    };

    const handleCreateChallenge = async () => {
        if (!selectedPlanId || !resultData) return;

        const token = localStorage.getItem("access_token");
        if (!token) return;

        const selectedPlan = resultData.plans[selectedPlanId - 1];
        if (!selectedPlan) return;

        setIsLoading(true);

        const requestData: CreateChallengeRequest = {
            event_name: resultData.event_name,
            target_amount: resultData.target_amount,
            period_months: resultData.period_months,
            current_amount: resultData.current_amount,

            plan_type: selectedPlan.plan_type,
            plan_title: selectedPlan.plan_title,
            description: selectedPlan.description,

            monthly_required: selectedPlan.monthly_required || 0,
            monthly_shortfall: selectedPlan.monthly_shortfall,
            final_estimated_asset: selectedPlan.final_estimated_asset,
            expected_period: selectedPlan.expected_period,
            plan_detail: selectedPlan.plan_detail
        };

        try {
            await createChallenge(token, requestData);
            setIsChallengeCreated(true);
        } catch (error) {
            console.error("Challenge creation failed", error);
            alert("챌린지 생성 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <Wrapper>
            <HeroSection
                title="시뮬레이션 결과"
                description={`목표를 향한 여정을 AI가 함께 설계해드립니다.\n현재 자산을 기반으로 다양한 플랜을 시뮬레이션하고, 투자와 절약 전략을 추천받아보세요.`}
                variant="light"
            />

            <Content>
                <GoalSimulationCard {...goalCardData} />

                <SectionTitle>맞춤형 시뮬레이션</SectionTitle>
                <Grid>
                    {planList.map((plan) => (
                        <CustomSimulationCard
                            key={plan.id}
                            plan={plan}
                            isSelected={selectedPlanId === plan.id}
                            onSelect={() => {
                                if (selectedPlanId === plan.id) {
                                    setSelectedPlanId(null);
                                } else {
                                    setSelectedPlanId(plan.id);
                                }
                                setIsChallengeCreated(false);
                            }}
                        />
                    ))}
                </Grid>

                {!isChallengeCreated && (
                    <ButtonWrapper ref={buttonRef}>
                        <Box>
                            <Button
                                variant={selectedPlanId ? "primary" : "neutral"}
                                size="md"
                                disabled={!selectedPlanId || isLoading}
                                onClick={handleCreateChallenge}
                            >
                                {isLoading ? "생성 중..." : (selectedPlanId ? "챌린지 생성하기" : "플랜을 선택해주세요")}
                            </Button>
                        </Box>
                    </ButtonWrapper>
                )}

                {isChallengeCreated && (
                    <div ref={bottomRef}>
                        <ChallengeCompleteSection
                            onCheckSupport={() => navigate("/support")}
                        />
                    </div>
                )}
            </Content>
        </Wrapper>
    );
};

export default SimulationResultPage;

const Wrapper = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background};
    padding-bottom: 100px;
`;

const Content = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 52px 20px;
    display: flex;
    flex-direction: column;
    gap: 26px;
`;

const SectionTitle = styled.h2`
    font-size: 2.5rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    margin-top: 49px;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const ButtonWrapper = styled.div`
    margin-top: 34px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Box = styled.div`
    width: 412px;
`;