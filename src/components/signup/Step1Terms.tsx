import styled from "styled-components";
import { useState } from "react";
import TermItem from "./TermItem";
import Button from "../common/Button";

interface Step1Props {
    onNext: () => void;
}

const Step1Terms = ({ onNext }: Step1Props) => {
    const [allAgree, setAllAgree] = useState(false);

    const [agreements, setAgreements] = useState({
        service: false,
        privacy: false,
        mydata: false,
        invest: false,
    });

    const requiredChecked =
        agreements.service &&
        agreements.privacy &&
        agreements.mydata &&
        agreements.invest;


    const handleTermChange = (key: keyof typeof agreements) => {
        const updated = { ...agreements, [key]: !agreements[key] };
        setAgreements(updated);

        const isAllChecked = Object.values(updated).every(v => v === true);
        setAllAgree(isAllChecked);
    }

    const handleAllAgree = () => {
        const newValue = !allAgree;
        setAllAgree(newValue);
        setAgreements({
            service: newValue,
            privacy: newValue,
            mydata: newValue,
            invest: newValue,
        });
    };

    return (
        <Wrapper>
            <Card>
                <CardTitle>약관동의 (PlanB)</CardTitle>

                {/* 전체 약관 */}
                <AllAgreeBox>
                    <Radio
                        type="checkbox"
                        checked={allAgree}
                        onChange={handleAllAgree}
                    />
                    <span>전체 약관 동의</span>
                </AllAgreeBox>

                <Divider />

                {/* 개별 약관 항목 */}
                <TermList>
                    <TermItem
                        label="(필수) 서비스 이용 약관"
                        checked={agreements.service}
                        onChange={() => handleTermChange("service")}
                    />
                    <TermItem
                        label="(필수) 개인정보 수집, 이용 동의"
                        checked={agreements.privacy}
                        onChange={() => handleTermChange("privacy")}
                    />
                    <TermItem
                        label="(필수) 마이데이터 이용 동의"
                        checked={agreements.mydata}
                        onChange={() => handleTermChange("mydata")}
                    />
                    <TermItem
                        label="(필수) 투자 및 면책 관련 고지"
                        checked={agreements.invest}
                        onChange={() => handleTermChange("invest")}
                    />
                </TermList>

                <Notice>* 필수항목에 동의하지 않을 경우 서비스 가입이 불가능합니다.</Notice>
            </Card>

            <ButtonWrapper>
                <Button
                    variant="primary"
                    size="sm"
                    disabled={!requiredChecked}
                    onClick={onNext}
                >
                    다음
                </Button>
            </ButtonWrapper>
        </Wrapper>
    );
};

export default Step1Terms;

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

const AllAgreeBox = styled.div`
    display: flex;
    gap: 25px;
    align-items: center;

    span {
        font-size: 2.4rem;
    }
`;

const Radio = styled.input`
    width: 25px;
    height: 25px;
    cursor: pointer;
    accent-color: ${({ theme }) => theme.colors.primary[500]};
`;

const Divider = styled.div`
    height: 1px;
    background: #eee;
    margin: 18px 0;
`;

const TermList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
`;

const Notice = styled.p`
    color: ${({ theme }) => theme.colors.fontSecondary};
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.font.weight.regular};
    margin-top: 18px;
`;

const ButtonWrapper = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;

    > Button {
        height: 55px;
    }
`