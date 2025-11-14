import styled from "styled-components";

interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    bg: string;
    border: string;
    color: string;
    tagList: string[];
}

const ServiceCard = ({ icon, title, description, bg, border, color, tagList }: ServiceCardProps) => {
    return (
        <Card bg={bg} border={border}>
            <Icon color={color}>{icon}</Icon>
            <Title>{title}</Title>
            <Description>{description}</Description>

            <TagArea>
                {tagList.map((tag) => (
                    <Tag key={tag} color={color}>{tag}</Tag>
                ))}
            </TagArea>
        </Card>
    );
};

export default ServiceCard;

const Card = styled.div<{ bg: string; border: string }>`
    background: ${({ bg }) => bg};
    padding: 36px 42px;
    border-radius: 15px;
    border: 2px solid ${({ border }) => border};
    min-height: 300px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Icon = styled.div`
    background: white;
    width: 65px;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    border-radius: 15px;

    svg path {
        fill: ${({ color }) => color};
    }
`;

const Title = styled.h3`
    font-size: 2.4rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
`;

const Description = styled.p`
    font-size: 1.8rem;
    font-weight: ${({ theme }) => theme.font.weight.regular};
    color: ${({ theme }) => theme.colors.fontSecondary};
    line-height: 1.4;
    margin: auto 0;
`;

const TagArea = styled.div`
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
`;

const Tag = styled.span<{ color: string }>`
    background: ${({ color }) => color};
    color: white;
    font-size: 1.4rem;
    font-weight: ${({ theme }) => theme.font.weight.semibold};;
    padding: 6px 15px;
    border-radius: 20px;
`;