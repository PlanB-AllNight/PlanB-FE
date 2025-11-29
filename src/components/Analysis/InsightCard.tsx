import styled, { css } from "styled-components";

interface InsightCardProps {
    icon: React.ReactNode;
    title?: string;
    description?: string;
    color: "blue" | "orange" | "green" | "yellow";
    size?: "lg" | "sm";
    weight?: number;
}

const InsightCard = ({
    icon,
    title,
    description,
    color,
    size = "lg",
    weight = 400,
}: InsightCardProps) => {
    return (
        <Wrapper color={color}>
            <Icon size={size} color={color}>{icon}</Icon>

            <Text>
                {title && <Title color={color}>{title}</Title>}
                <Description color={color} weight={weight}>{description}</Description>
            </Text>
        </Wrapper>
    );
};

export default InsightCard;

const colorTokens = {
    blue: "#1E4ED8",
    orange: "#C3420D",
    green: "#17803D",
    yellow: "#CA8A03",
};

const colorStyles = {
    blue: css`
      background: #E7EDFF;
      border: 1.5px solid #C0DBFE;
      color: #29428F;
    `,
    orange: css`
      background: #FFF7ED;
      border: 1.5px solid #FED8AA;
      color: #7C2D12;
    `,
    green: css`
      background: #F1FDF4;
      border: 1.5px solid #BEF8D1;
      color: #14532D;
    `,
    yellow: css`
      background: #FEFCE8;
      border: 1.5px solid #FEF18B;
      color: #864D0F;
    `,
};

const Wrapper = styled.div<{ color: "blue" | "orange" | "green" | "yellow" }>`
    width: 100%;
    border-radius: 15px;
    ${({ color }) => colorStyles[color]};
    padding: 20px;
    display: flex;
    gap: 12px;
`;

const Icon = styled.div<{ size: "lg" | "sm"; color: "blue" | "orange" | "green" | "yellow" }>`
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: ${({ size }) => (size === "lg" ? "40px" : "30px")};
        height: ${({ size }) => (size === "lg" ? "40px" : "30px")};
    }

    svg path {
        fill: ${({ color }) => colorTokens[color]};
    }
`;

const Text = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
`;

const Title = styled.p< { color: "blue" | "orange" | "green" | "yellow" }>`
    font-size: 1.7rem;
    font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const Description = styled.p < { color: "blue" | "orange" | "green" | "yellow"; weight: number }> `
    font-size: 1.7rem;
    font-weight: ${({ weight }) => weight}; 
    color: ${({ color }) => colorTokens[color]};
    line-height: 1.2;
`