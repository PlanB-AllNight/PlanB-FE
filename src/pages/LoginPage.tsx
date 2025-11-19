import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const LoginPage = () => {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <Title>로그인</Title>
            <Card>
                <InputRow>
                    <Input
                        label="아이디"
                        variant="primary"
                        name="userId"
                    />
                    <Input
                        label="비밀번호"
                        variant="primary"
                        name="password"
                        type="password"
                    />
                </InputRow>
                <ButtonRow>
                    <Button variant="primary" size="md">로그인</Button>
                    <Button
                        variant="outline"
                        size="md"
                        onClick={() => navigate("/signup")}
                    >회원가입</Button>
                </ButtonRow>
            </Card>
        </Wrapper>
    )
};

export default LoginPage;

const Wrapper = styled.div`
    width: 100%;
    max-width: 900px;
    height: calc(100vh - 70px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Card = styled.div`
    width: 900px;
    margin-top: 40px;
    padding: 40px 200px;
    background: white;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.colors.gray};
`;

const Title = styled.h1`
    font-size: 3.5rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
`;

const InputRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
`;

const ButtonRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin-top: 55px;
`;