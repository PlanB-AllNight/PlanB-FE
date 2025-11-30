import styled from "styled-components";
import Button from "../common/Button";

interface SectionComponentProps {
    title: String;
    description: String;
    buttonText?: String;
    onButtonClick?: () => void;
    children: React.ReactNode;
}

const SectionComponent = ({
    title,
    description,
    buttonText,
    onButtonClick,
    children,
}: SectionComponentProps) => {
    return (
        <Wrapper>
            <SectionHeader>
                <TextBox>
                    <Title>{title}</Title>
                    <Description>{description}</Description>
                </TextBox>
                {buttonText && onButtonClick && (
                    <Button
                        size="sm"
                        variant="primary"
                        onClick={onButtonClick}
                    >
                        {buttonText}
                    </Button>
                )}
            </SectionHeader>

            <Content>
                {children}
            </Content>
        </Wrapper>
    );
};

export default SectionComponent;

const Wrapper = styled.div`
    display: flex;
    flex-direction:column;
    width: 100%;
    gap: 26px;
`;

const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    > Button {
        width: 200px;
        font-size: 1.8rem;
        font-weight: ${({ theme }) => theme.font.weight.bold};
    }
`;

const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Title = styled.p`
    font-size: 2.5rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
`;

const Description = styled.p`
    font-size: 1.8rem;
    font-weight: ${({ theme }) => theme.font.weight.regular};
    color: ${({ theme }) => theme.colors.fontSecondary};
`;

const Content = styled.div`
    width: 100%;
`