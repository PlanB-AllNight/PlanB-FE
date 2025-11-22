import styled from "styled-components";
import Button from "../common/Button";

interface ChallengeCompleteSectionProps {
    onCheckSupport: () => void;
}

const ChallengeCompleteSection = ({ onCheckSupport }: ChallengeCompleteSectionProps) => {
    return (
        <Wrapper>
            <Title>챌린지 생성 완료!</Title>
            <Description>
                지금 받을 수 있는 <Highlight>지원금과 장학금</Highlight>까지 함께 알아보면 더 <Highlight>빠르게 도달</Highlight>할 수 있어요.
            </Description>
            
            <ButtonWrapper>
                <Button
                    variant="secondary"
                    size="md"
                    onClick={onCheckSupport}
                >
                    지원금 확인하기
                </Button>
            </ButtonWrapper>
        </Wrapper>
    );
};

export default ChallengeCompleteSection;

const Wrapper = styled.div`
    width: 100%;
    padding: 80px 0;
    background: ${({ theme }) => theme.colors.primary[500]};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    border-radius: 18px;
    text-align: center;
`;

const Title = styled.h2`
    font-size: 3.2rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: white;
`;

const Description = styled.p`
    font-size: 1.8rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme }) => theme.colors.gray};
    margin-bottom: 16px;
`;

const Highlight = styled.span`
    color: ${({ theme }) => theme.colors.primary[300]};
`;

const ButtonWrapper = styled.div`
    width: 206px;
`;