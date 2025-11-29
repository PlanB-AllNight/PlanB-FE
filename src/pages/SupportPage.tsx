import styled from "styled-components";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/common/HeroSection";
import ChatbotSection from "../components/Support/ChatbotSection";
import PolicyCard from "../components/Support/PolicyCard";
import PolicyDetailModal from "../components/Support/PolicyDetailModal";
import Button from "../components/common/Button";

import SearchIcon from "../assets/svgs/search.svg?react";

export type CategoryType = 'scholarship' | 'loan' | 'living' | 'housing' | 'invest';

export interface Policy {
    id: number;
    category: CategoryType;
    title: string;
    description: string;
    supporter: string;
    period: string;
    target: string;
    payment: string;
    detailContent: string;
    link: string;
}

const CATEGORIES = [
    { id: 'scholarship', label: '장학금/지원금', desc: '학생 대상 장학금, 청년 복지 등' },
    { id: 'loan', label: '대출 상품', desc: '학자금 대출, 생활비 대출 안내' },
    { id: 'living', label: '생활/복지', desc: '교통비 할인, 주거/문화 혜택 등' },
    { id: 'housing', label: '취업/진로', desc: '직무 훈련비, 면접/구직 활동 지원' },
    { id: 'invest', label: '자산 형성', desc: '자산 형성 지원금, 청년 재태크' },
] as const;

const MOCK_POLICIES: Policy[] = [
    {
        id: 1,
        category: 'scholarship',
        title: '국가장학금 1유형',
        description: '경제적으로 어려운 학생들에게 등록금을 지원하는 국가 장학금',
        supporter: '한국장학재단',
        period: '2025.05.21 ~ 2025.06.20',
        target: '국내 대학 재학생 (소득 8구간 이하)',
        payment: '등록금 우선 감면',
        detailContent: '가구원 소득, 재산 등을 반영하여 소득산정액을 산출하고 차등 지원합니다.\n지원 금액: 학기별 최대 285만원 ~ 175만원',
        link: 'https://www.kosaf.go.kr'
    },
    {
        id: 2,
        category: 'housing',
        title: '청년 전세임대',
        description: 'LH가 주택소유자와 전세계약을 체결하고 청년에게 재임대',
        supporter: '한국장학재단',
        period: '상시 모집',
        target: '만 19세~39세 무주택 청년',
        payment: '전세보증금 지원',
        detailContent: '도심 내 저소득 계층 청년이 현 생활권에서 안정적으로 거주할 수 있도록 지원합니다.\n\n수도권 최대 1.2억원 지원',
        link: 'https://apply.jh.or.kr'
    },
    {
        id: 3,
        category: 'scholarship',
        title: '근로장학금',
        description: '교내 행정 도우미 참여 시 학기당 월 40만원 지급',
        supporter: '한국장학재단',
        period: '4월 중순 ~ 말',
        target: '대학 재학생, 소득구간 4분위 이하',
        payment: '월 지급, 등록금 차감 가능',
        detailContent: '교내 다양한 부서에서 근로를 제공하고 장학금을 수령합니다.\n주 10시간 이내 근무 권장.',
        link: '#'
    },
    {
        id: 4,
        category: 'loan',
        title: '취업 후 상환 학자금대출',
        description: '취업 후 소득이 발생한 시점부터 상환하는 대출 제도',
        supporter: '한국장학재단',
        period: '상시 신청',
        target: '만 35세 이하 학부생',
        payment: '등록금 전액 대출',
        detailContent: '재학 중에는 이자 부담 없이, 취업 후 일정 소득 발생 시점부터 의무적으로 상환합니다.',
        link: '#'
    },
];

