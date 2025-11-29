import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

interface ChallengeInitResponse {
    current_asset: number;
    monthly_save_potential: number;
    has_analysis: boolean;
    last_analysis_date: string;
    latest_mydata_date: string;
    analysis_outdated: boolean;
}

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

    const [currentAssets, setCurrentAssets] = useState("0");
    const [monthlySavePotential, setMonthlySavePotential] = useState(0);

    const [modalStatus, setModalStatus] = useState<'none' | 'missing' | 'outdated'>('none');

    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const [isCustomMode, setIsCustomMode] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [goalData, setGoalData] = useState<{ title: string; amount: string; period: string } | null>(null);

    useEffect(() => {
        const fetchInitData = async () => {
            try {
                // 실제 API 호출 (토큰이 있다고 가정)
                // const token = localStorage.getItem('accessToken');
                // const response = await fetch('/api/challenge/init', {
                //     headers: { Authorization: `Bearer ${token}` }
                // });
                // const data: ChallengeInitResponse = await response.json();

                // [테스트용 MOCK DATA] - 상황에 따라 주석을 해제하여 테스트해보세요.
                
                // Case 1: 정상 (분석 있고 최신임)
                const data: ChallengeInitResponse = { current_asset: 1500000, monthly_save_potential: 300000, has_analysis: true, last_analysis_date: "2024-11-30", latest_mydata_date: "2024-11-30", analysis_outdated: false };
                
                // Case 2: 분석 데이터 없음
                // const data: ChallengeInitResponse = { current_asset: 0, monthly_save_potential: 0, has_analysis: false, last_analysis_date: "", latest_mydata_date: "", analysis_outdated: false };

                // Case 3: 분석 데이터 있지만 구버전 (Outdated)
                // const data: ChallengeInitResponse = { 
                //     current_asset: 1200000, 
                //     monthly_save_potential: 250000, 
                //     has_analysis: true, 
                //     last_analysis_date: "2024-10-01", 
                //     latest_mydata_date: "2024-11-30", 
                //     analysis_outdated: true 
                // };

                // 로직 처리
                if (!data.has_analysis) {
                    setModalStatus('missing');
                } else {
                    // 자산 세팅
                    setCurrentAssets(data.current_asset.toString());
                    setMonthlySavePotential(data.monthly_save_potential);

                    if (data.analysis_outdated) {
                        setModalStatus('outdated');
                    }
                }

            } catch (error) {
                console.error("Failed to fetch init data", error);
                // 에러 처리 로직 (예: 토스트 메시지)
            }
        };

        fetchInitData();
    }, []);

    const handleAssetsEdit = (newAmount: string) => {
        setCurrentAssets(newAmount);
    };

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
            setIsVisible(false);
            setTimeout(() => {
                setSelectedEventId(null);
                setIsConfirmed(false);
            }, 100);
        } else {
            setSelectedEventId(id);
            setIsCustomMode(false);
            setIsConfirmed(false);
            setIsVisible(true);
            scrollToGoalForm();
        }
    };

    const handleCustomClick = () => {
        if (isCustomMode) {
            setIsVisible(false);
            setTimeout(() => {
                setIsCustomMode(false);
            }, 100);
        } else {
            setSelectedEventId(null);
            setIsCustomMode(true);
            setIsConfirmed(false);
            setIsVisible(true);
            scrollToGoalForm();
        }
    };

    const handleConfirm = (data: { title: string; amount: string; period: string }) => {
        setIsConfirmed(true);
        setGoalData(data);
        // TODO: 저장된 goalData를 백엔드로 보내거나 다음 페이지로 넘김
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
                        // TODO: 소비 분석 값 가져오기
                        amount={currentAssets}
                        onEdit={handleAssetsEdit}
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
                            <AnimatedWrapper isVisible={isVisible}>
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
                            </AnimatedWrapper>
                        </>
                    )}
                </Container>
            </Content>

            {modalStatus === 'missing' && (
                <ModalBackdrop>
                    <ModalBox>
                        <ModalTitle>소비 분석이 필요해요 🧐</ModalTitle>
                        <ModalDesc>
                            정확한 시뮬레이션을 위해 먼저 소비 패턴을 분석해야 합니다.<br/>
                            분석 페이지로 이동하시겠습니까?
                        </ModalDesc>
                        <ModalButtonRow>
                            <Button onClick={() => navigate('/analysis')}>
                                소비 분석 하러가기
                            </Button>
                        </ModalButtonRow>
                    </ModalBox>
                </ModalBackdrop>
            )}
            {modalStatus === 'outdated' && (
                <ModalBackdrop>
                    <ModalBox>
                        <ModalTitle>데이터 업데이트 알림 🔔</ModalTitle>
                        <ModalDesc>
                            최신 금융 데이터가 반영되지 않았습니다.<br/>
                            더 정확한 추천을 위해 분석을 갱신하시겠습니까?
                        </ModalDesc>
                        <ModalButtonRow>
                            <Button variant="gray" onClick={() => setModalStatus('none')}>
                                그냥 진행하기
                            </Button>
                            <Button onClick={() => navigate('/analysis')}>
                                분석 갱신하기
                            </Button>
                        </ModalButtonRow>
                    </ModalBox>
                </ModalBackdrop>
            )}
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
    gap: 20px;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
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

const AnimatedWrapper = styled.div<{ isVisible: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 52px;
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
    transform: translateY(${({ isVisible }) => (isVisible ? '0' : '20px')});
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
`;

// --- Modal Components ---
const ModalBackdrop = styled.div`
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
`;

const ModalBox = styled.div`
    width: 450px;
    background: white;
    padding: 40px 30px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    animation: slideUp 0.3s ease-out;

    @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;

const ModalTitle = styled.h3`
    font-size: 2.2rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    margin-bottom: 16px;
    color: ${({ theme }) => theme.colors.fontPrimary};
`;

const ModalDesc = styled.p`
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
    line-height: 1.5;
    margin-bottom: 30px;
`;

const ModalButtonRow = styled.div`
    display: flex;
    gap: 15px;
    width: 100%;
    
    > button {
        flex: 1;
        font-size: 1.6rem;
    }
`;