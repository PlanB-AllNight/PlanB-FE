import styled, { keyframes } from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import Input from "../common/Input";
import { sendChat } from "../../api/chatbot";

import LookIcon from "../../assets/svgs/look.svg?react";
import DbIcon from "../../assets/svgs/db.svg?react";
import AiIcon from "../../assets/svgs/brain.svg?react";
import TrustIcon from "../../assets/svgs/trust.svg?react";
import SendIcon from "../../assets/svgs/send.svg?react";

interface ChatMessage {
    id: number;
    type: 'bot' | 'user';
    text?: string;
    data?: any;
    resType?: string;
}

const badgeStyles: Record<string, { bg: string; text: string }> = {
    primary: { bg: '#F0FDFA', text: '#0F766E' },
    success: { bg: '#F0FDF4', text: '#15803D' },
    warning: { bg: '#FFFBEB', text: '#B45309' },
    danger:  { bg: '#FEF2F2', text: '#EF4444' },
};

const ChatbotSection = () => {
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");
    const [history, setHistory] = useState<ChatMessage[]>([
        { 
            id: 0,
            type: 'bot', 
            text: '안녕하세요! PlanB 챗봇입니다.\n금융이나 정책 관련해서 궁금한 점이 있으신가요?',
            data: { suggestions: ["추천 질문", "소비 MBTI", "식비 비교", "돈 모으는 법", "장학금 문의"] }
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history, isLoading]);

    const handleSend = async (textOverride?: string, payloadOverride?: any) => {
        const targetQuery = (typeof textOverride === 'string' ? textOverride : msg).trim();
        const targetPayload = payloadOverride || {};
        
        if (!targetQuery || isLoading) return;

        const userMsgId = Date.now();
        setHistory(prev => [...prev, { id: userMsgId, type: 'user', text: targetQuery }]);
        setMsg("");
        setIsLoading(true);

        try {
            const response = await sendChat(targetQuery, targetPayload);

            if (response.type === "tool_result" && response.data?.url) {
                setHistory(prev => [...prev, { 
                    id: Date.now(), 
                    type: 'bot', 
                    text: response.message || "페이지로 이동합니다...",
                }]);
                setTimeout(() => navigate(response.data.url), 1000);
                setIsLoading(false);
                return;
            }

            setHistory(prev => [...prev, { 
                id: Date.now() + 1, 
                type: 'bot', 
                text: response.message, 
                data: response.data,
                resType: response.type
            }]);

        } catch (error) {
            console.error(error);
            setHistory(prev => [...prev, { 
                id: Date.now(), 
                type: 'bot', 
                text: "죄송합니다. 오류가 발생했습니다. 잠시 후 다시 시도해주세요." 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const renderCard = (msg: ChatMessage) => {
        const { data } = msg;
        if (!data) return null;

        if (data.suggestions && !data.persona && !data.comparison && !data.consultation && !data.data) return null;

        //  금융 페르소나 카드
        if (data.persona) {
            const { persona } = data;
            return (
                <CardWrapper>
                    <CardTitle>{persona.title}</CardTitle>
                    <CardDesc>{persona.description}</CardDesc>
                    <TagRow>
                        {persona.tags?.map((t: string, i: number) => <Tag key={i}>{t}</Tag>)}
                    </TagRow>
                </CardWrapper>
            );
        }

        //  또래 비교 카드
        if (data.comparison) {
            const { comparison } = data;
            const maxVal = Math.max(comparison.my_amount, comparison.peer_avg) * 1.2 || 1;
            
            return (
                <CardWrapper>
                    <CardTitle>{comparison.title}</CardTitle>
                    <ChartBox>
                        <BarRow>
                            <BarLabel>나</BarLabel>
                            <BarTrack>
                                <BarFill width={(comparison.my_amount / maxVal) * 100} color="#0F766E" />
                            </BarTrack>
                            <BarValue>{comparison.my_amount.toLocaleString()}원</BarValue>
                        </BarRow>
                        <BarRow>
                            <BarLabel>또래 평균</BarLabel>
                            <BarTrack>
                                <BarFill width={(comparison.peer_avg / maxVal) * 100} color="#9CA3AF" />
                            </BarTrack>
                            <BarValue>{comparison.peer_avg.toLocaleString()}원</BarValue>
                        </BarRow>
                    </ChartBox>
                    <StatusBadge color={comparison.status_color}>{comparison.status_label}</StatusBadge>
                    <CardDesc style={{marginTop:'10px'}}>{comparison.message}</CardDesc>
                </CardWrapper>
            );
        }

        //  지원 정책 목록
        if (data.type === "chat_response" && Array.isArray(data.data)) {
            return (
                <ListWrapper>
                    {data.data.map((item: any) => (
                        <ListItem key={item.id} onClick={() => handleSend(`${item.title} 상세 알려줘`)}>
                            <ListTitle>{item.title}</ListTitle>
                            <ListSub>{item.subtitle}</ListSub>
                            <ListCat>{item.category}</ListCat>
                        </ListItem>
                    ))}
                </ListWrapper>
            );
        }

        //  지원 정책 상세 (Markdown)
        if (data.type === "chat_response" && data.data?.type === "markdown") {
            const { policy } = data.data;
            return (
                <CardWrapper>
                    <CardTitle>{policy.title}</CardTitle>
                    <MarkdownContent dangerouslySetInnerHTML={{ __html: policy.content.replace(/\n/g, '<br/>') }} />
                    {policy.application_url && (
                        <LinkButton onClick={() => window.open(policy.application_url, "_blank")}>
                            신청하러 가기
                        </LinkButton>
                    )}
                </CardWrapper>
            );
        }

        if (data.type === "markdown" && data.policy) {
            const { policy } = data;
            return (
                <CardWrapper>
                    <CardTitle>{policy.title}</CardTitle>
                    <MarkdownContent dangerouslySetInnerHTML={{ __html: policy.content.replace(/\n/g, '<br/>') }} />
                    {policy.application_url && (
                        <LinkButton onClick={() => window.open(policy.application_url, "_blank")}>
                            신청하러 가기
                        </LinkButton>
                    )}
                </CardWrapper>
            );
        }

        //  금융 상담사 카드
        if (data.consultation) {
            const { consultation } = data;
            return (
                <CardWrapper>
                    <CardTitle>{consultation.title}</CardTitle>
                    <ConsultSection>
                        <Empathy>"{consultation.empathy_message}"</Empathy>
                        <Advice>{consultation.main_advice}</Advice>
                    </ConsultSection>
                    
                    <SubHeader>Action Plan</SubHeader>
                    <CheckList>
                        {consultation.action_plan?.map((action: string, i: number) => (
                            <CheckItem key={i}>✔ {action}</CheckItem>
                        ))}
                    </CheckList>

                    {consultation.warning && (
                        <WarningBox>{consultation.warning}</WarningBox>
                    )}
                </CardWrapper>
            );
        }

        return null;
    };

    return (
        <Container>
            <LeftInfo>
                <Title>서비스 안내</Title>
                <Box>
                    <Desc>
                        코스콤 AICC와 연계하여<br/>
                        당신에게 맞춤형 정책 정보를 제공하고<br/>
                        AI 금융상담을 통해 최적의 대응 솔루션을 안내합니다.
                    </Desc>
                    <FeatureList>
                        <FeatureItem>
                            <LookIcon width="68" height="68"/>
                            <div>
                                <strong>코스콤 AICC 연계</strong>
                                <p>공공 정책 연계형 정보 매칭</p>
                            </div>
                        </FeatureItem>
                        <FeatureItem>
                            <DbIcon width="68" height="68"/>
                            <div>
                                <strong>정책 지원 DB</strong>
                                <p>최신 장학금, 대출, 복지 정책 반영</p>
                            </div>
                        </FeatureItem>
                        <FeatureItem>
                            <AiIcon width="68" height="68"/>
                            <div>
                                <strong>AI 맞춤 상담</strong>
                                <p>필요시 GPT 기반 금융 코치 제공</p>
                            </div>
                        </FeatureItem>
                        <FeatureItem>
                            <TrustIcon width="68" height="68"/>
                            <div>
                                <strong>신뢰성 보장</strong>
                                <p>사전 검증된 공공 정보만 제공합니다</p>
                            </div>
                        </FeatureItem>
                    </FeatureList>
                </Box>
            </LeftInfo>

            <ChatWrapper>
                <ChatHeader>AICC 금융상담 챗봇</ChatHeader>
                <MsgArea ref={scrollRef}>
                    {history.map((m, i) => (
                        <BubbleRow key={m.id} isUser={m.type === 'user'} hasGap={i > 0 && m.type === 'user'}>
                            {m.type === 'bot' && <Avatar>🤖</Avatar>}
                            <BubbleContainer 
                                isUser={m.type === 'user'} 
                                wide={!!(m.type === 'bot' && m.data?.suggestions)}
                            >
                                {m.text && (
                                    <Bubble isUser={m.type === 'user'}>
                                        <span dangerouslySetInnerHTML={{__html: m.text.replace(/\n/g, '<br/>')}} />

                                        {m.type === 'bot' && m.data?.suggestions && (
                                            <BotButtonWrapper>
                                                {m.data.suggestions.map((btnText: string, idx: number) => (
                                                    <BotChip 
                                                        key={idx} 
                                                        onClick={() => handleSend(btnText)}
                                                        disabled={isLoading}
                                                    >
                                                        {btnText}
                                                    </BotChip>
                                                ))}
                                            </BotButtonWrapper>
                                        )}
                                    </Bubble>
                                )}
                                {m.type === 'bot' && renderCard(m)}
                            </BubbleContainer>
                        </BubbleRow>
                    ))}
                    {isLoading && (
                        <BubbleRow isUser={false} hasGap={true}>
                            <Avatar>🤖</Avatar>
                            <Bubble isUser={false}>
                                <LoadingContainer>
                                    <Dot />
                                    <Dot />
                                    <Dot />
                                </LoadingContainer>
                            </Bubble>
                        </BubbleRow>
                    )}
                </MsgArea>
                <InputArea>
                    <InputWrapper>
                        <Input 
                            placeholder={isLoading ? "답변을 생성 중입니다..." : "질문을 입력하세요..."}
                            value={msg} 
                            onChange={e => setMsg(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && !isLoading && handleSend()}
                            height="50px"
                            style={{fontSize: '1.6rem'}}
                            variant="gray"
                            disabled={isLoading}
                        />
                    </InputWrapper>
                    <Button 
                        variant="primary" 
                        size="sm" 
                        onClick={() => handleSend()}
                        style={{width: '70px', padding: '0'}}
                        disabled={isLoading}
                    >
                        <SendIcon width="30" height="30" />
                    </Button>
                </InputArea>
            </ChatWrapper>
        </Container>
    );
};

export default ChatbotSection;

const Container = styled.div`
    display: flex; 
    gap: 50px; 
    @media(max-width: 768px) { flex-direction: column; }
`;

const LeftInfo = styled.div`
    background: white;
    // border: 1px solid #E5E7EB;
    box-shadow: 0px 4px 12px #00000011;
    border-radius: 13px;
    flex: 1;
    display: flex; 
    flex-direction: column; 
    justify-content: center;
    padding: 26px;
`;

const Title = styled.h2`
    font-size: 2.5rem; 
    font-weight: bold;
    margin-bottom: 26px;
    color: ${({theme}) => theme.colors.primary[500]};
`;

const Box = styled.div`
    background: ${({theme}) => theme.colors.background};
    border-radius: 13px;
    padding: 26px 26px 39px;
`;

const Desc = styled.p`
    font-size: 1.6rem; 
    color: ${({theme}) => theme.colors.fontSecondary};
    line-height: 1.3;
    margin-bottom: 26px;
`;

const FeatureList = styled.div`
    display: flex; 
    flex-direction: column; 
    gap: 32px;
`;

const FeatureItem = styled.div`
    display: flex; 
    align-items: center; 
    gap: 26px;
    
    strong { font-size: 2.4rem; font-weight: bold; display: block; margin-bottom: 5px; }
    p { font-size: 1.6rem; font-weight: medium; color: ${({theme}) => theme.colors.fontSecondary}; }
`;

const ChatWrapper = styled.div`
    flex: 1.2;
    border: 1px solid ${({theme}) => theme.colors.gray};
    border-radius: 13px;
    display: flex; 
    flex-direction: column;
    overflow: hidden;
    background: white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.11);
    height: 625px;
`;

const ChatHeader = styled.div`
    padding: 26px;
    border-bottom: 1px solid ${({theme}) => theme.colors.gray};
    font-size: 2.5rem;
    font-weight: bold;
    color: ${({theme}) => theme.colors.primary[500]};
`;

const MsgArea = styled.div`
    flex: 1;
    padding: 26px;
    overflow-y: auto;
    background: ${({theme}) => theme.colors.background};
    display: flex; 
    flex-direction: column; 
    gap: 12px;
`;

const BubbleRow = styled.div<{isUser:boolean; hasGap?: boolean}>`
    display: flex; 
    justify-content: ${({isUser})=>isUser?'flex-end':'flex-start'};
    width: 100%;
    align-items: flex-start;
    margin-top: ${({hasGap}) => hasGap ? '20px' : '0'};
`;

const Avatar = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    margin-right: 10px;
    flex-shrink: 0;
`;

const BubbleContainer = styled.div<{isUser:boolean; wide?: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: ${({isUser}) => isUser ? 'flex-end' : 'flex-start'};
    max-width: ${({wide}) => wide ? '95%' : '80%'};
    gap: 8px;
`;

const Bubble = styled.div<{isUser:boolean; hasButtons?: boolean}>`
    padding: 12px 18px;
    border-radius: 18px;
    border-top-left-radius: ${({isUser})=>isUser?'18px':'4px'};
    border-top-right-radius: ${({isUser})=>isUser?'4px':'18px'};
    word-break: keep-all;
    overflow-wrap: break-word;
    font-size: 1.5rem;
    line-height: 1.5;
    white-space: pre-wrap;
    
    background: ${({isUser, theme}) => isUser ? theme.colors.primary[500] : 'white'};
    color: ${({isUser}) => isUser ? 'white' : '#374151'};
    box-shadow: ${({isUser}) => isUser ? 'none' : '0 1px 2px rgba(0,0,0,0.1)'};
`;

const BotButtonWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    
    margin-top: 16px; 
`;

const BotChip = styled.button`
    padding: 4px 12px;
    border-radius: 16px;
    background-color: white;
    
    border: 1px solid ${({theme}) => theme.colors.primary[200]}; 
    color: ${({theme}) => theme.colors.primary[500]};
    
    font-size: 1.3rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    
    box-shadow: 0 2px 4px rgba(0,0,0,0.03);

    &:hover {
        background-color: ${({theme}) => theme.colors.primary[100]};
        border-color: ${({theme}) => theme.colors.primary[500]};
        transform: translateY(-1px);
    }
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }
`;

const InputArea = styled.div`
    padding: 16px 26px;
    background: white;
    border-top: 1px solid ${({theme}) => theme.colors.gray};
    display: flex; 
    gap: 13px; 
    align-items: center;
`;

const InputWrapper = styled.div`
    flex: 1;
`;

const bounce = keyframes`
  0%, 60%, 100% { 
    transform: translateY(0); 
  }
  30% { 
    transform: translateY(-4px); 
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 24px;
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  background-color: #b0b0b0;
  border-radius: 50%;
  animation: ${bounce} 1.4s infinite ease-in-out both;

  &:nth-child(1) {
    animation-delay: -0.32s;
  }
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
  &:nth-child(3) {
    animation-delay: 0s;
  }
`;


const CardWrapper = styled.div`
    background: white;
    border: 1px solid ${({theme}) => theme.colors.gray};
    border-radius: 18px;
    border-top-left-radius: 4px;
    border-top-right-radius: 18px;
    padding: 20px;
    width: 100%;
    min-width: 280px;
`;

const CardTitle = styled.h4`
    font-size: 1.8rem;
    font-weight: bold;
    color: ${({theme}) => theme.colors.fontPrimary};
    margin-bottom: 12px;
`;

const CardDesc = styled.p`
    font-size: 1.4rem;
    color: ${({theme}) => theme.colors.fontSecondary};
    line-height: 1.4;
    white-space: pre-wrap;
`;

const TagRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 12px;
`;

const Tag = styled.span`
    background: ${({theme}) => theme.colors.primary[100]};
    color: ${({theme}) => theme.colors.primary[500]};
    font-size: 1.2rem;
    font-weight: 500;
    padding: 4px 8px;
    border-radius: 4px;
`;

const ChartBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 12px;
`;

const BarRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.3rem;
`;

const BarLabel = styled.span`
    width: 60px;
    color: ${({theme}) => theme.colors.fontSecondary};
`;

const BarTrack = styled.div`
    flex: 1;
    height: 10px;
    background: #F3F4F6;
    border-radius: 5px;
    overflow: hidden;
`;

const BarFill = styled.div<{width: number; color: string}>`
    height: 100%;
    width: ${({width}) => width}%;
    background: ${({color}) => color};
    border-radius: 5px;
    transition: width 0.5s ease;
`;

const BarValue = styled.span`
    width: 70px;
    text-align: right;
    font-weight: bold;
    color: ${({theme}) => theme.colors.fontPrimary};
`;

const StatusBadge = styled.span<{color?: string}>`
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 1.2rem;
    font-weight: bold;
    ${({ color }) => {
        const style = badgeStyles[color || 'primary'] || badgeStyles.primary;
        return `
            background-color: ${style.bg};
            color: ${style.text};
        `;
    }}
`;

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    min-width: 280px;
`;

const ListItem = styled.div`
    background: white;
    border: 1px solid ${({theme}) => theme.colors.gray};
    border-radius: 10px;
    padding: 15px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        border-color: ${({theme}) => theme.colors.primary[400]};
        background: ${({theme}) => theme.colors.primary[100]};
    }
`;

const ListTitle = styled.div`
    font-size: 1.6rem;
    font-weight: bold;
    color: ${({theme}) => theme.colors.fontPrimary};
    margin-bottom: 4px;
`;

const ListSub = styled.div`
    font-size: 1.3rem;
    color: ${({theme}) => theme.colors.fontSecondary};
    margin-bottom: 8px;
`;

const ListCat = styled.div`
    display: inline-block;
    font-size: 1.1rem;
    color: white;
    background: ${({theme}) => theme.colors.primary[400]};
    padding: 2px 8px;
    border-radius: 10px;
`;

const MarkdownContent = styled.div`
    font-size: 1.4rem;
    line-height: 1.6;
    color: ${({theme}) => theme.colors.fontPrimary};
    
    b, strong {
        font-weight: bold;
        color: ${({theme}) => theme.colors.primary[500]};
    }
    
    br { margin-bottom: 10px; }
`;

const LinkButton = styled.button`
    margin-top: 15px;
    width: 100%;
    padding: 10px;
    background: ${({theme}) => theme.colors.primary[500]};
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.4rem;
    font-weight: bold;
    cursor: pointer;
    &:hover { background: ${({theme}) => theme.colors.primary[400]}; }
`;

const ConsultSection = styled.div`
    margin-bottom: 15px;
    padding: 12px;
    background: ${({theme}) => theme.colors.background};
    border-radius: 8px;
`;

const Empathy = styled.p`
    font-style: italic;
    color: ${({theme}) => theme.colors.fontSecondary};
    margin-bottom: 8px;
    font-size: 1.4rem;
`;

const Advice = styled.p`
    font-weight: 500;
    color: ${({theme}) => theme.colors.fontPrimary};
    font-size: 1.5rem;
    line-height: 1.4;
`;

const SubHeader = styled.div`
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 8px;
    color: ${({theme}) => theme.colors.primary[500]};
`;

const CheckList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 15px;
`;

const CheckItem = styled.div`
    font-size: 1.4rem;
    color: ${({theme}) => theme.colors.fontPrimary};
`;

const WarningBox = styled.div`
    font-size: 1.3rem;
    color: #EF4444;
    background: #FEF2F2;
    padding: 8px;
    border-radius: 6px;
    font-weight: 500;
`;