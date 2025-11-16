import styled from "styled-components";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

const HomeBanner = () => {
    const navigate = useNavigate();
    
    return (
        <Wrapper>
            <Title>
                AI가 분석하는<br />
                <Highlight>개인화 자산관리</Highlight>
            </Title>
            <Description>
                코스콤 마이데이터 기반으로 당신의 소비패턴을 분석하고,<br />
                맞춤형 예산 추천과 라이프 이벤트 시뮬레이션에 따른 투자 상담을 제공합니다
            </Description>
            <ButtonWrapper>
                <Button
                    variant="primary"
                    size="md"
                    onClick={() => navigate("/analysis")}
                >
                    내 소비 분석하기
                </Button>
            </ButtonWrapper>
        </Wrapper >
    );
};

export default HomeBanner;

const Wrapper = styled.section`
    width: 100%;
    padding: 127px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const Title = styled.h1`
    font-size: 5rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};;
    line-height: 1.1;
    text-align: center;
`;

const Highlight = styled.span`
    color: ${({ theme }) => theme.colors.primary[400]};
`;

const Description = styled.p`
    font-size: 2.4rem;
    font-weight: ${({ theme }) => theme.font.weight.regular};
    color: ${({ theme }) => theme.colors.fontSecondary};
    line-height: 1.4;
    text-align: center;
`;

const ButtonWrapper = styled.div`
    margin-top: 25px;
    width: 240px;
`