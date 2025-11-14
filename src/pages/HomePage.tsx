import styled from "styled-components";
import HomeBanner from "../components/Home/HomeBanner";
import ServiceCard from "../components/Home/ServiceCard";
import DataIcon from "../assets/svgs/data.svg?react";
import WalletIcon from "../assets/svgs/wallet.svg?react";
import InvestIcon from "../assets/svgs/invest.svg?react";
import SimulationIcon from "../assets/svgs/simulation.svg?react";
import HeroSection from "../components/common/HeroSection";
import Footer from "../components/Home/Footer";

const HomePage = () => {
    return (
        <Wrapper>
            <HomeBanner />

            <ServiceSection>
                <ServiceTitle>PlanB의 주요 서비스</ServiceTitle>
                <ServiceDesc>
                    마이데이터 기반 개인화 분석부터 AI 투자상담까지, 차세대 금융 서비스를 경험해보세요
                </ServiceDesc>

                <Grid>
                    <ServiceCard
                        icon={<DataIcon />}
                        title="소비 패턴 분석"
                        description={`코스콤 마이데이터를 활용한 정확한 소비 분석과 카테고리별 지출 현황을 제공합니다`}
                        bg="#E7EDFF"
                        border="#C0DBFE"
                        color="#1E4ED8"
                        tagList={["실시간 데이터 연동", "카테고리 자동 분류", "과소비 알림"]}
                    />
                    <ServiceCard
                        icon={<WalletIcon />}
                        title="AI 예산 추천"
                        description={`개인의 소비 패턴을 분석하여 최적화된 예산 계획과 저축 전략을 제안합니다`}
                        bg="#F1FDF4"
                        border="#BCF8D0"
                        color="#17A34A"
                        tagList={["다양한 룰 적용", "맞춤형 절약 팁", "목표 달성 로드맵"]}
                    />
                    <ServiceCard
                        icon={<SimulationIcon />}
                        title="라이프 이벤트 시뮬레이션"
                        description={`교환학생, 자취방 보증금 등 미래의 재무 목표 달성을 위한 최적의 플랜을 비교 및 추천합니다`}
                        bg="#FAF5FF"
                        border="#E9D5FF"
                        color="#9334EB"
                        tagList={["미래 자금 예측", "솔루션 플랜 비교", "KOSCOM 투자 연계"]}
                    />
                    <ServiceCard
                        icon={<InvestIcon />}
                        title="STO 투자 분석"
                        description={`코스콤 STO 플랫폼과 연계하여 개인 맞춤형 투자 상품을 추천합니다`}
                        bg="#FFF7ED"
                        border="#FED8AA"
                        color="#EA580B"
                        tagList={["리스크 맞춤 추천", "수익률 시뮬레이션", "포트폴리오 관리"]}
                    />
                </Grid>
            </ServiceSection>

            <HeroSection
                title="지금 시작해보세요"
                description="코스콤 AI Agent Challenge 출품작으로 개발된 차세대 개인화 금융 관리 플랫폼을 체험해보세요"
                secondaryButton={{ label: "소비 분석하기", link: "/analysis" }}
                ghostButton={{ label: "지원 정보 보기", link: "/info" }}
            />

            <Footer />
        </Wrapper>
    );
};

export default HomePage;

const Wrapper = styled.div`
    width: 100%;
    height: auto;
`;

const ServiceSection = styled.section`
    padding: 150px 170px;
    padding-top: 0;
`;

const ServiceTitle = styled.h2`
    text-align: center;
    font-size: 3.5rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    margin-bottom: 25px;
`;

const ServiceDesc = styled.p`
    text-align: center;
    font-size: 2.4rem;
    font-weight: ${({ theme }) => theme.font.weight.regular};
    color: ${({ theme }) => theme.colors.fontSecondary};
    margin-bottom: 48px;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`; 