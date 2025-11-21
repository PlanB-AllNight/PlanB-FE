import styled from "styled-components";
import { formatNumber } from "../../utils/format";

interface PercentBarProps {
    label: string;
    ratio: number;
    amount: number;
    count: number;
}

const PercentBar = ({ label, ratio, amount, count }: PercentBarProps) => {
    return (
        <Wrapper>
            <PercentWrapper>
                <Top>
                    <Label>{label}</Label>
                    <PercentText>{ratio.toFixed(1)}%</PercentText>
                </Top>
                <BarWrapper>
                    <BarFill style={{ width: `${ratio}%` }} />
                </BarWrapper>
            </PercentWrapper>

            <Amount>
                {formatNumber(amount)}원({count}건)
            </Amount>
        </Wrapper>
    );
};

export default PercentBar;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PercentWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-right: 30px;
    gap: 7px;
`;

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 1px;
`;

const Label = styled.div`
    font-size: 1.7rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
`;

const PercentText = styled.div`
    font-size: 1.7rem;
    text-align: right;
    color: ${({ theme }) => theme.colors.fontSecondary};
`;

const BarWrapper = styled.div`
    width: 100%;
    height: 12px;
    background: ${({ theme }) => theme.colors.gray};
    border-radius: 20px;
    overflow: hidden;
`;

const BarFill = styled.div`
    height: 100%;
    background: ${({ theme }) => theme.colors.primary[500]};
    border-radius: 20px;
    transition: width 0.4s ease;
`;

const Amount = styled.div`
    font-size: 1.7rem;
    min-width: 160px;
    text-align: right;
`;