import styled from "styled-components";

const TABS = ["소비 분석", "예산 관리", "챌린지"] as const;

interface Props {
    activeTab: string;
    setActiveTab: (v: string) => void;
}

const SwitchTabs = ({ activeTab, setActiveTab }: Props) => {
    return (
        <Wrapper>
            {TABS.map((tab) => (
                <TabButton
                    key={tab}
                    $active={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab}
                </TabButton>
            ))}
        </Wrapper>
    );
};

export default SwitchTabs;

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    background: ${({ theme }) => theme.colors.primary[200]}; /* 민트색 */
    border-radius: 40px;
    padding: 6px;
`;

const TabButton = styled.button<{ $active: boolean }>`
    flex: 1;
    padding: 14px 0;
    text-align: center;

    font-size: 1.8rem;
    font-weight: 600;

    background: ${({ $active }) => ($active ? "white" : "transparent")};
    border: none;
    border-radius: 30px;
    cursor: pointer;

    transition: all 0.2s ease;
`;