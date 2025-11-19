import styled from "styled-components";
import { useState, useEffect } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

interface Step2Props {
    onPrev: () => void;
    onNext: () => void;
}

const Step2UserInfo = ({ onPrev, onNext }: Step2Props) => {
    const [form, setForm] = useState({
        userId: "",
        password: "",
        confirmPassword: "",
        name: "",
        birth: "",
        phone: "",
    });

    const [error, setError] = useState({
        userId: "",
        password: "",
        confirmPassword: "",
        name: "",
        birth: "",
        phone: "",
    });

    const [touched, setTouched] = useState({
        userId: false,
        password: false,
        confirmPassword: false,
        name: false,
        birth: false,
        phone: false,
    });

    // 비밀번호 검사 함수
    const isValidPassword = (password: string) => {
        const regex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,20}$/;
        return regex.test(password);
    };

    // 생년월일 유효성 검사
    const isValidBirth = (value: string) => {
        if (!/^\d{8}$/.test(value)) return false;

        const year = Number(value.substring(0, 4));
        const month = Number(value.substring(4, 6));
        const day = Number(value.substring(6, 8));

        const date = new Date(year, month - 1, day);

        return (
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day
        );
    };

    // 연락처 유효성 검사 (숫자만)
    const isValidPhone = (value: string) => {
        return /^\d+$/.test(value);
    };

    // 입력 변경 처리
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm((prev) => ({ ...prev, [name]: value }));

        // 입력 중에는 error를 초기화해도 됨
        setError((prev) => ({ ...prev, [name]: "" }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    // 형식 검사
    useEffect(() => {
        const newError = { ...error };

        // 아이디
        if (touched.userId) {
            if (form.userId.trim() === "") {
                newError.userId = "아이디를 입력해주세요.";
            } else {
                newError.userId = "";
            }
        }

        // 비밀번호
        if (touched.password) {
            if (form.password.trim() === "") {
                newError.password = "비밀번호를 입력해주세요.";
            } else if (!isValidPassword(form.password)) {
                newError.password =
                    "영문, 숫자, 특수문자 포함 8~20자로 입력해주세요.";
            } else {
                newError.password = "";
            }
        }

        // 비밀번호 확인
        if (touched.confirmPassword) {
            if (form.confirmPassword.trim() === "") {
                newError.confirmPassword = "비밀번호 확인을 입력해주세요.";
            } else if (form.confirmPassword !== form.password) {
                newError.confirmPassword = "비밀번호가 일치하지 않습니다.";
            } else {
                newError.confirmPassword = "";
            }
        }

        // 이름
        if (touched.name) {
            if (form.name.trim() === "") {
                newError.name = "이름을 입력해주세요.";
            } else {
                newError.name = "";
            }
        }

        // 생년월일
        if (touched.birth) {
            if (form.birth.trim() === "") {
                newError.birth = "생년월일을 입력해주세요.";
            } else if (!isValidBirth(form.birth)) {
                newError.birth =
                    "생년월일 8자리를 정확히 입력해주세요.";
            } else {
                newError.birth = "";
            }
        }

        // 연락처
        if (touched.phone) {
            if (form.phone.trim() === "") {
                newError.phone = "연락처를 입력해주세요.";
            } else if (!isValidPhone(form.phone)) {
                newError.phone = "숫자만 입력해주세요.";
            } else {
                newError.phone = "";
            }
        }

        setError(newError);
    }, [form, touched]);


    const isFormValid = () => {
        const hasError = Object.values(error).some((msg) => msg !== "");
        const allFilled = Object.values(form).every((v) => v.trim() !== "");
        return !hasError && allFilled;
    };

    const handleNext = () => {
        if (!isFormValid()) return;
        onNext();
    };

    return (
        <Wrapper>
            <Card>
                <CardTitle>개인정보입력</CardTitle>

                <ContentBox>
                    <Input
                        label="아이디"
                        labelPosition="left"
                        variant="primary"
                        placeholder="영문, 숫자, 특수문자 입력 가능"
                        name="userId"
                        value={form.userId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={error.userId}
                    />
                    <Input
                        label="비밀번호"
                        labelPosition="left"
                        variant="primary"
                        placeholder="영문, 숫자, 특수문자 포함 8자 이상 20자 이하"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={error.password}
                    />
                    <Input
                        label="비밀번호 확인"
                        labelPosition="left"
                        variant="primary"
                        placeholder="비밀번호 확인"
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={error.confirmPassword}
                    />
                    <Input
                        label="이름"
                        labelPosition="left"
                        variant="primary"
                        placeholder="이름"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={error.name}
                    />
                    <Input
                        label="생년월일"
                        labelPosition="left"
                        variant="primary"
                        placeholder="8자로 입력"
                        name="birth"
                        value={form.birth}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={error.birth}
                    />
                    <Input
                        label="연락처"
                        labelPosition="left"
                        variant="primary"
                        placeholder="휴대폰번호('-' 없이 입력)"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={error.phone}
                    />
                </ContentBox>
            </Card>

            <ButtonRow>
                <Button variant="outline" size="sm" onClick={onPrev}>이전</Button>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={handleNext}
                    disabled={!isFormValid()}
                >다음</Button>
            </ButtonRow>
        </Wrapper>
    );
};

export default Step2UserInfo;

const Wrapper = styled.div`
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Card = styled.div`
    width: 900px;
    margin: 40px 0;
    padding: 40px 50px;
    background: white;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.colors.gray};
`;

const CardTitle = styled.h3`
    font-size: 2.4rem;
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    margin-bottom: 28px;
`;

const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
`;

const ButtonRow = styled.div`
    width: 760px;
    display: flex;
    justify-content: center;
    gap: 20px;

    > Button {
        height: 55px;
    }
`;