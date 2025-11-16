import styled from "styled-components";
import Input from "../common/Input";
import Button from "../common/Button";

interface Step2Props {
    onPrev: () => void;
    onNext: () => void;
}

const Step2UserInfo = ({ onPrev, onNext }: Step2Props) => {
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
                    />
                    <Input
                        label="비밀번호"
                        labelPosition="left"
                        variant="primary"
                        placeholder="영문, 숫자, 특수문자 포함 8자 이상 20자 이하"
                    />
                    <Input
                        label="비밀번호 확인"
                        labelPosition="left"
                        variant="primary"
                        placeholder="비밀번호 확인"
                    />
                    <Input
                        label="이름"
                        labelPosition="left"
                        variant="primary"
                        placeholder="이름"
                    />
                    <Input
                        label="생년월일"
                        labelPosition="left"
                        variant="primary"
                        placeholder="8자로 입력"
                    />
                    <Input
                        label="연락처"
                        labelPosition="left"
                        variant="primary"
                        placeholder="휴대폰번호('-' 없이 입력)"
                    />
                </ContentBox>
            </Card>

            <ButtonRow>
                <Button variant="outline" size="sm" onClick={onPrev}>이전</Button>
                <Button variant="primary" size="sm" onClick={onNext}>다음</Button>
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