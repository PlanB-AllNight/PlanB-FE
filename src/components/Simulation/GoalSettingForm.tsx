import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Input from "../common/Input";
import Button from "../common/Button";
import GoalIcon from "../../assets/svgs/flag.svg?react";

interface GoalSettingFormProps {
    isCustom: boolean;
    defaultValues?: {
        title: string;
        amount: string;
        period: string;
    };
    onConfirm: () => void;
}

const GoalSettingForm = ({ isCustom, defaultValues, onConfirm }: GoalSettingFormProps) => {
    const [values, setValues] = useState({
        title: "",
        amount: "",
        period: "",
    });

    // 선택된 이벤트가 바뀌거나 모드가 바뀔 때 초기값 세팅
    useEffect(() => {
        if (isCustom) {
            setValues({ title: "", amount: "", period: "" });
        } else if (defaultValues) {
            setValues({
                title: defaultValues.title,
                amount: defaultValues.amount.replace(/[^0-9]/g, ""),
                period: defaultValues.period.replace(/[^0-9]/g, ""),
            });
        }
    }, [isCustom, defaultValues]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const isValid = values.amount !== "" && values.period !== "" && (isCustom ? values.title !== "" : true);

    return (
        <Container>
            <Header>
                <GoalIcon width="51" height="51" />
                <Title>목표 설정</Title>
            </Header>

            <Form>
                {isCustom && (
                    <Input
                        label="목표 이름"
                        labelPosition="top"
                        placeholder="예: 새로운 취미, 자동차 구매 등"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        variant="gray"
                    />
                )}

                <InputRow>
                    <Input
                        label="목표 금액 (만원)"
                        labelPosition="top"
                        placeholder="금액을 입력해주세요"
                        name="amount"
                        value={values.amount}
                        onChange={handleChange}
                        variant="gray"
                        type="number"
                    />
                    <Input
                        label="목표 기간 (개월)"
                        labelPosition="top"
                        placeholder="기간을 입력해주세요"
                        name="period"
                        value={values.period}
                        onChange={handleChange}
                        variant="gray"
                        type="number"
                    />
                </InputRow>

                <Button 
                    variant="primary" 
                    size="md" 
                    disabled={!isValid} 
                    onClick={onConfirm}
                >
                    목표 설정하기
                </Button>
            </Form>
        </Container>
    );
};

export default GoalSettingForm;

const Container = styled.div`
    width: 100%;
    flex-shrink: 0;
    border-radius: 18px;
    border: 2px solid ${({ theme }) => theme.colors.gray};
    background: white;

    padding: 36px 34px;
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 36px;
    box-sizing: border-box;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 26px;
`;

const Title = styled.h3`
    font-size: 2.4rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme }) => theme.colors.fontPrimary};
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 26px;
`;

const InputRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 34px;
`;