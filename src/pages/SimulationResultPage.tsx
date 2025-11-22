import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import HeroSection from "../components/common/HeroSection";
import GoalSimulationCard from "../components/Simulation/GoalSimulationCard";
import CustomSimulationCard, { type PlanData } from "../components/Simulation/CustomSimulationCard";
import ChallengeCompleteSection from "../components/Simulation/ChallengeCompleteSection";
import Button from "../components/common/Button";

// 확인용 임시 Mock Data
const MOCK_GOAL_RESULT = {
    goalName: "해외여행",
    currentAmount: 500000,
    goalAmount: 3000000,
    shortfallAmount: 2500000,
    period: 6,
};

const MOCK_PLANS: PlanData[] = [
    {
        id: 1,
        title: "현상 유지 플랜",
        tags: ["비추천", "#현상 유지"],
        isRecommended: false,
        strategy: "아무런 절약/투자 없이, 현재 월 저축액(30만원) 유지",
        expectedPeriod: 12,
        monthlySaving: 300000,
        finalAsset: 3600000,
        monthlyAdditionalIncome: 1400000,
        comment: "이 플랜은 목표 달성에 부족합니다. 다른 전략을 함께 고려해보세요.",
        hashtags: ["#비추천", "#현상 유지"],
    },
    {
        id: 2,
        title: "초절약 플랜",
        tags: ["추천"],
        isRecommended: true,
        strategy: "카페와 모임 지출을 10~15% 줄임 → 월 저축액을 41만원으로 증대",
        expectedPeriod: 12,
        monthlySaving: 417000,
        finalAsset: 5004000,
        monthlyAdditionalIncome: 0,
        comment: "현재 소비를 조정하면 충분히 달성 가능합니다. 예산 추천을 확인해볼까요?",
        hashtags: ["#예산 절약", "#권장 전략"],
    },
    {
        id: 3,
        title: "STO 투자 플랜 (KOSCOM 연계)",
        tags: ["추천"],
        isRecommended: true,
        strategy: "현재 월 저축액(30만원)을 KOSCOM STO에 투자 (연 7% 복리 적용)",
        expectedPeriod: 12,
        monthlySaving: 300000,
        finalAsset: 3718000,
        monthlyAdditionalIncome: 107000,
        comment: "초절약 플랜보다 덜 힘들고 효율적이에요. STO 투자를 시작해보세요.",
        hashtags: ["#투자", "#KOSCOM 연계", "#효율 전략"],
    }
];

const SimulationResultPage = () => {
    const navigate = useNavigate();

    const buttonRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    
    const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
    const [isChallengeCreated, setIsChallengeCreated] = useState(false);

    const handleCreateChallenge = () => {
        setIsChallengeCreated(true);
    };

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

    return (
        <Wrapper>
            <HeroSection
                title="시뮬레이션 결과"
                description={`목표를 향한 여정을 AI가 함께 설계해드립니다.\n현재 자산을 기반으로 다양한 플랜을 시뮬레이션하고, 투자와 절약 전략을 추천받아보세요.`}
                variant="light"
            />

            <Content>
                <GoalSimulationCard {...MOCK_GOAL_RESULT} />

                <SectionTitle>맞춤형 시뮬레이션</SectionTitle>
                <Grid>
                    {MOCK_PLANS.map((plan) => (
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
                        <Button
                            variant={selectedPlanId ? "primary" : "neutral"}
                            size="md"
                            disabled={!selectedPlanId}
                            onClick={handleCreateChallenge}
                        >
                            {selectedPlanId ? "챌린지 생성하기" : "플랜을 선택해주세요"}
                        </Button>
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
    gap: 40px;
`;

const SectionTitle = styled.h2`
    font-size: 2.4rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    margin-top: 20px;
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
    margin-top: 20px;
    
    > button {
        height: 70px;
        font-size: 2rem;
    }
`;