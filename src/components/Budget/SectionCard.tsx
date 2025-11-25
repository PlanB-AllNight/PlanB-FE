import styled from "styled-components";

interface SectionCardProps {
    icon?: React.ReactNode;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

const SectionCard = ({ icon, title, subtitle, children }: SectionCardProps) => {
    return (
        <Wrapper>
            <Header>
                {icon && <Icon>{icon}</Icon>}
                <TextBox>
                    <Title>{title}</Title>
                    {subtitle && <Subtitle>{subtitle}</Subtitle>}
                </TextBox>
            </Header>

            <Content>{children}</Content>
        </Wrapper>
    );
};

export default SectionCard;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background: white;
    border: 2px solid ${({ theme }) => theme.colors.gray};
    border-radius: 10px;
    padding: 50px 40px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.10);
    gap: 30px;
`;

const Header = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
`;

const Icon = styled.div`
    width: 52px;
    height: 52px;
    background: ${({ theme }) => theme.colors.primary[200]};
    border-radius: 50%;

    > svg {
        width: 35px;
        height: 35px;
    }

    display: flex;
    align-items: center;
    justify-content: center;
`;

const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Title = styled.h2`
    font-size: 2.5rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
`;

const Subtitle = styled.p`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
    font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const Content = styled.div`
    width: 100%;
`;