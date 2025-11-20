import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import HeroSection from "../components/common/HeroSection";
import CurrentAssetsCard from "../components/Simulation/CurrentAssetsCard";
import LifeEventCard from "../components/Simulation/LifeEventCard";
import GoalSettingForm from "../components/Simulation/GoalSettingForm";
import Button from "../components/common/Button";

import GlobalIcon from "../assets/svgs/global.svg?react";
import FlightIcon from "../assets/svgs/flight.svg?react";
import LaptopIcon from "../assets/svgs/laptop.svg?react";
import SchoolIcon from "../assets/svgs/school.svg?react";
import HouseIcon from "../assets/svgs/house.svg?react";
import MarriageIcon from "../assets/svgs/marriage.svg?react";
import AddCircleIcon from "../assets/svgs/add-circle.svg?react";

const EVENTS = [
    { id: 1, title: "교환학생", description: "해외 대학에서 한 학기 이상 교류 학습을 준비", amount: "10000000", period: "12", icon: <GlobalIcon width="51" height="51" /> },
    { id: 2, title: "해외여행", description: "꿈꿔왔던 해외여행을 현실로 만들기", amount: "6000000", period: "6", icon: <FlightIcon width="51" height="51" /> },
    { id: 3, title: "노트북 구매", description: "학업이나 작업용으로 성능 좋은 노트북을 새로 장만", amount: "2500000", period: "3", icon: <LaptopIcon width="51" height="51" /> },
    { id: 4, title: "학비 마련", description: "학기 등록금, 강의 수강료 등 학업 관련 비용을 준비", amount: "5000000", period: "12", icon: <SchoolIcon width="51" height="51" /> },
    { id: 5, title: "월세 보증금", description: "자취나 독립 생활을 위한 보증금 또는 월세 자금 마련", amount: "5000000", period: "12", icon: <HouseIcon width="51" height="51" /> },
    { id: 6, title: "결혼 준비", description: "결혼을 앞두고 필요한 준비자금, 예식, 신혼집 등", amount: "50000000", period: "36", icon: <MarriageIcon width="51" height="51" /> },
];

const SimulationPage = () => {
    const navigate = useNavigate();
    const goalFormRef = useRef<HTMLDivElement>(null);

    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const [isCustomMode, setIsCustomMode] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const scrollToGoalForm = () => {
        setTimeout(() => {
            goalFormRef.current?.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 100);
    };

    const handleEventClick = (id: number) => {
        if (selectedEventId === id) {
            setSelectedEventId(null);
            setIsConfirmed(false);
        } else {
            setSelectedEventId(id);
            setIsCustomMode(false);
            setIsConfirmed(false);
            scrollToGoalForm();
        }
    };

    const handleCustomClick = () => {
        if (isCustomMode) {
            setIsCustomMode(false);
        } else {
            setSelectedEventId(null);
            setIsCustomMode(true);
            setIsConfirmed(false);
            scrollToGoalForm();
        }
    };

    const handleConfirm = () => {
        setIsConfirmed(true);
        // TODO: 여기서 입력된 데이터를 저장하는 로직 추가 가능
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    const selectedEventData = EVENTS.find(e => e.id === selectedEventId);

    return (
        <Wrapper>
            <HeroSection
                title="라이프 이벤트 시뮬레이션 & STO 추천"
                highlight="라이프 이벤트"
                description={`목표를 향한 여정을 AI가 함께 설계해드립니다.\n현재 자산을 기반으로 다양한 플랜을 시뮬레이션하고, 투자와 절약 전략을 추천받아보세요.`}
            />

            <Content>
                <Container>
                    <CurrentAssetsCard 
                        amount="500,000" 
                        onEdit={() => alert('자산 수정')} 
                    />

                    <Divider />

                    <SectionHeader>
                        <Title>라이프 이벤트 목표 설정</Title>
                        <SubTitle>원하는 목표를 선택하거나 직접 입력하세요</SubTitle>
                    </SectionHeader>

                    <Grid>
                        {EVENTS.map((event) => (
                            <LifeEventCard
                                key={event.id}
                                icon={event.icon}
                                title={event.title}
                                description={event.description}
                                amount={parseInt(event.amount).toLocaleString() + "원"}
                                period={event.period + "개월"}
                                isSelected={selectedEventId === event.id}
                                onClick={() => handleEventClick(event.id)}
                            />
                        ))}
                    </Grid>

                    <DashedButton 
                        isActive={isCustomMode} 
                        onClick={handleCustomClick}
                    >
                        <ButtonTextWrapper>
                            <TitleWrapper>
                                <AddCircleIcon width="24" height="24" />
                                <ButtonTitle>직접 입력하기</ButtonTitle>
                            </TitleWrapper>
                            <ButtonDesc>원하는 목표가 없다면 직접 설정해보세요</ButtonDesc>
                        </ButtonTextWrapper>
                    </DashedButton>

                    {(selectedEventId !== null || isCustomMode) && (
                        <>
                            <div ref={goalFormRef}>
                                <GoalSettingForm
                                    isCustom={isCustomMode}
                                    defaultValues={selectedEventData ? {
                                        title: selectedEventData.title,
                                        amount: selectedEventData.amount,
                                        period: selectedEventData.period
                                    } : undefined}
                                    onConfirm={handleConfirm}
                                />
                            </div>

                            
                            <BottomSection>
                                <BottomTitle>챌린지 시뮬레이션 시작</BottomTitle>
                                <BottomDesc>설정한 목표에 따른 맞춤형 저축 계획을 확인해보세요</BottomDesc>
                                <BottomButtonWrapper>
                                    <Button
                                        variant={isConfirmed ? "secondary" : "neutral"}
                                        size="md"
                                        disabled={!isConfirmed}
                                        onClick={() => navigate('/result')}
                                    >
                                        {isConfirmed ? "시뮬레이션하기" : "목표를 설정해주세요"}
                                    </Button>
                                </BottomButtonWrapper>
                            </BottomSection>
                        </>
                    )}
                </Container>
            </Content>
        </Wrapper>
    );
};

export default SimulationPage;


const Wrapper = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 52px 20px 150px;
    display: flex;
    flex-direction: column;
    gap: 52px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 36px;
`;

const Divider = styled.div`
    height: 1px;
    background-color: ${({ theme }) => theme.colors.gray};
    margin: 10px 0;
`;

const SectionHeader = styled.div`
    text-align: center;
`;

const Title = styled.h2`
    font-size: 2.5rem;
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    margin-bottom: 11px;
`;

const SubTitle = styled.p`
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 27px;

    @media (max-width: 412px) {
        grid-template-columns: 1fr;
    }
`;

const DashedButton = styled.div<{ isActive: boolean }>`
    width: 100%;
    padding: 30px;
    border-radius: 13px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    transition: all 0.2s;

    background-color: ${({ isActive, theme }) => 
        isActive ? theme.colors.primary[100] : "white"};
    border: 4px dashed ${({ isActive, theme }) => 
        isActive ? theme.colors.primary[500] : theme.colors.gray};

    &:hover {
        background-color: ${({ theme }) => theme.colors.primary[100]};
        border-color: ${({ theme }) => theme.colors.primary[500]};
    }
`;

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
`;

const ButtonTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 9px;
    text-align: left;
`;

const ButtonTitle = styled.span`
    font-size: 1.8rem;
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    color: ${({ theme }) => theme.colors.fontPrimary};
`;

const ButtonDesc = styled.span`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
`;

const BottomSection = styled.div`
    background-color: ${({ theme }) => theme.colors.primary[500]};
    border-radius: 18px;
    padding: 80px 0;
    margin-top: 52px;
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