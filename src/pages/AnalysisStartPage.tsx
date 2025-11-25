import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/common/HeroSection";
import Button from "../components/common/Button";
import DataIcon from "../assets/svgs/data.svg?react";

const AnalysisStartPage = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleStart = () => {
        setLoading(true);

        // 임시 API 대기 시뮬레이션 (2초)
        setTimeout(() => {
            setLoading(false);
            // 분석 완료 후 결과 페이지로 이동
            navigate("/analysis/result");
        }, 2000);
    };

    return (
        <Wrapper>
            <HeroSection
                title="마이데이터 소비 분석"
                highlight="소비 분석"
                description={`코스콤 마이데이터 플랫폼과 연동하여 당신의 소비패턴을 정확히 분석하고\n개인화된 예산 관리 솔루션을 제공합니다`}
            />

            <BottomSection>
                <Icon>
                    <DataIcon width={45} height={45} />
                </Icon>
                <Title>코스콤 마이데이터 연동</Title>
                <Description>안전하고 신뢰할 수 있는 금융 데이터로 정확한 분석을 제공합니다</Description>
                <ButtonWrapper>
                    <Button
                        variant="primary"
                        size="md"
                        onClick={handleStart}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Spinner />
                                분석 중...
                            </>
                        ) : (
                            "소비 분석 시작하기"
                        )}
                    </Button>
                </ButtonWrapper>
            </BottomSection>
        </Wrapper>
    );
};

export default AnalysisStartPage;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const BottomSection = styled.div`
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    margin-top: 40px;
    padding: 55px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    border: 2px solid ${({ theme }) => theme.colors.gray};
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.10);
`;

const Icon = styled.div`
    width: 65px;
    height: 65px;
    border-radius: 50%;
    background: #DFFBEB;
    display: flex;
    align-items: center;
    justify-content: center;

    svg path {
        fill: ${({ theme }) => theme.colors.primary[500]};
    }
`
const Title = styled.h2`
    font-size: 2.5rem;
    font-weight: ${({ theme }) => theme.font.weight.medium};
    margin-top: 28px;
`;

const Description = styled.p`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.font.weight.regular};
    color: ${({ theme }) => theme.colors.fontSecondary};
    margin-top: 18px;
`;

const ButtonWrapper = styled.div`
    width: 300px;
    margin-top: 50px;
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