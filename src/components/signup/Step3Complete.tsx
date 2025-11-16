import styled from "styled-components";
import Button from "../common/Button";
import SignupIcon from "../../assets/svgs/signup.svg?react";

interface Step3Props {
    onGoHome: () => void;
    onGoLogin: () => void;
}

const Step3Complete = ({ onGoHome, onGoLogin }: Step3Props) => {
    return (
        <Wrapper>
            <CompleteBox>
                <Icon>
                    <SignupIcon />
                </Icon>

                <Title>회원가입이 완료되었습니다</Title>
                <Description>
                    PlanB에 가입해주셔서 감사합니다. 지금 바로 맞춤형 금융 서비스를 이용해보세요!
                </Description>

                <ButtonRow>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onGoHome}
                    >홈으로 이동</Button>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={onGoLogin}
                    >로그인하기</Button>
                </ButtonRow>
            </CompleteBox>
        </Wrapper>
    );
};

export default Step3Complete;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 40px;
`;

const CompleteBox = styled.div`
    width: 900px;
    border-radius: 15px;
    padding: 60px 40px;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    text-align: center;
`;

const Icon = styled.div`
    margin-bottom: 30px;
`;

const Title = styled.h2`
    font-size: 3rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    margin-bottom: 20px;
`;

const Description = styled.p`
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
    margin-bottom: 45px;
`;

const ButtonRow = styled.div`
    padding: 0 100px;
    display: flex;
    justify-content: center;
    gap: 20px;

    > Button {
        height: 55px;
    }
`;