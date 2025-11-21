import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Step1Terms from "../components/signup/Step1Terms";
import Step2UserInfo from "../components/signup/Step2UserInfo";
import Step3Complete from "../components/signup/Step3Complete";

const SignupPage = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const next = () => setStep((prev) => prev + 1);
    const prev = () => setStep((prev) => (prev) - 1);

    const steps = ["약관동의", "정보입력", "가입완료"];

    return (
        <Wrapper>
            <Title>회원가입</Title>

            <StepIndicator>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <Circle active={step >= index + 1}>{index + 1}</Circle>
                        <StepText active={step >= index + 1}>{label}</StepText>
                    </Step>
                ))}
            </StepIndicator>

            {step === 1 && <Step1Terms onNext={next} />}
            {step === 2 && <Step2UserInfo onNext={next} onPrev={prev} />}
            {step === 3 && (
                <Step3Complete
                    onGoHome={() => navigate("/")}
                    onGoLogin={() => navigate("/login")}
                />
            )}
        </Wrapper>
    );
};

export default SignupPage;

const Wrapper = styled.div`
    width: 100%;
    padding: 60px 0;
`;

const Title = styled.h2`
    text-align: center;
    font-size: 3.5rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
`;

const StepIndicator = styled.div`
    margin-top: 24px;
    display: flex;
    justify-content: center;
    gap: 55px; /* step 간 간격 조절 */
`;

const Step = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

const Circle = styled.div<{ active: boolean }>`
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};

    background-color: ${({ active, theme }) =>
        active ? theme.colors.primary[500] : "transparent"};
    color: ${({ active, theme }) =>
        active ? "#fff" : theme.colors.fontSecondary};
    border: 2px solid
        ${({ active, theme }) =>
        active ? theme.colors.primary[500] : theme.colors.gray};
`;

const StepText = styled.div<{ active: boolean }>`
    font-size: 1.6rem;
    font-weight: ${({ active, theme }) =>
        active ? theme.font.weight.bold : theme.font.weight.medium};
    color: ${({ active, theme }) =>
        active ? theme.colors.primary[500] : theme.colors.fontSecondary};
`;
