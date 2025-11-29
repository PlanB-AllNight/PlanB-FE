import styled, { keyframes } from "styled-components";
import { useState, useRef, useEffect } from "react";
import Button from "../common/Button";
import Input from "../common/Input";

import LookIcon from "../../assets/svgs/look.svg?react";
import DbIcon from "../../assets/svgs/db.svg?react";
import AiIcon from "../../assets/svgs/brain.svg?react";
import TrustIcon from "../../assets/svgs/trust.svg?react";
import SendIcon from "../../assets/svgs/send.svg?react";

interface Message {
    type: 'bot' | 'user';
    text: string;
    buttons?: string[];
}

const ChatbotSection = () => {
    const [msg, setMsg] = useState("");
    const [history, setHistory] = useState<Message[]>([
        { 
            type: 'bot', 
            text: '안녕하세요! PlanB 챗봇입니다 \n금융이나 정책 관련해서 궁금한 점이 있으신가요?',
            buttons: ["장학금 문의", "월세 지원", "학자금 대출", "생활비 도움"] 
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleSend = (textOverride?: string) => {
        const targetMsg = (typeof textOverride === 'string' ? textOverride : msg).trim();
        
        if (!targetMsg || isLoading) return;
        
        setMsg("");
        setIsLoading(true);

        setHistory(prev => [...prev, { type: 'user', text: targetMsg }]);

        setTimeout(() => {
             setHistory(prev => [...prev, { 
                type: 'bot', 
                text: '정보를 찾고 있습니다...' 
            }]);
        }, 300);

        setTimeout(() => {
            // TODO: 백엔드 API 호출 결과
            const mockResponse = `"${targetMsg}"에 대한 정책 검색 결과입니다.\n신청 기간은 ~12/31까지이며, 자세한 내용은 공지사항을 참조하세요.`;
            
            setHistory(prev => {
                const newHistory = [...prev];
                newHistory.pop();
                return [...newHistory, { type: 'bot', text: mockResponse }];
            });
            
            setIsLoading(false);
        }, 2000);
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
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.type === 'user' ? 'flex-end' : 'flex-start', marginTop: (i > 0 && m.type === 'user') ? '20px' : '0' }}>
                            <BubbleRow isUser={m.type === 'user'}>
                                {m.type === 'bot' && <Avatar>🤖</Avatar>}
                                <Bubble isUser={m.type === 'user'} hasButtons={m.type === 'bot' && !!m.buttons}>
                                    {m.text}
                                    {m.type === 'bot' && m.buttons && (
                                        <BotButtonWrapper>
                                            {m.buttons.map((btnText, idx) => (
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
                            </BubbleRow>
                        </div>
                    ))}
                    {isLoading && (
                        <BubbleRow isUser={false}>
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

const BubbleRow = styled.div<{isUser:boolean}>`
    display: flex; 
    justify-content: ${({isUser})=>isUser?'flex-end':'flex-start'};
    width: 100%;
    align-items: flex-start;
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

const Bubble = styled.div<{isUser:boolean; hasButtons?: boolean}>`
    padding: 12px 18px;
    border-radius: 18px;
    border-top-left-radius: ${({isUser})=>isUser?'18px':'4px'};
    border-top-right-radius: ${({isUser})=>isUser?'4px':'18px'};
    max-width: ${({hasButtons}) => hasButtons ? '95%' : '80%'};
    word-break: break-word;
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