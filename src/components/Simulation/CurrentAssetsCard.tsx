import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import WalletCircleIcon from "../../assets/svgs/wallet-circle.svg?react";

interface CurrentAssetsCardProps {
    amount: string;
    onEdit: (newAmount: string) => void;
}

const CurrentAssetsCard = ({ amount, onEdit }: CurrentAssetsCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(amount);

    useEffect(() => {
        setEditValue(amount);
    }, [amount]);

    const handleSave = () => {
        if (!editValue || editValue === "0") {
            alert("올바른 금액을 입력해주세요.");
            return;
        }
        onEdit(editValue);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditValue(amount);
        setIsEditing(false);
    };

    return (
        <Wrapper>
            <ContentWrapper>
                <TitleRow>
                    <WalletCircleIcon width="52" height="52" />
                    <Title>현재 자산 현황</Title>
                </TitleRow>
                <Label>현재 보유 자금</Label>
                {isEditing ? (
                    <EditWrapper>
                        <AmountInput
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSave();
                                if (e.key === 'Escape') handleCancel();
                            }}
                            autoFocus
                            min="0"
                        />
                        <span>원</span>
                    </EditWrapper>
                ) : (
                    <Amount>{parseInt(amount).toLocaleString()}원</Amount>
                )}
            </ContentWrapper>
            {isEditing ? (
                <ButtonGroup>
                    <Button variant="primary" size="sm" onClick={handleSave}>
                        저장
                    </Button>
                    <Button variant="gray" size="sm" onClick={handleCancel}>
                        취소
                    </Button>
                </ButtonGroup>
            ) : (
                <Button variant="primary" size="sm" onClick={() => setIsEditing(true)}>
                    수정하기
                </Button>
            )}
        </Wrapper>
    );
};

export default CurrentAssetsCard;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: 34px 50px;
    border-radius: 13px;
    box-shadow: 0px 8px 16px #00000033;

    > button {
        width: 127px;
        font-size: 1.6rem;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const TitleRow = styled.div`
    display: flex;
    align-items: center;
    gap: 17px;
    margin-bottom: 20px;
`;

const Title = styled.p`
    font-size: 2.4rem;
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    color: ${({ theme }) => theme.colors.fontPrimary};
`;

const Label = styled.p`
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.font.weight.medium};
    color: ${({ theme }) => theme.colors.fontSecondary};
    margin-bottom: 9px;
`;

const Amount = styled.p`
    font-size: 3.2rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme }) => theme.colors.primary[500]};
`;

const EditWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    
    span {
        font-size: 3.2rem;
        font-weight: ${({ theme }) => theme.font.weight.bold};
        color: ${({ theme }) => theme.colors.primary[500]};
    }
`;

const AmountInput = styled.input`
    font-size: 3.2rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme }) => theme.colors.primary[500]};
    border: 1.5px solid ${({ theme }) => theme.colors.gray};
    border-radius: 8px;
    padding: 8px 12px;
    width: 250px;
    
    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary[400]};
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 17px;
    
    > button {
        font-size: 1.6rem;
    }
`;