const SupportPage = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
    const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

    const resultRef = useRef<HTMLDivElement>(null);

    const filteredPolicies = selectedCategory 
        ? MOCK_POLICIES.filter(p => p.category === selectedCategory)
        : [];

    const handleCategoryClick = (id: CategoryType) => {
        setSelectedCategory(id);
        
        setTimeout(() => {
            if (resultRef.current) {
                resultRef.current.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }, 100);
    };

    return (
        <Wrapper>
            <HeroSection 
                title="정책 지원 정보 & AI 금융 상담"
                highlight="정책 지원 정보"
                description={`당신의 목표를 돕기 위한 다양한 정책 정보와\nAI 상담을 통해 지금 받을 수 있는 혜택을 알려드려요.`}
            />

            <Content>
                <ChatbotSection />

                <Divider />

                <SectionHeader>
                    <H3>탐색 항목 선택</H3>
                    <P>관심 있는 지원 분야를 선택하면 관련 정보를 확인할 수 있습니다</P>
                </SectionHeader>

                <CategoryGrid>
                    {CATEGORIES.map((cat) => (
                        <CategoryItem 
                            key={cat.id}
                            isActive={selectedCategory === cat.id}
                            onClick={() => handleCategoryClick(cat.id)}
                        >
                            <CatTitle isActive={selectedCategory === cat.id}>{cat.label}</CatTitle>
                            <CatDesc isActive={selectedCategory === cat.id}>{cat.desc}</CatDesc>
                        </CategoryItem>
                    ))}
                </CategoryGrid>

                <ScrollAnchor ref={resultRef} />

                <ResultArea>
                    {!selectedCategory ? (
                        <Placeholder>
                            <SearchIcon width="64" height="64"/>
                            <Text>
                                <strong>탐색 항목을 선택해주세요</strong><br/>
                                위의 카테고리 중 하나를 선택하면 관련 지원 정보를 확인할 수 있습니다.
                            </Text>
                        </Placeholder>
                    ) : (
                        <Grid>
                            {filteredPolicies.length > 0 ? (
                                filteredPolicies.map(policy => (
                                    <PolicyCard 
                                        key={policy.id} 
                                        policy={policy} 
                                        onClick={() => setSelectedPolicy(policy)} 
                                    />
                                ))
                            ) : (
                                <EmptyMsg>해당 카테고리의 정보가 없습니다.</EmptyMsg>
                            )}
                        </Grid>
                    )}
                </ResultArea>

                <BottomButtonRow>
                    <Button 
                        variant="primary" 
                        size="md"
                        onClick={() => navigate('/result')}
                    >
                        소비 분석 시작하기
                    </Button>
                    <Button 
                        variant="neutral" 
                        size="md"
                        onClick={() => navigate('/')}
                    >
                        홈으로 이동
                    </Button>
                </BottomButtonRow>
            </Content>

            {selectedPolicy && (
                <PolicyDetailModal 
                    policy={selectedPolicy} 
                    onClose={() => setSelectedPolicy(null)} 
                />
            )}
        </Wrapper>
    );
};

export default SupportPage;

const Wrapper = styled.div`
    width: 100%; 
    background-color: ${({theme})=>theme.colors.background};
`;
const Content = styled.div`
    max-width: 1200px; 
    margin: 0 auto; 
    padding: 60px 20px 100px;
`;
const Divider = styled.div`
    height: 1px; 
    background: ${({theme})=>theme.colors.gray}; 
    margin: 60px 0;
`;

const SectionHeader = styled.div`margin-bottom: 26px;`;
const H3 = styled.h3`font-size: 2.5rem; font-weight: ${({ theme }) => theme.font.weight.bold}; margin-bottom: 10px;`;
const P = styled.p`font-size: 1.6rem; color: ${({theme})=>theme.colors.fontSecondary};`;

const CategoryGrid = styled.div`
    display: flex; 
    gap: 13px; 
    margin-bottom: 100px;
    flex-wrap: wrap;
    justify-content: center;
`;

const CategoryItem = styled.div<{isActive:boolean}>`
    flex: 1;
    min-width: 200px;
    padding: 16px 16px;
    border-radius: 13px;
    border: 1px solid ${({isActive, theme}) => isActive ? theme.colors.primary[500] : theme.colors.gray};
    background: ${({isActive, theme}) => isActive ? theme.colors.primary[500] : 'white'};
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
    align-items: center;

    &:hover {
        border-color: ${({theme})=>theme.colors.primary[500]};
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
`;

const CatTitle = styled.span<{isActive:boolean}>`
    font-size: 1.8rem; 
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({isActive, theme}) => isActive ? 'white' : theme.colors.fontPrimary};
`;

const CatDesc = styled.span<{isActive:boolean}>`
    font-size: 1.4rem; 
    color: ${({isActive, theme}) => isActive ? 'rgba(255,255,255,0.8)' : theme.colors.fontSecondary};
    line-height: 1.3;
`;

const ScrollAnchor = styled.div`
    width: 100%;
    height: 1px;
    margin-bottom: 20px; /* ResultArea와의 간격 */
    scroll-margin-top: 255px; /* 헤더 높이만큼 오프셋 (헤더가 70px이므로 넉넉하게 100px) */
`;

const ResultArea = styled.div``;
const Grid = styled.div`
    display: grid; 
    grid-template-columns: repeat(2, 1fr); 
    gap: 25px;
    @media(max-width: 768px){ grid-template-columns: 1fr; }
`;
const Placeholder = styled.div`
    height: 200px; 
    border-radius: 15px;
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
    gap: 26px;
`;
const Text = styled.p`
    font-size: 1.6rem; 
    color: ${({theme})=>theme.colors.fontSecondary}; 
    text-align: center; 
    line-height: 1.7;
    strong { font-weight: bold; color: ${({theme})=>theme.colors.fontPrimary}; }
`;
const EmptyMsg = styled.p`
    text-align: center; 
    padding: 50px; 
    font-size: 1.8rem; 
    color: ${({theme})=>theme.colors.fontSecondary};
    grid-column: 1 / -1;
`;

const BottomButtonRow = styled.div`
    margin-top: 200px;
    display: flex;
    justify-content: center;
    gap: 20px;

    > button {
        width: 600px;
        font-weight: ${({ theme }) => theme.font.weight.medium};
    }
`;