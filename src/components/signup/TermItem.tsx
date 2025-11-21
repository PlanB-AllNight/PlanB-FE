import styled from "styled-components";
import Button from "../common/Button";

interface TermItemProps {
    label: string;
    checked: boolean;
    onChange: () => void;
}

const TermItem = ({ label, checked, onChange }: TermItemProps) => {
    return (
        <Wrapper>
            <Left>
                <Radio
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                />
                <Label>{label}</Label>
            </Left>

            <ButtonWrapper>
                <Button variant="outline" size="sm">내용보기</Button>
            </ButtonWrapper>
        </Wrapper>
    );
};

export default TermItem;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Left = styled.div`
    display: flex;
    align-items: center;
    gap: 25px;
`;

const Radio = styled.input`
    width: 25px;
    height: 25px;
    cursor: pointer;
    accent-color: ${({ theme }) => theme.colors.primary[500]};
`;

const Label = styled.span`
    font-size: 2.4rem;
    color: ${({ theme }) => theme.colors.fontPrimary};
`;

const ButtonWrapper = styled.div`
    width: 145px;
`;