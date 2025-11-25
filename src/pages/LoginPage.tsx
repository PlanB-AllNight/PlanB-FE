import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { loginUser } from "../api/auth";

const LoginPage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        userId: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const data = await loginUser(form);

            // 토큰 저장
            localStorage.setItem("access_token", data.access_token);
            navigate("/");
        } catch (error: any) {
            setError(error.response?.data?.detail || "로그인 실패");
        }
    };

    return (
        <Wrapper>
            <Title>로그인</Title>
            <form onSubmit={handleLogin}>
                <Card>
                    <InputRow>
                        <Input
                            label="아이디"
                            variant="primary"
                            name="userId"
                            height="63px"
                            value={form.userId}
                            onChange={handleChange}
                        />
                        <Input
                            label="비밀번호"
                            variant="primary"
                            name="password"
                            type="password"
                            height="63px"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </InputRow>
                    <ButtonRow>
                        <Button
                            variant="primary"
                            size="md"
                            type="submit"
                        >로그인</Button>
                        <Button
                            variant="outline"
                            size="md"
                            onClick={() => navigate("/signup")}
                        >회원가입</Button>
                    </ButtonRow>
                </Card>
            </form>
        </Wrapper>
    )
};

export default LoginPage;

const Wrapper = styled.div`
    width: 100%;
    max-width: 900px;
    min-height: calc(100vh - 70px); 
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